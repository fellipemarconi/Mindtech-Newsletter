package models

type Subscriber struct {
	ID    int    `json:"id_email"`
	Email string `json:"email"`
}
