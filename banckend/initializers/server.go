package initializers

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

	r.Use(corsMiddleware())

	for _, handler := range routers {
		handler.Routes(r)
	}

	logger.Infof("Web server running with environment: ", config.Enviroment)
	return &http.Server{
		Addr:         config.ServerPort,
		Handler:      r,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
	}
}

func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
