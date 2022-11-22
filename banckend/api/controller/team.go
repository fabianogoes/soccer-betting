package controller

import (
	"fmt"
	"net/http"
	"soccer-betting/domain/usecases"

	"github.com/gin-gonic/gin"
)

type TeamResponse struct {
	ID           uint   `json:"id"`
	Name         string `json:"name"`
	Group        string `json:"group"`
	Abbreviation string `json:"abbreviation"`
}

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
	listResponse := []TeamResponse{}
	for _, model := range listRepository {
		dto := TeamResponse{
			ID:           model.Model.ID,
			Name:         model.NamePTBR,
			Group:        model.Group,
			Abbreviation: model.Abbreviation,
		}
		fmt.Println(dto)
		listResponse = append(listResponse, dto)
	}

	c.JSONP(http.StatusOK, listResponse)
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
