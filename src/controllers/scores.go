package controllers

import (
	"net/http"
	"encoding/json"
	"github.com/RhettDelFierro/rhett_memory_match/src/common"
	"github.com/RhettDelFierro/rhett_memory_match/src/data"
	"github.com/gorilla/mux"
	reqcontext "github.com/gorilla/context"
	"fmt"
)

func Scores(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)
	game_mode := vars["mode"]

	var score ScoreResource

	if r.Method == "POST" {
		err := json.NewDecoder(r.Body).Decode(&score)
		if err != nil {
			common.DisplayAppError(w, err, "Invalid Score data", 500)
			return
		}
	}

	scoreData := score.Data

	context := NewContext();
	//getting the username and id from gorilla/context request context:
	//claims := reqcontext.Get(r, "Claims").(*common.AppClaims)
	//fmt.Println(claims.UserName)
	//context.User = claims.UserName
	//context.ID = claims.ID
	//defer context.Close()

	round_id, err := context.DbModeTable(game_mode)
	if err != nil {
		common.DisplayAppError(w, err, "Unexpected error in Scores DB", 500)
		return
	}
	scoreData.Round_ID = round_id
	query := "INSERT INTO scores(round_id,score,user_id) VALUES(?,?,?)"
	stmt, err := context.Prepare(query)
	defer stmt.Close()
	if err != nil {
		common.DisplayAppError(w, err, "Unexpected error in Scores DB", 500)
		return
	}
	repo := &data.ScoresRepository{S: stmt}
	_, err = repo.InsertScore(&scoreData)

	if err != nil {
		common.DisplayAppError(w, err, "Unexpected error in Scores DB", 500)
		return
	}
	reqcontext.Clear(r)
	w.WriteHeader(http.StatusNoContent)
}