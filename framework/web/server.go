package web

import (
	"net/http"
	"time"
	"world-cup/domain"
	"world-cup/framework/logging"

	"github.com/gin-gonic/gin"
)

type Router interface {
	Routes(router *gin.Engine)
}

func SetupHTTPServer(routers ...Router) *http.Server {
	// Setup Logger
	config := domain.NewConfiguration()
	logger := logging.NewLogger()

	r := gin.Default()

	for _, handler := range routers {
		handler.Routes(r)
	}

	logger.Infof("Web server running with configuration %v", config)
	return &http.Server{
		Addr:         config.Web.Addr,
		Handler:      r,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
	}
}
