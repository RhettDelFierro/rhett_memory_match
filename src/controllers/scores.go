package controllers

import (
	"net/http"
	//"fmt"
	//"encoding/json"
	//"github.com/RhettDelFierro/rhett_memory_match/src/common"
	//"github.com/RhettDelFierro/rhett_memory_match/src/data"
	//"log"
	//"database/sql"
	//"time"
	//"github.com/gorilla/mux"
)

func Scores(w http.ResponseWriter, r *http.Request) {

	//vars := mux.Vars(r)
	//game_mode := vars["mode"]
	//
	//var score ScoreResource
	//var token string
	//
	//if r.Method == "POST" {
	//	err := json.NewDecoder(r.Body).Decode(&score)
	//	if err != nil {
	//		common.DisplayAppError(w, err, "Invalid User data", 500)
	//		return
	//	}
	//}
	//
	//user := score.Data
	//
	//context := NewContext();
	////defer context.Close()
	//
	//match, err := context.DbUserTable(user.Username, user.Email)
	//
	////DB error
	//if err != nil && err != sql.ErrNoRows {
	//	fmt.Println(err)
	//	fmt.Println("error in registering student")
	//	return
	//}
	//
	////entry is not duplicate:
	//if err == sql.ErrNoRows {
	//	stmt, err := context.PrepareRegisterUser()
	//	defer stmt.Close()
	//	if err != nil {
	//		fmt.Println("error context.PrepareRegisterStudent()")
	//		log.Fatal(err)
	//	}
	//
	//	//Store then Execute Prepare statement and update DB.
	//	repo := &data.UserRepository{S: stmt}
	//	user_id, err := repo.CreateUser(user)
	//	if err != nil {
	//		fmt.Println("error context.CreateUser")
	//		log.Fatal(err)
	//	}
	//	user.User_ID = user_id
	//	user.HashPassword = nil
	//} else {
	//	//write that it's a duplicate. Do not add to db.
	//	fmt.Println("this already exists:", match)
	//	return
	//}
	//
	////double checking the password the user entered is not sent:
	//user.Password = ""
	//
	////now generate the jwt token
	//token, err = common.GenerateToken(user.Username, "user")
	//if err != nil {
	//	fmt.Println("error in controllers.RegisterUser > common.GenerateToken")
	//	return
	//}
	////set jwt to Cookie:
	//cookie := http.Cookie{
	//	Name: "Auth",
	//	Value: token,
	//	Expires: time.Now().Add(time.Minute * 20),
	//	HttpOnly: true,
	//}
	//
	////set the responseUser data:
	//responseUser := RegisterAuthUserModel{User: user}
	//
	//if j, err := json.Marshal(RegisterAuthUserResource{Data: responseUser}); err != nil {
	//	fmt.Println("error in controllers.RegisterUser json.Marshal")
	//	return
	//} else {
	//	http.SetCookie(w, &cookie)
	//	w.Header().Set("Content-Type", "application/json")
	//	w.WriteHeader(http.StatusOK)
	//	w.Write(j)
	//}
}
