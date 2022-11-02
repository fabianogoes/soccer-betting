package api

import (
	"fmt"
	"net/http"
	"strconv"
	"world-cup/api/dto"
	"world-cup/domain/usecases"

	"github.com/gin-gonic/gin"
	uuid "github.com/satori/go.uuid"
)

type UserApiHandler struct {
	UseCase *usecases.UserUseCase
}

func NewUserApiHandler(
	useCase *usecases.UserUseCase,
) UserApiHandler {
	return UserApiHandler{UseCase: useCase}
}

func (h UserApiHandler) Routes(router *gin.Engine) {
	router.POST("/users", h.create)
	router.GET("/users", h.findAll)
	router.GET("/users/:id", h.findById)
	router.PUT("/users/:id", h.update)
	router.DELETE("/users/:id", h.delete)
}

func (h UserApiHandler) create(c *gin.Context) {
	var request dto.UserRequest
	c.Bind(&request)

	// TODO
	response := dto.UserResponse{}

	c.JSONP(http.StatusCreated, response)
}

func (h UserApiHandler) findAll(c *gin.Context) {
	response := dto.ToListOfUserResponse(*h.UseCase.FindAll())
	c.JSONP(http.StatusOK, response)
}

func (h UserApiHandler) findById(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Params.ByName("id"), 32, 1)

	user, err := h.UseCase.FindById(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": fmt.Sprintf("User not found with id: %s", id)})
		return
	}

	response := dto.ToUserResponse(*user)
	c.JSONP(http.StatusOK, response)
}

func (h UserApiHandler) update(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Params.ByName("id"), 32, 1)

	var request dto.UserRequest
	c.Bind(&request)

	response := h.buildUserResponse(
		uint(id),
		request.Name,
		request.Email,
		uuid.NewV4().String(),
	)
	c.JSONP(202, response)
}

func (h UserApiHandler) delete(c *gin.Context) {
	id := c.Params.ByName("id")

	// TODO
	// if h.existMock(id) {
	// 	h.deleteMock(id)
	// 	c.JSON(http.StatusOK, gin.H{"message": fmt.Sprintf("User deleted :%s", id)})
	// 	return
	// }

	c.JSON(http.StatusNotFound, gin.H{"message": fmt.Sprintf("User not found :%s", id)})
}

// functions to Mock

func (h UserApiHandler) buildUserResponse(id uint, name string, email string, token string) dto.UserResponse {
	return dto.UserResponse{
		ID:    id,
		Name:  name,
		Email: email,
		Token: token,
	}
}
