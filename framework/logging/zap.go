package logging

import (
	defaultLog "log"
	"world-cup/domain"

	"os"
	"strings"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

func NewLogger() *zap.SugaredLogger {
	log, err := newLogger(domain.NewConfiguration().Enviroment)
	if err != nil {
		defaultLog.Fatalf("failure to initialize logger: %v", err)
	}

	_ = zap.ReplaceGlobals(log)

	return log.Sugar()
}

func newLogger(environment string) (*zap.Logger, error) {
	var config zap.Config
	if environment == "development" {
		config = zap.NewDevelopmentConfig()
	} else {
		config = zap.NewProductionConfig()
	}

	config.EncoderConfig.EncodeTime = zapcore.ISO8601TimeEncoder

	if lvl, exists := os.LookupEnv("LOG_LEVEL"); exists {
		lvl = strings.ToLower(lvl)
		switch lvl {
		case "debug":
			config.Level = zap.NewAtomicLevelAt(zapcore.DebugLevel)
		case "info":
			config.Level = zap.NewAtomicLevelAt(zapcore.InfoLevel)
		case "warn":
			config.Level = zap.NewAtomicLevelAt(zapcore.WarnLevel)
		case "error":
			config.Level = zap.NewAtomicLevelAt(zapcore.ErrorLevel)
		case "panic":
			config.Level = zap.NewAtomicLevelAt(zapcore.PanicLevel)
		case "fatal":
			config.Level = zap.NewAtomicLevelAt(zapcore.FatalLevel)
		}
	}

	return config.Build()
}
