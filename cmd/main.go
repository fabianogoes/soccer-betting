package main

import (
	"log"
	"world-cup/framework/web"
)

func main() {
	// ctx := context.Background()

	log.Println("Setup Application...")

	// Setup Web Api
	router := web.NewApiHandler()
	srv := web.SetupHTTPServer(router)
	if err := srv.ListenAndServe(); err != nil {
		log.Fatalf("Error something went wrong starting http server: %s", err)
	}

}
