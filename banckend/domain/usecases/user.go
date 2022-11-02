package usecases

import (
	"fmt"
	"world-cup/domain/models"

	"gorm.io/gorm"
)

type UserUseCase struct {
	DB *gorm.DB
}

func NewUserUseCase(db *gorm.DB) *UserUseCase {
	return &UserUseCase{DB: db}
}

func (uc *UserUseCase) FindAll() *[]models.User {
	allUsers := []models.User{}

	uc.DB.Find(&allUsers)

	return &allUsers
}

func (uc *UserUseCase) FindById(id uint) (*models.User, error) {
	var user models.User

	result := uc.DB.Where("id = ?", id).First(&user)
	if result.RowsAffected == 0 {
		return nil, result.Error
	}

	fmt.Println("User found")
	return &user, nil
}
