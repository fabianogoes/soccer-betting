package models

import "github.com/google/uuid"

type Team struct {
	BaseModel
	Name  string `gorm:"type:varchar(255);uniqueIndex;not null"`
	Group string `gorm:"type:char(1);not null"`
}

func NewTeam(name string, group string) *Team {
	team := &Team{Name: name, Group: group}
	team.SetID(uuid.New())
	return team
}
