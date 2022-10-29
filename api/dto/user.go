package dto

import "world-cup/domain/models"

type UserRequest struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

type UserResponse struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
	Token string `json:"token"`
}

func ToListOfUserResponse(users []models.User) []UserResponse {
	var result []UserResponse

	for _, user := range users {
		r := UserResponse{ID: user.ID, Name: user.Name, Email: user.Email, Token: user.Token}
		result = append(result, r)
	}

	return result
}

func ToUserResponse(user models.User) UserResponse {
	return UserResponse{ID: user.ID, Name: user.Name, Email: user.Email, Token: user.Token}
}
