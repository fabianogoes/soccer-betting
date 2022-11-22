package models

import (
	"time"

	"gorm.io/gorm"
)

type Match struct {
	gorm.Model
	TeamA       Team
	TeamAID     string `gorm:"index:idx_teams_schedule,unique"`
	TeamAResult int
	TeamB       Team
	TeamBID     string `gorm:"index:idx_teams_schedule,unique"`
	TeamBResult int
	Schedule    time.Time `gorm:"index:idx_teams_schedule,unique"`
	Finished    bool
}

func NewMatch(teamA Team, teamB Team, schedule time.Time) *Match {
	return &Match{TeamA: teamA, TeamB: teamB, Schedule: schedule}
}
