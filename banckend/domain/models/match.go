package models

import (
	"time"

	"gorm.io/gorm"
)

type Match struct {
	gorm.Model
	TeamA    Team
	TeamAID  string `gorm:"index:idx_teams_schedule,unique"`
	TeamB    Team
	TeamBID  string    `gorm:"index:idx_teams_schedule,unique"`
	Schedule time.Time `gorm:"index:idx_teams_schedule,unique"`
}

func NewMatch(teamA Team, teamB Team, schedule time.Time) *Match {
	return &Match{TeamA: teamA, TeamB: teamB, Schedule: schedule}
}
