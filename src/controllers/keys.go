package controllers

import(
	"io/ioutil"
	"net/http"
	"time"
	"github.com/dgrijalva/jwt-go"
	"fmt"
	//"encoding/json"
	//"encoding/json"
)

const (
	privKey = "src/keys/app.rsa"
	pubKey = "src/keys/app.rsa.pub"
)

var (
	verifyKey, signKey []byte
)

type Record struct {
	User string	`json:"user"`
}

func initKeys(){
	var err error

	signKey, err = ioutil.ReadFile(privKey)
	if err != nil {
		fmt.Println("privKey not reading")
		panic(err)
	}

	verifyKey, err = ioutil.ReadFile(pubKey)
	if err != nil {
		fmt.Println("pubKey not reading")
		panic(err)
	}
}

//generating the token to
func GenerateToken(name, role string) (string, error) {
	initKeys()
	t := jwt.New(jwt.GetSigningMethod("RS256"))


	//Setting the claims. This info will be used through the app.
	t.Claims["iss"] = "admin"
	t.Claims["UserInfo"] = struct {
		Name string
		Role string
	}{name, role}

	t.Claims["exp"] = time.Now().Add(time.Minute * 15).Unix()
	tokenString, err := t.SignedString(signKey)
	if err != nil {
		fmt.Println("the error inside  GenerateToken")
		return "", err
	}

	return tokenString, nil
}

//Validate the tokens on each route that needs them
func AuthorizeToken(w http.ResponseWriter, req *http.Request, next http.HandlerFunc){

	//this is thoriwng a 400 error and fields are getting to api/add empty.
	//check := req.Body
	//
	//record := Record{}
	//errorDecode := json.NewDecoder(check).Decode(&record)
	//if errorDecode != nil {
	//	fmt.Println(errorDecode)
	//}

	//checking the token from the request.
	//make sure to put Authorization: Bearer <token info> in header on front end.
	token, err := jwt.ParseFromRequest(req, func(token *jwt.Token) (interface{}, error){
		return verifyKey, nil
	})

	if err != nil {
		switch err.(type) {
		//write the error during validation
		case *jwt.ValidationError:
			vErr := err.(*jwt.ValidationError)
			//time from Claims expired.
			switch vErr.Errors {
			case jwt.ValidationErrorExpired:
				w.WriteHeader(401)
				w.Write([]byte("jwt has expired"))
				return

			default:
				w.WriteHeader(500)
				w.Write([]byte("error parsing access Token"))
				return
			}

		default:
			w.WriteHeader(500)
			return
		}
	}
	if token.Valid {
		//check := token.Claims["UserInfo"].(map[string]interface{})["Name"]
		//if check == record.User {
		//	next(w, req)
		//} else {
		//	w.WriteHeader(401)
		//	w.Write([]byte("You're not the same logged in user"))
		//}

		//call back on the HandlerFunc because this is a wrapping function on middleware.
		//will use with negroni:
		next(w, req)
	} else {
		w.WriteHeader(401)
		w.Write([]byte("Invalid Access Token"))
	}
}

//wrap AuthorizeToken on every Update/Add/Delete CRUD method.