package usecases

import (
	"fmt"
	"soccer-betting/domain/models"

	"gorm.io/gorm"
)

type MatchUseCase struct {
	DB *gorm.DB
}

func NewMatchUseCase(db *gorm.DB) *MatchUseCase {
	return &MatchUseCase{DB: db}
}

func (uc MatchUseCase) FindAll() []models.Match {
	matches := []models.Match{}

	err := uc.DB.Order("schedule").Model(&models.Match{}).Preload("TeamA").Preload("TeamB").Find(&matches).Error
	if err != nil {
		fmt.Errorf("Gind Match Error: %v", err)
	}

	return matches
}

func (uc *MatchUseCase) FindById(id string) (error, *models.Match) {
	var match models.Match

	result := uc.DB.Where("id = ?", id).First(&match)
	if result.RowsAffected == 0 {
		return result.Error, nil
	}

	fmt.Println("Match found")
	return nil, &match
}
