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
	"errors"
	"github.com/dgrijalva/jwt-go/request"
)

// AppClaims provides custom claim for JWT
type AppClaims struct {
	UserName string `json:"username"`
	Role     string `json:"role"`
	ID       int64         `json:"user_id"`
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

//generating the jwt for the cookie:
func GenerateCookieToken(name, role string, id int64) (http.Cookie, error) {

	expireToken := time.Now().Add(time.Minute * 30).Unix()
	//expireCookie := 25*60
	expireCookie := time.Now().Add(time.Minute * 30)

	claims := AppClaims{
		name,
		role,
		id,
		jwt.StandardClaims{
			ExpiresAt: expireToken,
			Issuer:    "admin",
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	signedToken, err := token.SignedString([]byte(AppConfig.Secret))

	return http.Cookie{Name: "Auth",
		Value: signedToken,
		HttpOnly: true,
		Expires: expireCookie,
		Path: "/"}, err
}

//generating the jwt for the CSRF:
func GenerateToken(name, role string, id int64) (signedTokenString string,err error) {

	claims := AppClaims{
		name,
		role,
		id,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Minute * 30).Unix(),
			Issuer:    "admin",
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodRS256, claims)

	signedTokenString, err = token.SignedString(signKey)

	return
}

//middleware to validate jwt:
func Validate(protectedPage http.HandlerFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		//cookie, err := r.Cookie("Auth")
		//if err != nil {
		//	DisplayAppError(w, err, "no Auth cookie found", 404)
		//	return
		//}
		//splitCookie := strings.Split(cookie.String(), "Auth=")

		splitCookie, err := PullCookie(r, "Auth")
		if err != nil {
			DisplayAppError(w, err, "no Auth cookie found", 404)
			return
		}

		// Parse, validate and return a token.
		cookieToken, err := cookieHandler(splitCookie)
		if err != nil {
			errorString,errorCode := jwtError(err)
			cookieErrorString := "[Cookie]: " + errorString
			DisplayAppError(w,err,cookieErrorString,errorCode)
			return
		}



		sessionToken, err := sessionTokenParse(r)
		if err != nil {
			errorString,errorCode := jwtError(err)
			sessionErrorString := "[SessionToken]: " + errorString
			DisplayAppError(w,err,sessionErrorString,errorCode)
			return
		}


		// Validate the token and save the token's claims to a context
		if claims, ok := cookieToken.Claims.(*AppClaims); ok && cookieToken.Valid &&sessionToken.Valid{
			context.Set(r, "Claims", claims)
			//go go to the protected controller:
			protectedPage(w, r)
		} else {
			DisplayAppError(w, err, "Invalid Access Token", 401,
			)
		}
	})
}

//pull the cookie from the request:
func PullCookie(r *http.Request,name string) ([]string,error){
	cookie, err := r.Cookie(name)
	splitString := name + "="
	return strings.Split(cookie.String(), splitString), err
}

//validates the jwt in the Cookie:
func cookieHandler(cookie []string) (token *jwt.Token,err error) {
	fmt.Println(cookie[1])

	token, err = jwt.ParseWithClaims(cookie[1], &AppClaims{},
		func(token *jwt.Token) (interface{}, error) {
			// Prevents a known exploit
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("Unexpected signing method %v", token.Header["alg"])
			}
			return []byte(AppConfig.Secret), nil
		})
	return
}

//takes the jwt from the client's session storage:
func sessionTokenParse(r *http.Request) (token *jwt.Token, err error){
	token, err = request.ParseFromRequestWithClaims(r, request.OAuth2Extractor, &AppClaims{}, func(token *jwt.Token) (interface{}, error) {
		// since we only use the one private key to sign the tokens,
		// we also only use its public counter part to verify
		return verifyKey, nil
	})

	return
}

func jwtError(err error) (errorString string, errorCode int) {
	switch err.(type) {

	case *jwt.ValidationError: // JWT validation error
		vErr := err.(*jwt.ValidationError)

		switch vErr.Errors {
		//JWT expired
		case jwt.ValidationErrorExpired:
			errorString = "Access Token is expired, get a new Token"
			errorCode = 401
			return

		default:
			errorString= "Error while parsing the Access Token!"
			errorCode = 500
			return
		}

	default:
		errorString = "Error while parsing Access Token!"
		errorCode = 500
		return
	}
}


//pulls the jwt sent from the sessions storage in the Authorization Header:
func TokenFromAuthHeader(r *http.Request) (string, error) {
	// Look for an Authorization header
	if ah := r.Header.Get("Authorization"); ah != "" {
		// Should be a bearer token
		if len(ah) > 6 && strings.ToUpper(ah[0:6]) == "BEARER" {
			return ah[7:], nil
		}
	}
	return "", errors.New("No token in the HTTP request")
}
