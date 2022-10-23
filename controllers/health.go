package controllers

import (
	"github.com/gin-gonic/gin"
)

type HealthApiHandler struct {
}

func NewHealthApiHandler() HealthApiHandler {
	return HealthApiHandler{}
}

func (h HealthApiHandler) Routes(router *gin.Engine) {
	router.GET("/health", h.health)
}

func (h HealthApiHandler) health(c *gin.Context) {
	c.JSON(200, gin.H{
		"status": "UP",
	})
}
