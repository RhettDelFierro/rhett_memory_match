package routers

import (
	"github.com/gorilla/mux"
	"github.com/RhettDelFierro/rhett_memory_match/src/controllers"
	"github.com/RhettDelFierro/rhett_memory_match/src/common"
)

func Router() *mux.Router {

	router := mux.NewRouter().StrictSlash(true)

	router.HandleFunc("/users/register", controllers.RegisterUser)
	//router.HandleFunc("/users/login", common.Validate(controllers.LoginUser))
	router.HandleFunc("/users/login", controllers.LoginUser)
	router.HandleFunc("/scores/{mode}", common.Validate(controllers.Scores))
	router.HandleFunc("/users/logout", controllers.LogOut)

	//spotify
	router.HandleFunc("/authLogin", controllers.SpotifyAuthorization)
	router.HandleFunc("/callback", controllers.SpotifyCallback)
	router.HandleFunc("/getKeys", common.ValidateSpotifyUser(controllers.SpotifyGetKeys))
	return router
}