package data

import (
	"golang.org/x/crypto/bcrypt"

	"github.com/RhettDelFierro/rhett_memory_match/src/models"
	_ "github.com/go-sql-driver/mysql"
	"database/sql"
)

type UserRepository struct {
	R *sql.Row
	S *sql.Stmt
}

func (r *UserRepository) CreateUser(user *models.User) (user_id int64, err error) {

	//we have the rows object in r.R
	//now insert:
	result, err := r.S.Exec(user.Username, user.Email, user.HashPassword)
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

	err = r.S.QueryRow(user.Email).Scan(&u.User_ID,&u.Username,&u.Email, &u.HashPassword)
	if err != nil {
		return
	}
	// Validate password
	err = bcrypt.CompareHashAndPassword(u.HashPassword, []byte(user.Password))
	if err != nil {
		u = models.User{}
	} else {
		u.HashPassword = nil
	}
	return
}