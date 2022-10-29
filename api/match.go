package api

import (
	"fmt"
	"net/http"
	"world-cup/domain/usecases"

	"github.com/gin-gonic/gin"
)

type MatchApiHandler struct {
	UseCase *usecases.MatchUseCase
}

func NewMatchApiHandler(useCase *usecases.MatchUseCase) MatchApiHandler {
	return MatchApiHandler{UseCase: useCase}
}

func (h MatchApiHandler) Routes(router *gin.Engine) {
	router.GET("/matches", h.findAll)
	router.GET("/matches/:id", h.findById)
}

func (h MatchApiHandler) findAll(c *gin.Context) {
	c.JSONP(http.StatusOK, h.UseCase.FindAll())
}

func (h MatchApiHandler) findById(c *gin.Context) {
	id := c.Params.ByName("id")

	err, group := h.UseCase.FindById(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": fmt.Sprintf("Match not found with id: %s", id)})
		return
	}

	c.JSONP(http.StatusOK, group)
}
