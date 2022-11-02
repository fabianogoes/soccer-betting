package domain

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Configuration struct {
	Enviroment string
	Web        *WebConfig
	Postgres   *PostgresConfig
}

type WebConfig struct {
	Addr string
}

type PostgresConfig struct {
	Host         string
	Port         string
	User         string
	Password     string
	DatabaseName string
}

func NewConfiguration() *Configuration {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Erroe loading envs: %v", err)
	}

	return &Configuration{
		Enviroment: os.Getenv("ENVIRONMENT"),
		Web:        &WebConfig{Addr: os.Getenv("SERVER_ADDRESS")},
		Postgres: &PostgresConfig{
			Host:         os.Getenv("DB_HOST"),
			Port:         os.Getenv("DB_PORT"),
			User:         os.Getenv("DB_USER"),
			Password:     os.Getenv("DB_PASSWORD"),
			DatabaseName: os.Getenv("DB_NAME"),
		},
	}
}
