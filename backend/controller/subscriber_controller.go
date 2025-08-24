package controller

import (
	"api/models"
	"api/security"
	"api/usecase"
	"api/validates"
	"errors"
	"net/http"
	"net/mail"
	"strings"

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
        ctx.JSON(http.StatusBadRequest, gin.H{"message": "invalid JSON body"})
        return
    }

    email := strings.TrimSpace(subscriber.Email)
    if email == "" {
        ctx.JSON(http.StatusBadRequest, gin.H{"message": "email is required"})
        return
    }

    emailNorm := strings.ToLower(email)
    if _, err := mail.ParseAddress(emailNorm); err != nil {
        ctx.JSON(http.StatusBadRequest, usecase.ErrInvalidEmail.Error())
        return
    }

    subscriber.Email = emailNorm

    insertedSubscriber, err := sc.subscribeUseCase.CreateSubscriber(subscriber)
    if err != nil {
        switch {
        case errors.Is(err, usecase.ErrEmailExists):
            ctx.JSON(http.StatusConflict, usecase.ErrEmailExists.Error())
            return
        case errors.Is(err, usecase.ErrInvalidEmail):
            ctx.JSON(http.StatusBadRequest, usecase.ErrInvalidEmail.Error())
            return
        default:
            ctx.JSON(http.StatusInternalServerError, gin.H{"message": "could not create subscriber"})
            return
        }
    }

    emailNorm = strings.ToLower(insertedSubscriber.Email)
    sig := security.SignEmail(emailNorm)

    ctx.JSON(http.StatusCreated, gin.H{
        "message": "subscribed successfully",
        "email":   emailNorm,
        "sig":     sig,
    })
}

func (sc *SubscriberController) DeleteSubscriber(ctx *gin.Context) {
    email := ctx.Query("email")
    sig := ctx.Query("sig")

    if email == "" || sig == "" {
        ctx.JSON(http.StatusUnauthorized, gin.H{"error": "invalid signature"})
        return
    }

    emailNorm := validates.NormalizeEmail(email)
    if !security.CheckEmailSignature(emailNorm, sig) {
        ctx.JSON(http.StatusUnauthorized, gin.H{"error": "invalid signature"})
        return
    }

    sub := models.Subscriber{Email: emailNorm}

    if err := sc.subscribeUseCase.DeleteSubscriber(sub); err != nil {
        switch {
        case errors.Is(err, usecase.ErrNotFound):
            ctx.JSON(http.StatusNotFound, gin.H{"error": usecase.ErrNotFound.Error()})
        default:
            ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Unexpected error"})
        }
        return
    }

    ctx.Status(http.StatusNoContent)
}
