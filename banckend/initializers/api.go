package initializers

import (
	"log"
	"soccer-betting/api/controller"
	"soccer-betting/domain/usecases"
)

func SetupApi(
	config *Config,
	userUseCase *usecases.UserUseCase,
	teamUseCase *usecases.TeamUseCase,
	matchUseCase *usecases.MatchUseCase,
) {
	// Setup Web Api
	log.Println("Setup Web API...")
	srv := SetupHTTPServer(
		config,
		controller.NewHealthApiHandler(),
		controller.NewUserApiHandler(userUseCase),
		controller.NewTeamApiHandler(teamUseCase),
		controller.NewMatchApiHandler(matchUseCase),
	)

	if err := srv.ListenAndServe(); err != nil {
		log.Fatalf("Error something went wrong starting http server: %s", err)
	}
}
