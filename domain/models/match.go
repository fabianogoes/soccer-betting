package models

import (
	"time"

	"github.com/google/uuid"
)

type Match struct {
	BaseModel
	TeamA    Team
	TeamAID  string `gorm:"index:idx_teams_schedule,unique"`
	TeamB    Team
	TeamBID  string    `gorm:"index:idx_teams_schedule,unique"`
	Schedule time.Time `gorm:"index:idx_teams_schedule,unique"`
}

func NewMatch(teamA Team, teamB Team, schedule time.Time) *Match {
	match := &Match{TeamA: teamA, TeamB: teamB, Schedule: schedule}
	match.ID = uuid.New().String()
	return match
}
