package postgres

import (
	"fmt"
	"log"
	"world-cup/domain"
	"world-cup/domain/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var (
	DB  *gorm.DB
	err error
)

func Setup() {
	config := domain.NewConfiguration()
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=America/Sao_Paulo",
		config.Postgres.Host, config.Postgres.User, config.Postgres.Password, config.Postgres.DatabaseName, config.Postgres.Port)

	options := &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info), // show SQL
	}

	DB, err = gorm.Open(postgres.Open(dsn), options)
	if err != nil {
		log.Panic("Error to connect Postgres Database - ", err)
	}

	DB.AutoMigrate(&models.User{})
	InitializeData()
}
