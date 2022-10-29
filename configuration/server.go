package configuration

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type Router interface {
	Routes(router *gin.Engine)
}

func SetupHTTPServer(config *Config, routers ...Router) *http.Server {
	// Setup Logger
	logger := SetupLogger(config)

	gin.ForceConsoleColor()
	r := gin.Default()

	for _, handler := range routers {
		handler.Routes(r)
	}

	logger.Infof("Web server running with configuration %v", config)
	return &http.Server{
		Addr:         config.ServerPort,
		Handler:      r,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
	}
}
