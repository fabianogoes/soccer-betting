package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type BaseModel struct {
	gorm.Model
	ID string `gorm:"type:varchar(255);primary_key"`
}

func (b *BaseModel) SetID(id uuid.UUID) {
	b.ID = id.String()
}
