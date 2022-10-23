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

var (
	CAT = &models.Team{Group: "A", Name: "Qatar", NamePTBR: "Catar", Abbreviation: "CAT"}
	EQU = &models.Team{Group: "A", Name: "Ecuador", NamePTBR: "Equador", Abbreviation: "EQU"}
	SEN = &models.Team{Group: "A", Name: "Senegal", NamePTBR: "Senagal", Abbreviation: "SEN"}
	HOL = &models.Team{Group: "A", Name: "Netherlands", NamePTBR: "Holanda", Abbreviation: "HOL"}

	ING = &models.Team{Group: "B", Name: "England", NamePTBR: "Holanda", Abbreviation: "ING"}
	IRA = &models.Team{Group: "B", Name: "Iran", NamePTBR: "Irã", Abbreviation: "IRA"}
	EUA = &models.Team{Group: "B", Name: "USA", NamePTBR: "EUA", Abbreviation: "EUA"}
	GAL = &models.Team{Group: "B", Name: "Wales", NamePTBR: "País de Gales", Abbreviation: "GAL"}

	ARG = &models.Team{Group: "C", Name: "Argentina", NamePTBR: "País de Gales", Abbreviation: "ARG"}
	ARA = &models.Team{Group: "C", Name: "Saudi Arabia", NamePTBR: "País de Gales", Abbreviation: "ARA"}
	MEX = &models.Team{Group: "C", Name: "Mexico", NamePTBR: "País de Gales", Abbreviation: "MEX"}
	POL = &models.Team{Group: "C", Name: "Poland", NamePTBR: "País de Gales", Abbreviation: "POL"}

	FRA = &models.Team{Group: "D", Name: "France", NamePTBR: "França", Abbreviation: "FRA"}
	AUS = &models.Team{Group: "D", Name: "Australia", NamePTBR: "Austrália", Abbreviation: "AUS"}
	DEN = &models.Team{Group: "D", Name: "Denmark", NamePTBR: "Dinamarca", Abbreviation: "DEN"}
	TUN = &models.Team{Group: "D", Name: "Tunisia", NamePTBR: "Tunísia", Abbreviation: "TUN"}

	ESP = &models.Team{Group: "E", Name: "Spain", NamePTBR: "Espanha", Abbreviation: "ESP"}
	CRC = &models.Team{Group: "E", Name: "Costa Rica", NamePTBR: "Costa Rica", Abbreviation: "CRC"}
	GER = &models.Team{Group: "E", Name: "Germany", NamePTBR: "Alemanha", Abbreviation: "GEN"}
	JAP = &models.Team{Group: "E", Name: "Japan", NamePTBR: "Japão", Abbreviation: "JAP"}

	BEL = &models.Team{Group: "F", Name: "Belgium", NamePTBR: "Bélgica", Abbreviation: "BEL"}
	CAN = &models.Team{Group: "F", Name: "Canada", NamePTBR: "Canadá", Abbreviation: "CAN"}
	MAR = &models.Team{Group: "F", Name: "Morocco", NamePTBR: "Marrocos", Abbreviation: "MAR"}
	CRO = &models.Team{Group: "F", Name: "Croatia", NamePTBR: "Croácia", Abbreviation: "CRO"}

	BRA = &models.Team{Group: "G", Name: "Brazil", NamePTBR: "Brasil", Abbreviation: "BRA"}
	SRV = &models.Team{Group: "G", Name: "Serbia", NamePTBR: "Sérvia", Abbreviation: "SRV"}
	SUI = &models.Team{Group: "G", Name: "Switzerland", NamePTBR: "Suíça", Abbreviation: "SUI"}
	CAM = &models.Team{Group: "G", Name: "Cameroon", NamePTBR: "Camarões", Abbreviation: "CAM"}

	POR = &models.Team{Group: "H", Name: "Portugal", NamePTBR: "Portugal", Abbreviation: "POR"}
	GAN = &models.Team{Group: "H", Name: "Ghana", NamePTBR: "Gana", Abbreviation: "GAN"}
	URU = &models.Team{Group: "H", Name: "Uruguay", NamePTBR: "Uruguai", Abbreviation: "URU"}
	COR = &models.Team{Group: "H", Name: "Korea Republic", NamePTBR: "Coreia do Sul", Abbreviation: "COR"}
)

func temsAutoPopulate() {
	createTeams(
		CAT, EQU, SEN, HOL,
		ING, IRA, EUA, GAL,
		ARG, ARA, MEX, POL,
		FRA, AUS, DEN, TUN,
		ESP, CRC, GER, JAP,
		BEL, CAN, MAR, CRO,
		BRA, SRV, SUI, CAM,
		POR, GAN, URU, COR,
	)
}

func createTeams(teams ...*models.Team) {
	for _, team := range teams {
		DB.Create(models.NewTeam(team.Group, team.Name, team.NamePTBR, team.Abbreviation))
	}
}

// func matchesAutoPopulate() {
// 	models.NewMatch(
// 		DB.First(&models.Team{Name: ""})
// 	)
// }
