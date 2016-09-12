package controllers

import (
	"net/http"
	"encoding/json"
	"github.com/RhettDelFierro/rhett_memory_match/src/common"
	"github.com/RhettDelFierro/rhett_memory_match/src/data"
	"github.com/gorilla/mux"
	reqcontext "github.com/gorilla/context"
)

func(env *Env) Scores(w http.ResponseWriter, r *http.Request) {

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

	//getting the username and id from gorilla/context request context:
	if id,ok  := reqcontext.GetOk(r, "ID"); ok{
		scoreData.User_ID = id.(int64)
	}

	query := "SELECT round_id FROM rounds WHERE mode_name=?"
	round_id, err := env.Db.Search(query,game_mode)
	round_id = round_id.(int64)
	if err != nil {
		common.DisplayAppError(w, err, "Unexpected error in Scores DB", 500)
		return
	}
	scoreData.Round_ID = round_id


	//scoreData.Date_Complete = timeStamp
	query = "INSERT INTO scores(round_id,score,user_id) VALUES(?,?,?)"
	stmt, err := env.Db.PrepareQuery(query)
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