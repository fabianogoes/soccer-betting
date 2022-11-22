package controller

import (
	"fmt"
	"net/http"
	"soccer-betting/domain/usecases"

	"github.com/gin-gonic/gin"
)

type MatchResponse struct {
	ID          uint         `json:"id"`
	TeamA       TeamResponse `json:"teamA"`
	TeamAResult int          `json:"teamAResult"`
	TeamB       TeamResponse `json:"teamB"`
	TeamBResult int          `json:"teamBResult"`
	Schedule    string       `json:"schedule"`
	Finished    bool         `json:"finished"`
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
}

func (h MatchApiHandler) findAll(c *gin.Context) {

	listRepository := h.UseCase.FindAll()
	listResponse := []MatchResponse{}
	for _, model := range listRepository {
		dto := MatchResponse{
			ID: model.Model.ID,
			TeamA: TeamResponse{
				ID:           model.TeamA.Model.ID,
				Name:         model.TeamA.NamePTBR,
				Group:        model.TeamA.Group,
				Abbreviation: model.TeamA.Abbreviation,
			},
			TeamAResult: model.TeamAResult,
			TeamB: TeamResponse{
				ID:           model.TeamB.Model.ID,
				Name:         model.TeamB.NamePTBR,
				Group:        model.TeamB.Group,
				Abbreviation: model.TeamB.Abbreviation,
			},
			TeamBResult: model.TeamBResult,
			// Schedule:    model.Schedule.Format("2006-01-02 15:04:05"),
			Schedule: model.Schedule.UTC().Format("2006-01-02 15:04:05"),
			Finished: model.Finished,
		}
		listResponse = append(listResponse, dto)
	}

	c.JSONP(http.StatusOK, listResponse)
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
