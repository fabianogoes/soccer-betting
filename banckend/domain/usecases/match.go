package usecases

import (
	"soccer-betting/domain/models"

	"go.uber.org/zap"
	"gorm.io/gorm"
)

type MatchUseCase struct {
	DB     *gorm.DB
	Logger *zap.SugaredLogger
}

func NewMatchUseCase(db *gorm.DB, logger *zap.SugaredLogger) *MatchUseCase {
	return &MatchUseCase{DB: db, Logger: logger}
}

func (uc MatchUseCase) FindAll() []models.Match {
	matches := []models.Match{}

	err := uc.DB.Order("schedule").Model(&models.Match{}).Preload("TeamA").Preload("TeamB").Find(&matches).Error
	if err != nil {
		uc.Logger.Errorf("Gind Match Error: %v", err)
	}

	return matches
}

func (uc *MatchUseCase) FindById(id uint64) (*models.Match, error) {
	uc.Logger.Infof("FindById(%d) \n", id)
	var match models.Match

	result := uc.DB.Where("id = ?", id).Preload("TeamA").Preload("TeamB").First(&match)
	if result.RowsAffected == 0 {
		uc.Logger.Errorf("Match not found - %v", result.Error)
		return nil, result.Error
	}

	return &match, nil
}

func (uc *MatchUseCase) UpdateResult(findUpdate *models.Match, teamAResult int, teamBResult int, finished bool) (*models.Match, error) {
	uc.Logger.Infof("UpdateById(%d, %d, %d, %v) \n", findUpdate.ID, teamAResult, teamBResult, finished)

	findUpdate.TeamAResult = teamAResult
	findUpdate.TeamBResult = teamBResult
	findUpdate.Finished = finished

	result := uc.DB.Save(&findUpdate)
	if result.RowsAffected == 0 {
		uc.Logger.Errorf("Error on update Match: %v \n", result.Error)
		return nil, result.Error
	}

	return findUpdate, nil
}
