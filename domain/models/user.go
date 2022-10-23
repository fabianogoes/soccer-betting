package models

import (
	"log"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	BaseModel
	Name     string `gorm:"type:varchar(255);not null"`
	Email    string `gorm:"type:varchar(255);uniqueIndex;not null"`
	Password string
	Token    string
}

func NewUser(name string, email string, password string) *User {
	user := &User{Name: name, Email: email, Password: password}
	user.SetID(uuid.New())
	user.Prepare()
	return user
}

func (user *User) Prepare() error {
	encryptedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		log.Fatalf("Error on bcryot generate password")
		return err
	}

	user.Password = string(encryptedPassword)
	user.Token = uuid.New().String()

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
