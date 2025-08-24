package main

import (
	"api/controller"
	"api/db"
	"api/repository"
	"api/usecase"
	"path/filepath"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	dbConnection, err := db.ConnectDB()
	if err != nil {
		panic(err)
	}

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
	
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: false,
		MaxAge:           12 * time.Hour,
	  }))
	  
	  const publicDir = "/app/public"

	  router.Static("/assets", filepath.Join(publicDir, "assets"))
	  
	  router.GET("/", func(c *gin.Context) {
		c.File(filepath.Join(publicDir, "index.html"))
	  })
	  
	  router.GET("/success", func(c *gin.Context) {
		c.File(filepath.Join(publicDir, "index.html"))
	  })
	  
	  router.NoRoute(func(c *gin.Context) {
		if c.Request.Method == "GET" {
		  c.File(filepath.Join(publicDir, "index.html"))
		  return
		}
		c.JSON(404, gin.H{"error": "not found"})
	  })
	  
	  router.POST("/", subscriberController.CreateSubscriber)
	  router.DELETE("/", subscriberController.DeleteSubscriber)
	  
	  router.Run()
}
