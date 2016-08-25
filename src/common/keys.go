package common

import (
	"io/ioutil"
	"time"
	"github.com/dgrijalva/jwt-go"
	"crypto/rsa"
	"log"
	"net/http"
	"strings"
	"fmt"
	"github.com/gorilla/context"
)

// AppClaims provides custom claim for JWT
type AppClaims struct {
	UserName string `json:"username"`
	Role     string `json:"role"`
	ID	 int64 	 `json:"user_id"`
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
func initKeys() {

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

//generating the jwt:
func GenerateToken(name, role string, id int64) (string, error) {

	claims := AppClaims{
		name,
		role,
		id,
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

//middleware to validate jwt:
func Validate(protectedPage http.HandlerFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		fmt.Println("in validate")
		fmt.Println(r)
		// If no Auth cookie is set then return a 404 not found
		cookie, err := r.Cookie("Auth")
		if err != nil {
			http.NotFound(w, r)
			return
		}
		// The token is concatenated with its key Auth=token
		// We remove the Auth= part by splitting the cookie in two
		splitCookie := strings.Split(cookie.String(), "Auth=")

		// Parse, validate and return a token.
		token, err := jwt.ParseWithClaims(splitCookie[1], &AppClaims{},
			func(token *jwt.Token) (interface{}, error) {

				// Prevents a known exploit
				if _, ok := token.Method.(*jwt.SigningMethodRSA); !ok {
					return nil, fmt.Errorf("Unexpected signing method %v", token.Header["alg"])
				}
				return verifyKey, nil
			})

		if err != nil {
			switch err.(type) {

			case *jwt.ValidationError: // JWT validation error
				vErr := err.(*jwt.ValidationError)

				switch vErr.Errors {
				//JWT expired
				case jwt.ValidationErrorExpired:
					DisplayAppError(w, err, "Access Token is expired, get a new Token", 401)
					return

				default:
					DisplayAppError(w, err, "Error while parsing the Access Token!", 500)
					return
				}

			default:
				DisplayAppError(w, err, "Error while parsing Access Token!", 500)
				return
			}

		}

		// Validate the token and save the token's claims to a context
		if claims, ok := token.Claims.(*AppClaims); ok && token.Valid {
			context.Set(r, "Claims", claims)
		} else {
			DisplayAppError(w, err, "Invalid Access Token", 401,
			)
		}

		// If everything is valid then call the original protected handler
		protectedPage(w, r)
	})
}