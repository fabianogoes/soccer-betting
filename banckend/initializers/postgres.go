package initializers

import (
	"fmt"
	"log"
	"os"
	"soccer-betting/domain/models"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var (
	DB  *gorm.DB
	err error
)

func init() {
	os.Setenv("TZ", "America/Sao_Paulo")

	time.Local, _ = time.LoadLocation("America/Sao_Paulo")
	fmt.Println("Tempo SP:", time.Now())
}

func SetupPostgres(config *Config) {
	log.Println("Setup Postgress...")
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=America/Sao_Paulo",
		config.DBHost, config.DBUserName, config.DBUserPassword, config.DBName, config.DBPort)

	options := &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info), // show SQL
	}

	DB, err = gorm.Open(postgres.Open(dsn), options)
	if err != nil {
		log.Panic("Error to connect Postgres Database - ", err)
	}

	DB.Session(&gorm.Session{
		NowFunc: func() time.Time {
			return time.Now().Local()
		},
	})

	DB.AutoMigrate(
		&models.User{},
		&models.Team{},
		&models.Match{},
	)

	// usersAutoPopulate()
	// temsAutoPopulate()
	// matchesAutoPopulate()
}

func usersAutoPopulate() {
	adminEmail := "admin@admin.com"

	if DB.First(&models.User{Email: adminEmail}).RowsAffected == 0 {
		DB.Create(models.NewUser("Admin", adminEmail, "admin"))
	}
}

