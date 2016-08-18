package data

import (
	"golang.org/x/crypto/bcrypt"

	"github.com/RhettDelFierro/rhett_memory_match/src/models"
	_ "github.com/go-sql-driver/mysql"
	"database/sql"
	"log"
)

type UserRepository struct {
	R *sql.Row
	S *sql.Stmt
}

func (r *UserRepository) CreateUser(user *models.User) (int64, error) {

	hpass := cleanPassword(user.Password)
	user.HashPassword = hpass
	//clear the incoming text password
	user.Password = ""


	//we have the rows object in r.R
	//now insert:
	result, err := r.S.Exec(user.Username, user.Email, user.HashPassword)
	if err != nil {
		log.Fatal(err)
	}
	user_id, err := result.LastInsertId()
	return user_id, err
}

func cleanPassword(password string) []byte {
	hpass, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		panic(err)
	}

	return hpass
}

//func (r *UserRepository) Login(user models.User) (u models.User, err error) {
//
//	err = r.C.Find(bson.M{"email": user.Email}).One(&u)
//	if err != nil {
//		return
//	}
//	// Validate password
//	err = bcrypt.CompareHashAndPassword(u.HashPassword, []byte(user.Password))
//	if err != nil {
//		u = models.User{}
//	}
//	return
//}
