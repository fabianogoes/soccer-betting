package main

import (
	"log"
	"world-cup/api"
	"world-cup/configuration"
	"world-cup/domain/usecases"
)

func main() {
	// ctx := context.Background()

	log.Println("Load Configurations...")
	config, _ := configuration.LoadConfig(".")

	// Setup Database: Postgres
	log.Println("Setup Postgress...")
	configuration.SetupPostgres(&config)

	// Dependency Injection
	userUseCase := usecases.NewUserUseCase(configuration.DB)
	teamUseCase := usecases.NewTeamUseCase(configuration.DB)
	matchUseCase := usecases.NewMatchUseCase(configuration.DB)

	// Setup Web Api
	log.Println("Setup Web API...")
	srv := configuration.SetupHTTPServer(
		&config,
		api.NewHealthApiHandler(),
		api.NewUserApiHandler(userUseCase),
		api.NewTeamApiHandler(teamUseCase),
		api.NewMatchApiHandler(matchUseCase),
	)

	if err := srv.ListenAndServe(); err != nil {
		log.Fatalf("Error something went wrong starting http server: %s", err)
	}

}
