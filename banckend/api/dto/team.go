package dto

import "soccer-betting/domain/models"

type TeamResponse struct {
	ID           uint   `json:"id"`
	Name         string `json:"name"`
	Group        string `json:"group"`
	Abbreviation string `json:"abbreviation"`
}

func ToTeamResponse(model *models.Team) TeamResponse {
	return TeamResponse{
		ID:           model.Model.ID,
		Name:         model.NamePTBR,
		Group:        model.Group,
		Abbreviation: model.Abbreviation,
	}
}
