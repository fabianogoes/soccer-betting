package controller

import (
	"fmt"
	"net/http"
	"soccer-betting/api/dto"
	"soccer-betting/domain/usecases"
	"strconv"

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
	listRepository := h.UseCase.FindAll()
	listResponse := []dto.TeamResponse{}
	for _, model := range listRepository {
		listResponse = append(listResponse, dto.ToTeamResponse(&model))
	}

	c.JSONP(http.StatusOK, listResponse)
}

func (h TeamApiHandler) findById(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Params.ByName("id"), 10, 64)

	model, err := h.UseCase.FindById(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": fmt.Sprintf("Team not found with id: %d", id)})
		return
	}

	c.JSONP(http.StatusOK, dto.ToTeamResponse(model))
}