var (
	// TIMES GRUPO A
	CAT = &models.Team{Group: "A", Name: "Qatar", NamePTBR: "Catar", Abbreviation: "CAT"}
	EQU = &models.Team{Group: "A", Name: "Ecuador", NamePTBR: "Equador", Abbreviation: "EQU"}
	SEN = &models.Team{Group: "A", Name: "Senegal", NamePTBR: "Senagal", Abbreviation: "SEN"}
	HOL = &models.Team{Group: "A", Name: "Netherlands", NamePTBR: "Holanda", Abbreviation: "HOL"}
	// TIMES GRUPO B
	ING = &models.Team{Group: "B", Name: "England", NamePTBR: "Inglaterra", Abbreviation: "ING"}
	IRA = &models.Team{Group: "B", Name: "Iran", NamePTBR: "Irã", Abbreviation: "IRA"}
	EUA = &models.Team{Group: "B", Name: "USA", NamePTBR: "EUA", Abbreviation: "EUA"}
	GAL = &models.Team{Group: "B", Name: "Wales", NamePTBR: "País de Gales", Abbreviation: "GAL"}
	// TIMES GRUPO C
	ARG = &models.Team{Group: "C", Name: "Argentina", NamePTBR: "Argentina", Abbreviation: "ARG"}
	ARA = &models.Team{Group: "C", Name: "Saudi Arabia", NamePTBR: "Arábia Saudita", Abbreviation: "ARA"}
	MEX = &models.Team{Group: "C", Name: "Mexico", NamePTBR: "México", Abbreviation: "MEX"}
	POL = &models.Team{Group: "C", Name: "Poland", NamePTBR: "Polônias", Abbreviation: "POL"}
	// TIMES GRUPO D
	FRA = &models.Team{Group: "D", Name: "France", NamePTBR: "França", Abbreviation: "FRA"}
	AUS = &models.Team{Group: "D", Name: "Australia", NamePTBR: "Austrália", Abbreviation: "AUS"}
	DIN = &models.Team{Group: "D", Name: "Denmark", NamePTBR: "Dinamarca", Abbreviation: "DIN"}
	TUN = &models.Team{Group: "D", Name: "Tunisia", NamePTBR: "Tunísia", Abbreviation: "TUN"}
	// TIMES GRUPO E
	ESP = &models.Team{Group: "E", Name: "Spain", NamePTBR: "Espanha", Abbreviation: "ESP"}
	CRC = &models.Team{Group: "E", Name: "Costa Rica", NamePTBR: "Costa Rica", Abbreviation: "CRC"}
	ALE = &models.Team{Group: "E", Name: "Germany", NamePTBR: "Alemanha", Abbreviation: "ALE"}
	JAP = &models.Team{Group: "E", Name: "Japan", NamePTBR: "Japão", Abbreviation: "JAP"}
	// TIMES GRUPO F
	BEL = &models.Team{Group: "F", Name: "Belgium", NamePTBR: "Bélgica", Abbreviation: "BEL"}
	CAN = &models.Team{Group: "F", Name: "Canada", NamePTBR: "Canadá", Abbreviation: "CAN"}
	MAR = &models.Team{Group: "F", Name: "Morocco", NamePTBR: "Marrocos", Abbreviation: "MAR"}
	CRO = &models.Team{Group: "F", Name: "Croatia", NamePTBR: "Croácia", Abbreviation: "CRO"}
	// TIMES GRUPO G
	BRA = &models.Team{Group: "G", Name: "Brazil", NamePTBR: "Brasil", Abbreviation: "BRA"}
	SRV = &models.Team{Group: "G", Name: "Serbia", NamePTBR: "Sérvia", Abbreviation: "SRV"}
	SUI = &models.Team{Group: "G", Name: "Switzerland", NamePTBR: "Suíça", Abbreviation: "SUI"}
	CAM = &models.Team{Group: "G", Name: "Cameroon", NamePTBR: "Camarões", Abbreviation: "CAM"}
	// TIMES GRUPO H
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
		FRA, AUS, DIN, TUN,
		ESP, CRC, ALE, JAP,
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

func matchesAutoPopulate() {
	// MATCHES GROUP A
	fmt.Println(">>> INSERT MATCHES GROUP A <<<")
	createMatch(SEN, HOL, time.Date(2022, 11, 21, 07, 0, 0, 0, time.Local))
	createMatch(CAT, EQU, time.Date(2022, 11, 21, 13, 0, 0, 0, time.Local))
	createMatch(CAT, SEN, time.Date(2022, 11, 25, 10, 0, 0, 0, time.Local))
	createMatch(HOL, EQU, time.Date(2022, 11, 25, 13, 0, 0, 0, time.Local))
	createMatch(HOL, CAT, time.Date(2022, 11, 29, 12, 0, 0, 0, time.Local))
	createMatch(EQU, SEN, time.Date(2022, 11, 29, 12, 0, 0, 0, time.Local))
	// MATCHES GROUP B
	fmt.Println(">>> INSERT MATCHES GROUP B <<<")
	createMatch(ING, IRA, time.Date(2022, 11, 21, 10, 0, 0, 0, time.Local))
	createMatch(EUA, GAL, time.Date(2022, 11, 21, 16, 0, 0, 0, time.Local))
	createMatch(GAL, IRA, time.Date(2022, 11, 25, 07, 0, 0, 0, time.Local))
	createMatch(ING, EUA, time.Date(2022, 11, 25, 16, 0, 0, 0, time.Local))
	createMatch(GAL, ING, time.Date(2022, 11, 29, 16, 0, 0, 0, time.Local))
	createMatch(IRA, EUA, time.Date(2022, 11, 29, 16, 0, 0, 0, time.Local))
	// MATCHES GROUP C
	fmt.Println(">>> INSERT MATCHES GROUP C <<<")
	createMatch(ARG, ARA, time.Date(2022, 11, 22, 07, 0, 0, 0, time.Local))
	createMatch(MEX, POL, time.Date(2022, 11, 22, 13, 0, 0, 0, time.Local))
	createMatch(POL, ARA, time.Date(2022, 11, 26, 10, 0, 0, 0, time.Local))
	createMatch(ARG, MEX, time.Date(2022, 11, 26, 16, 0, 0, 0, time.Local))
	createMatch(POL, ARG, time.Date(2022, 11, 30, 16, 0, 0, 0, time.Local))
	createMatch(ARA, MEX, time.Date(2022, 11, 30, 16, 0, 0, 0, time.Local))
	// MATCHES GROUP D
	fmt.Println(">>> INSERT MATCHES GROUP D <<<")
	createMatch(DIN, TUN, time.Date(2022, 11, 22, 10, 0, 0, 0, time.Local))
	createMatch(FRA, AUS, time.Date(2022, 11, 22, 16, 0, 0, 0, time.Local))
	createMatch(TUN, AUS, time.Date(2022, 11, 26, 07, 0, 0, 0, time.Local))
	createMatch(FRA, DIN, time.Date(2022, 11, 26, 13, 0, 0, 0, time.Local))
	createMatch(AUS, DIN, time.Date(2022, 11, 30, 12, 0, 0, 0, time.Local))
	createMatch(TUN, FRA, time.Date(2022, 11, 30, 12, 0, 0, 0, time.Local))
	// MATCHES GROUP E
	fmt.Println(">>> INSERT MATCHES GROUP E <<<")
	createMatch(ALE, JAP, time.Date(2022, 11, 23, 10, 0, 0, 0, time.Local))
	createMatch(ESP, CRC, time.Date(2022, 11, 23, 13, 0, 0, 0, time.Local))
	createMatch(JAP, CRC, time.Date(2022, 11, 27, 07, 0, 0, 0, time.Local))
	createMatch(ESP, ALE, time.Date(2022, 11, 27, 16, 0, 0, 0, time.Local))
	createMatch(JAP, ESP, time.Date(2022, 12, 01, 16, 0, 0, 0, time.Local))
	createMatch(CRC, ALE, time.Date(2022, 12, 01, 16, 0, 0, 0, time.Local))
	// MATCHES GROUP F
	fmt.Println(">>> INSERT MATCHES GROUP F <<<")
	createMatch(MAR, CRO, time.Date(2022, 11, 23, 07, 0, 0, 0, time.Local))
	createMatch(BEL, CAN, time.Date(2022, 11, 23, 16, 0, 0, 0, time.Local))
	createMatch(BEL, MAR, time.Date(2022, 11, 27, 10, 0, 0, 0, time.Local))
	createMatch(CRO, CAN, time.Date(2022, 11, 27, 13, 0, 0, 0, time.Local))
	createMatch(CRO, BEL, time.Date(2022, 12, 01, 12, 0, 0, 0, time.Local))
	createMatch(CAN, MAR, time.Date(2022, 12, 01, 12, 0, 0, 0, time.Local))
	// MATCHES GROUP G
	fmt.Println(">>> INSERT MATCHES GROUP G <<<")
	createMatch(SUI, CAM, time.Date(2022, 11, 24, 07, 0, 0, 0, time.Local))
	createMatch(BRA, SRV, time.Date(2022, 11, 24, 16, 0, 0, 0, time.Local))
	createMatch(CAM, SRV, time.Date(2022, 11, 28, 07, 0, 0, 0, time.Local))
	createMatch(BRA, SUI, time.Date(2022, 11, 28, 13, 0, 0, 0, time.Local))
	createMatch(SRV, SUI, time.Date(2022, 12, 02, 16, 0, 0, 0, time.Local))
	createMatch(CAM, BRA, time.Date(2022, 12, 02, 16, 0, 0, 0, time.Local))
	// MATCHES GROUP H
	fmt.Println(">>> INSERT MATCHES GROUP H <<<")
	createMatch(URU, COR, time.Date(2022, 11, 24, 10, 0, 0, 0, time.Local))
	createMatch(POR, GAN, time.Date(2022, 11, 24, 13, 0, 0, 0, time.Local))
	createMatch(COR, GAN, time.Date(2022, 11, 28, 10, 0, 0, 0, time.Local))
	createMatch(POR, URU, time.Date(2022, 11, 28, 16, 0, 0, 0, time.Local))
	createMatch(GAN, URU, time.Date(2022, 12, 02, 12, 0, 0, 0, time.Local))
	createMatch(COR, POR, time.Date(2022, 12, 02, 12, 0, 0, 0, time.Local))
}

func createMatch(teamA *models.Team, teamB *models.Team, schedule time.Time) {
	var ta models.Team
	DB.Where("abbreviation = ?", teamA.Abbreviation).First(&ta)

	var tb models.Team
	DB.Where("abbreviation = ?", teamB.Abbreviation).First(&tb)

	DB.Create(models.NewMatch(ta, tb, schedule))
}
