package main

import (
	"api/controller"
	"api/db"
	"api/repository"
	"api/usecase"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// Conexão com o banco de dados
	dbConnection, err := db.ConnectDB()
	if err != nil {
		panic(err)
	}

	// Criação da tabela de subscribers se não existir
	_, err = dbConnection.Exec(`
		CREATE TABLE IF NOT EXISTS subscribers 
		(id SERIAL PRIMARY KEY,
		email TEXT NOT NULL UNIQUE,
		created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())
	`,
	)
	if err != nil {
		panic(err)
	}

	// Camada de Repositórios
	productRepository := repository.NewSubscriberRepository(dbConnection)
	// Camada de UseCases
	subscriberUseCase := usecase.NewSubscriberUseCase(productRepository)
	// Camada de Controllers
	subscriberController := controller.NewSubscriberController(subscriberUseCase)

	// Rotas
	router.GET("/", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{"message": "Welcome to the Mindtech Newsletter API"})
	})
	router.POST("/", subscriberController.CreateSubscriber)

	router.Run()
}
