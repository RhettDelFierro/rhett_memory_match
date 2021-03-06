package data

import (
	"golang.org/x/crypto/bcrypt"

	"github.com/RhettDelFierro/rhett_memory_match/src/models"

	_ "github.com/go-sql-driver/mysql"
	"database/sql"
	"fmt"
)

type UserRepository struct {
	R *sql.Row
	S *sql.Stmt
}

func (r *UserRepository) CreateSpotifyUser(user *models.SpotifyAuthedUserProfile) (error) {

	_, err := r.S.Exec(user.ID, user.Display_name, user.Email)

	if err != nil {
		return err
	}
	return nil
}

func (r *UserRepository) InsertPassword(user *models.User)  error {
	user.HashPassword = cleanPassword(user.Password)

	_,err := r.S.Exec(user.User_ID,user.HashPassword)

	if err != nil {
		fmt.Println(err)
		return err
	}

	user.HashPassword = nil
	user.Password = ""

	return err
}


func (r *UserRepository) CreateUser(user *models.User) (user_id int64, err error) {
	//now insert:
	result, err := r.S.Exec(user.Username, user.Email)
	if err != nil {
		return
	}
	user_id, err = result.LastInsertId()
	return
}

func cleanPassword(password string) []byte {
	hpass, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		panic(err)
	}

	return hpass
}

func (r *UserRepository) Login(user models.User) (u models.User, err error) {
	u.Email = user.Email
	u.Username = user.Username
	err = r.S.QueryRow(user.Email).Scan(&u.HashPassword,&u.User_ID)
	if err != nil {
		return
	}
	// Validate password
	err = bcrypt.CompareHashAndPassword(u.HashPassword, []byte(user.Password))
	if err != nil {
		u = models.User{}
	} else {
		u.Password = ""
		u.HashPassword = nil
	}
	return
}