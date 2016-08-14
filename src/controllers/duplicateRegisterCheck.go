package controllers

import (
	"net/http"
	"github.com/RhettDelFierro/GolangPHP/src/controllers/util"
	"encoding/json"
	"github.com/RhettDelFierro/GolangPHP/src/models"
	"fmt"
)

type DuplicateResource struct {
	Data DuplicateModel     `json:"data"`
}

type DuplicateModel struct {
	Username string `json:"username"`
}

type Duplicate struct {
	User  string `json:"username"`
	Taken bool                `json:"taken"`
}

//type DuplicateUserInfo struct {
//	Data Duplicate        `json:"data"`
//}

func DuplicateNewUserCheck(w http.ResponseWriter, req *http.Request) {
	responseWriter := util.GetResponseWriter(w, req)
	defer responseWriter.Close()

	var duplicate DuplicateResource

	if req.Method == "POST" {
		err := json.NewDecoder(req.Body).Decode(&duplicate)
		if err != nil {
			//422 for json error?
			fmt.Println(err)
			fmt.Println("1st error in DuplicateUserCheck: json.Decode")
			w.WriteHeader(422)
			return
		}
		duplicateCheck := duplicate.Data
		duplicateUser := models.UserInfo{
			UserName: duplicateCheck.Username,
		}
		if err := models.DuplicateUser(duplicateUser); err != nil {
			if (err.Error() == "not found"){
				dupUser := Duplicate{
					User: duplicateUser.UserName,
					Taken: false,
				}

				j, err := json.Marshal(dupUser)
				if err != nil {
					w.WriteHeader(500)
					w.Write([]byte("An unexpected error has occured. Json not wrote."))
					return
				} else {
					w.WriteHeader(200)
					w.Write(j)
				}
			} else {
				fmt.Println("Error after DB check")
				w.WriteHeader(401)
				return
			}
		} else {
			//check if user is a duplicate, generate write to response:
			dupUser := Duplicate{
				User: duplicateUser.UserName,
				Taken: true,
			}
			j, err := json.Marshal(dupUser)
			if err != nil {
				w.WriteHeader(500)
				w.Write([]byte("An unexpected error has occured. Json not wrote."))
				return
			} else {
				w.WriteHeader(200)
				w.Write(j)
			}
		}

	}
}