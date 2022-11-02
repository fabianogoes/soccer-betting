package models

import (
	"fmt"

	"gorm.io/gorm"
)

type Team struct {
	gorm.Model
	Name         string `gorm:"type:varchar(255);not null"`
	Group        string `gorm:"type:char(1);not null"`
	NamePTBR     string `gorm:"type:varchar(255);not null"`
	Abbreviation string `gorm:"type:char(3);unique;not null"`
}

func NewTeam(group string, name string, namePTBR string, abbr string) *Team {
	return &Team{Group: group, Name: name, NamePTBR: namePTBR, Abbreviation: abbr}
}

func (t *Team) ToString() string {
	return fmt.Sprintf("id: %s, name: %s", t.ID, t.Name)
}
