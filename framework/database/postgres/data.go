package postgres

import (
	"world-cup/domain/models"

	uuid "github.com/satori/go.uuid"
)

func InitializeData() {
	adminEmail := "admin@admin.com"

	if DB.First(&models.User{Email: adminEmail}).RowsAffected == 0 {
		admin := &models.User{
			ID:       uuid.NewV4().String(),
			Name:     "Admin",
			Email:    adminEmail,
			Password: "admin",
		}
		admin.Prepare()
		DB.Create(&admin)
	}
}
