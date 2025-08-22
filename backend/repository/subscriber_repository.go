package repository

import (
	"api/models"
	"database/sql"
)

type SubscriberRepository struct {
	connection *sql.DB
}

func NewSubscriberRepository(connection *sql.DB) SubscriberRepository {
	return SubscriberRepository{
		connection: connection,
	}
}

func (sr *SubscriberRepository) CreateSubscriber(subscriber models.Subscriber) (int, error) {

	var id int

	err := sr.connection.
		QueryRow(`INSERT INTO subscribers (email) VALUES ($1) RETURNING id`, subscriber.Email).
		Scan(&id)
	if err != nil {
		return 0, err
	}

	return id, nil
}
