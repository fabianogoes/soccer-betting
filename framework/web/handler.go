package web

import (
	"github.com/gin-gonic/gin"
)

type ApiHandler struct {
}

func NewApiHandler() ApiHandler {
	return ApiHandler{}
}

func (h ApiHandler) Routes(router *gin.Engine) {
	router.GET("/health", h.health)
	router.POST("/user", h.createUser)
}

func (h ApiHandler) health(c *gin.Context) {
	c.JSON(200, gin.H{
		"status": "UP",
	})
}

func (h ApiHandler) createUser(c *gin.Context) {
	c.JSON(200, gin.H{
		"status": "OK",
	})
}
