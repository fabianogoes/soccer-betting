package main

import (
	"log"
	"soccer-betting/domain/usecases"
	"soccer-betting/initializers"
)

func init() {
	log.Println("Init Configurations...")

	config, _ := initializers.LoadConfig(".")

	initializers.SetupPostgres(&config)

	logger := initializers.SetupLogger(&config)

	// Dependency Injection UseCases
	initializers.SetupApi(
		&config,
		usecases.NewUserUseCase(initializers.DB),
		usecases.NewTeamUseCase(initializers.DB),
		usecases.NewMatchUseCase(initializers.DB, logger),
	)
}

func main() {
	// ctx := context.Background() // TODO use when it be require

	log.Println("It's Running...")
}
