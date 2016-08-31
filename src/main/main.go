package main

import (
	_ "github.com/go-sql-driver/mysql"
	"net/http"
	"github.com/RhettDelFierro/rhett_memory_match/src/routers"
	"github.com/RhettDelFierro/rhett_memory_match/src/common"
	"github.com/rs/cors"
)

// Reads config.json and decode into AppConfig

//Entry point of the program
func main() {
	common.InitAll()
	//move this to portable DBConfig (proably in dbAbstraction.go

	router := routers.Router()
	handler := cors.Default().Handler(router)
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:8080", "*"},
		AllowCredentials: true,
		AllowedHeaders: []string{"Authorization","Content-Type", "Cookie"},
	})

	// Insert the middleware
	handler = c.Handler(handler)
	http.ListenAndServe(":8000", handler)
}