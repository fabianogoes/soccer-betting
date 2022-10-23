package models

import (
	"log"

	uuid "github.com/satori/go.uuid"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID       string `gorm:"size:100;primaryKey"`
	Name     string `gorm:"size:100"`
	Email    string `gorm:"size:100;index:idx_email;unique"`
	Password string
	Token    string
}

func (user *User) Prepare() error {
	encryptedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		log.Fatalf("Error on bcryot generate password")
		return err
	}

	user.Password = string(encryptedPassword)
	user.Token = uuid.NewV4().String()

	err = user.validate()
	if err != nil {
		log.Fatalf("Error on user validate")
		return err
	}

	return nil
}

func (user *User) validate() error {
	// TODO implementation
	return nil
}
