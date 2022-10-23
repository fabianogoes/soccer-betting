package models

import (
	"fmt"

	"github.com/google/uuid"
)

type Team struct {
	BaseModel
	Name         string `gorm:"type:varchar(255);not null"`
	Group        string `gorm:"type:char(1);not null"`
	NamePTBR     string `gorm:"type:varchar(255);not null"`
	Abbreviation string `gorm:"type:char(3);unique;not null"`
}

func NewTeam(group string, name string, namePTBR string, abbr string) *Team {
	team := &Team{Group: group, Name: name, NamePTBR: namePTBR, Abbreviation: abbr}
	team.SetID(uuid.New())
	return team
}

func (t *Team) ToString() string {
	return fmt.Sprintf("id: %s, name: %s", t.ID, t.Name)
}
