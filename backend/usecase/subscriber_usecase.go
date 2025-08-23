package usecase

import (
	"api/models"
	"api/repository"
	"api/validates"
	"errors"
)

var (
	ErrInvalidEmail = errors.New("invalid email")
	ErrEmailExists  = errors.New("email already registered")
	ErrNotFound     = errors.New("email not found")
)

type SubscriberUseCase struct {
	repository repository.SubscriberRepository
}

func NewSubscriberUseCase(repo repository.SubscriberRepository) SubscriberUseCase {
	return SubscriberUseCase{repository: repo}
}

func (su *SubscriberUseCase) CreateSubscriber(subscriber models.Subscriber) (models.Subscriber, error) {

	subscriber.Email = validates.NormalizeEmail(subscriber.Email)
	if !validates.IsValidEmail(subscriber.Email) {
		return models.Subscriber{}, ErrInvalidEmail
	}

	id, err := su.repository.CreateSubscriber(subscriber)
	if err != nil {
		if validates.IsUniqueViolation(err) {
			return models.Subscriber{}, ErrEmailExists
		}
		return models.Subscriber{}, err
	}

	subscriber.ID = id

	return subscriber, nil
}

func (su *SubscriberUseCase) DeleteSubscriber(s models.Subscriber) error {
	email := validates.NormalizeEmail(s.Email)
	if !validates.IsValidEmail(email) {
		return ErrInvalidEmail
	}

	affected, err := su.repository.DeleteByEmail(email)
	if err != nil {
		return err
	}
	if affected == 0 {
		return ErrNotFound
	}
	return nil
}
