package handler

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	uuid "github.com/satori/go.uuid"
)

type UserRequest struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

type UserResponse struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
	Token string `json:"token"`
}

var UsersResponseMock []UserResponse

type UserApiHandler struct {
	// create CreateUserUseCase
	// read   ReadUserUseCase
	// update UpdateUserUseCase
	// delete DeleteUserUseCase
}

func NewUserApiHandler(
// c CreateUserUseCase
// r ReadUserUseCase
// u UpdateUserUseCase
// d DeleteUserUseCase
) UserApiHandler {
	UsersResponseMock = []UserResponse{
		{ID: uuid.NewV4().String(), Name: "User Mock 1", Email: "usermock1@gmail.com", Token: uuid.NewV4().String()},
		{ID: uuid.NewV4().String(), Name: "User Mock 2", Email: "usermock2@gmail.com", Token: uuid.NewV4().String()},
		{ID: uuid.NewV4().String(), Name: "User Mock 2", Email: "usermock3@gmail.com", Token: uuid.NewV4().String()},
	}

	return UserApiHandler{
		// create: c
		// read: r
		// update: u
		// delete: d
	}
}

func (h UserApiHandler) Routes(router *gin.Engine) {
	router.POST("/users", h.create)
	router.GET("/users", h.readAll)
	router.GET("/users/:id", h.read)
	router.PUT("/users/:id", h.update)
	router.DELETE("/users/:id", h.delete)
}

func (h UserApiHandler) create(c *gin.Context) {
	var request UserRequest
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

func (h UserApiHandler) readAll(c *gin.Context) {
	c.JSONP(http.StatusOK, UsersResponseMock)
}

func (h UserApiHandler) read(c *gin.Context) {
	id := c.Params.ByName("id")

	for _, item := range UsersResponseMock {
		if item.ID == id {
			c.JSONP(http.StatusOK, item)
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"message": fmt.Sprintf("User not found with id: %s", id)})
}

func (h UserApiHandler) update(c *gin.Context) {
	id := c.Params.ByName("id")

	var request UserRequest
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

func (h UserApiHandler) buildUserResponse(id string, name string, email string, token string) UserResponse {
	return UserResponse{
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
	var newList = make([]UserResponse, len(UsersResponseMock)-1)
	var newIndex = 0
	for _, item := range UsersResponseMock {
		if item.ID != id {
			newList[newIndex] = item
			newIndex++
		}
	}
	UsersResponseMock = newList
}
