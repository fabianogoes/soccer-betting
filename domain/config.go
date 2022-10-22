package domain

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Configuration struct {
	Enviroment string
	Web        *WebConfig
}

type WebConfig struct {
	Addr string
}

func NewConfiguration() *Configuration {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Erroe loading envs: %v", err)
	}

	return &Configuration{
		Enviroment: os.Getenv("ENVIRONMENT"),
		Web:        &WebConfig{Addr: os.Getenv("SERVER_ADDRESS")},
	}
}
