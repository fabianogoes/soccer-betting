package initializers

import (
	"fmt"
	"log"
	"world-cup/domain/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var (
	DB  *gorm.DB
	err error
)

func SetupPostgres(config *Config) {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=America/Sao_Paulo",
		config.DBHost, config.DBUserName, config.DBUserPassword, config.DBName, config.DBPort)

	options := &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info), // show SQL
	}

	DB, err = gorm.Open(postgres.Open(dsn), options)
	if err != nil {
		log.Panic("Error to connect Postgres Database - ", err)
	}

	DB.AutoMigrate(&models.User{}, &models.Team{})

	usersAutoPopulate()
	temsAutoPopulate()
}

func usersAutoPopulate() {
	adminEmail := "admin@admin.com"

	if DB.First(&models.User{Email: adminEmail}).RowsAffected == 0 {
		DB.Create(models.NewUser("Admin", adminEmail, "admin"))
	}
}

func temsAutoPopulate() {
	createTeams("A", "Qatar", "Ecuador", "Senegal", "Netherlands")
	createTeams("B", "England", "IR Iran", "USA", "Wales")
	createTeams("C", "Argentina", "Saudi Arabia", "Mexico", "Poland")
	createTeams("D", "France", "Australia", "Denmark", "Tunisia")
	createTeams("E", "Spain", "Costa Rica", "Germany", "Japan")
	createTeams("F", "Belgium", "Canada", "Morocco", "Croatia")
	createTeams("G", "Brazil", "Serbia", "Switzerland", "Cameroon", "G")
	createTeams("H", "Portugal", "Ghana", "Uruguay", "Korea Republic")
}

func createTeams(group string, teams ...string) {
	for _, team := range teams {
		DB.Create(models.NewTeam(team, group))
	}
}
