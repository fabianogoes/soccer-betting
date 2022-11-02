package api

import (
	"fmt"
	"net/http"
	"world-cup/domain/usecases"

	"github.com/gin-gonic/gin"
)

type TeamApiHandler struct {
	UseCase *usecases.TeamUseCase
}

func NewTeamApiHandler(useCase *usecases.TeamUseCase) TeamApiHandler {
	return TeamApiHandler{UseCase: useCase}
}

func (h TeamApiHandler) Routes(router *gin.Engine) {
	router.GET("/teams", h.findAll)
	router.GET("/teams/:id", h.findById)
}

func (h TeamApiHandler) findAll(c *gin.Context) {
	c.JSONP(http.StatusOK, h.UseCase.FindAll())
}

func (h TeamApiHandler) findById(c *gin.Context) {
	id := c.Params.ByName("id")

	err, team := h.UseCase.FindById(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": fmt.Sprintf("Team not found with id: %s", id)})
		return
	}

	c.JSONP(http.StatusOK, team)
}
