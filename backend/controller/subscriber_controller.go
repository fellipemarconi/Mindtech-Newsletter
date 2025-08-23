package controller

import (
	"api/models"
	"api/usecase"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
)

type SubscriberController struct {
	subscribeUseCase usecase.SubscriberUseCase
}

func NewSubscriberController(usecase usecase.SubscriberUseCase) SubscriberController {
	return SubscriberController{
		subscribeUseCase: usecase,
	}
}

func (sc *SubscriberController) CreateSubscriber(ctx *gin.Context) {

	var subscriber models.Subscriber
	if err := ctx.ShouldBindJSON(&subscriber); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	insertedSubscriber, err := sc.subscribeUseCase.CreateSubscriber(subscriber)
	if err != nil {
		switch {
		case errors.Is(err, usecase.ErrInvalidEmail):
			ctx.JSON(http.StatusBadRequest, gin.H{"error": usecase.ErrInvalidEmail.Error()})
		case errors.Is(err, usecase.ErrEmailExists):
			ctx.JSON(http.StatusConflict, gin.H{"error": usecase.ErrEmailExists.Error()})
		default:
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Unexpected error"})
		}
		return
	}

	ctx.JSON(http.StatusCreated, insertedSubscriber)
}

func (sc *SubscriberController) DeleteSubscriber(ctx *gin.Context) {
	var subscriber models.Subscriber
	if err := ctx.ShouldBindJSON(&subscriber); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	if err := sc.subscribeUseCase.DeleteSubscriber(subscriber); err != nil {
		switch {
		case errors.Is(err, usecase.ErrInvalidEmail):
			ctx.JSON(http.StatusBadRequest, gin.H{"error": usecase.ErrInvalidEmail.Error()})
		case errors.Is(err, usecase.ErrNotFound):
			ctx.JSON(http.StatusNotFound, gin.H{"error": usecase.ErrNotFound.Error()})
		default:
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Unexpected error"})
		}
		return
	}

	ctx.JSON(http.StatusNoContent, gin.H{"message": "unsubscribed successfully"})
}
