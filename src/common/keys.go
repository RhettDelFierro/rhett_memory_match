package common

import(
	"io/ioutil"
	"time"
	"github.com/dgrijalva/jwt-go"
	//"github.com/dgrijalva/jwt-go/request"
	//"fmt"
	"crypto/rsa"
	"log"
)

// AppClaims provides custom claim for JWT
type AppClaims struct {
	UserName string `json:"username"`
	Role     string `json:"role"`
	jwt.StandardClaims
}

// using asymmetric crypto/RSA keys
// location of private/public key files
const (
	// openssl genrsa -out app.rsa 1024
	privKeyPath = "src/keys/app.rsa"
	// openssl rsa -in app.rsa -pubout > app.rsa.pub
	pubKeyPath = "src/keys/app.rsa.pub"
)

var (
	verifyKey *rsa.PublicKey
	signKey   *rsa.PrivateKey
)

//call this also on start.
func InitKeys() {

	signBytes, err := ioutil.ReadFile(privKeyPath)
	if err != nil {
		log.Fatalf("[initKeys]: %s\n", err)
	}

	signKey, err = jwt.ParseRSAPrivateKeyFromPEM(signBytes)
	if err != nil {
		log.Fatalf("[initKeys]: %s\n", err)
	}

	verifyBytes, err := ioutil.ReadFile(pubKeyPath)
	if err != nil {
		log.Fatalf("[initKeys]: %s\n", err)
	}

	verifyKey, err = jwt.ParseRSAPublicKeyFromPEM(verifyBytes)
	if err != nil {
		log.Fatalf("[initKeys]: %s\n", err)
	}
}

//generating the token to
func GenerateToken(name, role string) (string, error) {

	claims := AppClaims{
		name,
		role,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Minute * 20).Unix(),
			Issuer:    "admin",
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodRS256, claims)

	signedTokenString, err := token.SignedString(signKey)
	if err != nil {
		return "", err
	}
	return signedTokenString, nil
}

//Validate the tokens on each route that needs them
//func AuthorizeToken(w http.ResponseWriter, req *http.Request, next http.HandlerFunc){
//
//	//this is thoriwng a 400 error and fields are getting to api/add empty.
//	//check := req.Body
//	//
//	//record := Record{}
//	//errorDecode := json.NewDecoder(check).Decode(&record)
//	//if errorDecode != nil {
//	//	fmt.Println(errorDecode)
//	//}
//
//	//checking the token from the request.
//	//make sure to put Authorization: Bearer <token info> in header on front end.
//	token, err := jwt.ParseFromRequest(req, func(token *jwt.Token) (interface{}, error){
//		return verifyKey, nil
//	})
//
//	if err != nil {
//		switch err.(type) {
//		//write the error during validation
//		case *jwt.ValidationError:
//			vErr := err.(*jwt.ValidationError)
//			//time from Claims expired.
//			switch vErr.Errors {
//			case jwt.ValidationErrorExpired:
//				w.WriteHeader(401)
//				w.Write([]byte("jwt has expired"))
//				return
//
//			default:
//				w.WriteHeader(500)
//				w.Write([]byte("error parsing access Token"))
//				return
//			}
//
//		default:
//			w.WriteHeader(500)
//			return
//		}
//	}
//	if token.Valid {
//		//check := token.Claims["UserInfo"].(map[string]interface{})["Name"]
//		//if check == record.User {
//		//	next(w, req)
//		//} else {
//		//	w.WriteHeader(401)
//		//	w.Write([]byte("You're not the same logged in user"))
//		//}
//
//		//call back on the HandlerFunc because this is a wrapping function on middleware.
//		//will use with negroni:
//		next(w, req)
//	} else {
//		w.WriteHeader(401)
//		w.Write([]byte("Invalid Access Token"))
//	}
//}

//wrap AuthorizeToken on every Update/Add/Delete CRUD method.