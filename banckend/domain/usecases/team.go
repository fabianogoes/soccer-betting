package usecases

import (
	"fmt"
	"soccer-betting/domain/models"

	"gorm.io/gorm"
)

type TeamUseCase struct {
	DB *gorm.DB
}

func NewTeamUseCase(db *gorm.DB) *TeamUseCase {
	return &TeamUseCase{DB: db}
}

func (uc TeamUseCase) FindAll() []models.Team {
	teams := []models.Team{}

	uc.DB.Order("id").Find(&teams)
	for _, t := range teams {
		fmt.Println(t)
	}

	return teams
}

func (uc *TeamUseCase) FindById(id uint64) (*models.Team, error) {
	var team models.Team

	result := uc.DB.Where("id = ?", id).First(&team)
	if result.RowsAffected == 0 {
		return nil, result.Error
	}

	fmt.Println("Team found")
	return &team, nil
}
