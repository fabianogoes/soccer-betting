package dto

import "soccer-betting/domain/models"

type MatchResponse struct {
	ID          uint         `json:"id"`
	TeamA       TeamResponse `json:"teamA"`
	TeamAResult int          `json:"teamAResult"`
	TeamB       TeamResponse `json:"teamB"`
	TeamBResult int          `json:"teamBResult"`
	Schedule    string       `json:"schedule"`
	Finished    bool         `json:"finished"`
}

func ToMatchResponse(model *models.Match) MatchResponse {
	return MatchResponse{
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
		Schedule:    model.Schedule.UTC().Format("2006-01-02 15:04:05"),
		Finished:    model.Finished,
	}
}
