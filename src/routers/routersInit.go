package routers

import (
"github.com/gorilla/mux"
"github.com/RhettDelFierro/rhett_memory_match/src/controllers"
"github.com/RhettDelFierro/rhett_memory_match/src/common"

)

func Router(env *controllers.Env) *mux.Router {

	router := mux.NewRouter().StrictSlash(true)

	router.HandleFunc("/users/register", env.RegisterUser)
	router.HandleFunc("/users/login", env.LoginUser)
	router.HandleFunc("/scores/{mode}", common.Validate(env.Scores))
	router.HandleFunc("/users/logout", controllers.LogOut)

	//spotify
	router.HandleFunc("/authLogin", controllers.SpotifyAuthorization)
	router.HandleFunc("/callback", env.SpotifyCallback)
	router.HandleFunc("/getKeys", common.ValidateSpotifyUser(env.SpotifyGetKeys))
	router.HandleFunc("/spotifyscores/{mode}", common.ValidateSpotifyUser(env.Scores))
	return router
}