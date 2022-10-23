package main

import (
	"log"
	"world-cup/controllers"
	"world-cup/initializers"
)

func main() {
	// ctx := context.Background()

	log.Println("Setup Application...")
	config, _ := initializers.LoadConfig(".")

	// Setup Database: Postgres
	initializers.SetupPostgres(&config)

	// Setup Web Api
	srv := initializers.SetupHTTPServer(
		&config,
		controllers.NewHealthApiHandler(),
		controllers.NewUserApiHandler(),
	)

	if err := srv.ListenAndServe(); err != nil {
		log.Fatalf("Error something went wrong starting http server: %s", err)
	}

}
