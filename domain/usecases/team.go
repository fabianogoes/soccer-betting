package usecases

import (
	"fmt"
	"world-cup/domain/models"

	"gorm.io/gorm"
)

type TeamUseCase struct {
	DB *gorm.DB
}

func NewTeamUseCase(db *gorm.DB) *TeamUseCase {
	return &TeamUseCase{DB: db}
}

func (uc TeamUseCase) FindAll() *[]models.Team {
	teams := []models.Team{}

	uc.DB.Find(&teams)

	return &teams
}

func (uc *TeamUseCase) FindById(id string) (error, *models.Team) {
	var team models.Team

	result := uc.DB.Where("id = ?", id).First(&team)
	if result.RowsAffected == 0 {
		return result.Error, nil
	}

	fmt.Println("Team found")
	return nil, &team
}
