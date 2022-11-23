package controller

import (
	"fmt"
	"net/http"
	"soccer-betting/api/dto"
	"soccer-betting/domain/usecases"
	"strconv"

	"github.com/gin-gonic/gin"
)

type UpdateMatchRequest struct {
	TeamAResult int  `json:"teamAResult"`
	TeamBResult int  `json:"teamBResult"`
	Finished    bool `json:"finished"`
}

type MatchApiHandler struct {
	UseCase *usecases.MatchUseCase
}

func NewMatchApiHandler(useCase *usecases.MatchUseCase) MatchApiHandler {
	return MatchApiHandler{UseCase: useCase}
}

func (h MatchApiHandler) Routes(router *gin.Engine) {
	router.GET("/matches", h.findAll)
	router.GET("/matches/:id", h.findById)
	router.PUT("/matches/:id", h.updateById)
}

func (h MatchApiHandler) findAll(c *gin.Context) {

	listRepository := h.UseCase.FindAll()
	listResponse := []dto.MatchResponse{}
	for _, model := range listRepository {
		listResponse = append(listResponse, dto.ToMatchResponse(&model))
	}

	c.JSONP(http.StatusOK, listResponse)
}

func (h MatchApiHandler) findById(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Params.ByName("id"), 10, 64)

	model, err := h.UseCase.FindById(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": fmt.Sprintf("Match not found with id: %d", id)})
		return
	}

	c.JSONP(http.StatusOK, dto.ToMatchResponse(model))
}

func (h MatchApiHandler) updateById(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Params.ByName("id"), 10, 64)

	var requestBody UpdateMatchRequest
	c.Bind(&requestBody)

	findUpdate, notFound := h.UseCase.FindById(id)
	if notFound != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": fmt.Sprintf("Match not found with id: %v", id)})
		return
	}

	model, error := h.UseCase.UpdateResult(findUpdate, requestBody.TeamAResult, requestBody.TeamBResult, requestBody.Finished)
	if error != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": fmt.Sprintf("Match not found with id: %v", id)})
		return
	}

	c.JSONP(202, dto.ToMatchResponse(model))
}
