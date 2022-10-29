package api

import (
	"fmt"
	"net/http"
	"world-cup/api/dto"
	"world-cup/domain/usecases"

	"github.com/gin-gonic/gin"
	uuid "github.com/satori/go.uuid"
)

var UsersResponseMock []dto.UserResponse

type UserApiHandler struct {
	UseCase *usecases.UserUseCase
}

func NewUserApiHandler(
	useCase *usecases.UserUseCase,
) UserApiHandler {
	UsersResponseMock = []dto.UserResponse{
		{ID: uuid.NewV4().String(), Name: "User Mock 1", Email: "usermock1@gmail.com", Token: uuid.NewV4().String()},
		{ID: uuid.NewV4().String(), Name: "User Mock 2", Email: "usermock2@gmail.com", Token: uuid.NewV4().String()},
		{ID: uuid.NewV4().String(), Name: "User Mock 2", Email: "usermock3@gmail.com", Token: uuid.NewV4().String()},
	}

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

	response := h.buildUserResponse(
		uuid.NewV4().String(),
		request.Name,
		request.Email,
		uuid.NewV4().String(),
	)

	UsersResponseMock = append(UsersResponseMock, response)

	c.JSONP(http.StatusCreated, response)
}

func (h UserApiHandler) findAll(c *gin.Context) {
	response := dto.ToListOfUserResponse(*h.UseCase.FindAll())
	c.JSONP(http.StatusOK, response)
}

func (h UserApiHandler) findById(c *gin.Context) {
	id := c.Params.ByName("id")

	err, user := h.UseCase.FindById(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": fmt.Sprintf("User not found with id: %s", id)})
		return
	}

	response := dto.ToUserResponse(*user)
	c.JSONP(http.StatusOK, response)
}

func (h UserApiHandler) update(c *gin.Context) {
	id := c.Params.ByName("id")

	var request dto.UserRequest
	c.Bind(&request)

	response := h.buildUserResponse(
		id,
		request.Name,
		request.Email,
		uuid.NewV4().String(),
	)
	c.JSONP(202, response)
}

func (h UserApiHandler) delete(c *gin.Context) {
	id := c.Params.ByName("id")

	if h.existMock(id) {
		h.deleteMock(id)
		c.JSON(http.StatusOK, gin.H{"message": fmt.Sprintf("User deleted :%s", id)})
		return
	}

	c.JSON(http.StatusNotFound, gin.H{"message": fmt.Sprintf("User not found :%s", id)})
}

// functions to Mock

func (h UserApiHandler) buildUserResponse(id string, name string, email string, token string) dto.UserResponse {
	return dto.UserResponse{
		ID:    id,
		Name:  name,
		Email: email,
		Token: token,
	}
}

func (h UserApiHandler) existMock(id string) bool {
	for _, item := range UsersResponseMock {
		if item.ID == id {
			return true
		}
	}

	return false
}

func (h UserApiHandler) deleteMock(id string) {
	var newList = make([]dto.UserResponse, len(UsersResponseMock)-1)
	var newIndex = 0
	for _, item := range UsersResponseMock {
		if item.ID != id {
			newList[newIndex] = item
			newIndex++
		}
	}
	UsersResponseMock = newList
}
