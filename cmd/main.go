package main

import (
	"log"
	"world-cup/api"
	"world-cup/domain/usecases"
	"world-cup/initializers"
)

func main() {
	// ctx := context.Background()

	log.Println("Load Configurations...")
	config, _ := initializers.LoadConfig(".")

	// Setup Database: Postgres
	log.Println("Setup Postgress...")
	initializers.SetupPostgres(&config)

	// Dependency Injection
	userUseCase := usecases.NewUserUseCase(initializers.DB)
	teamUseCase := usecases.NewTeamUseCase(initializers.DB)
	matchUseCase := usecases.NewMatchUseCase(initializers.DB)

	// Setup Web Api
	log.Println("Setup Web API...")
	srv := initializers.SetupHTTPServer(
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
