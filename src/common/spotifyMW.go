package common

import (
	"net/http"
	"time"
	"github.com/dgrijalva/jwt-go"
	"os"
	"github.com/gorilla/context"
	"golang.org/x/oauth2"
	"fmt"
	"crypto/aes"
	"encoding/base64"
	"crypto/cipher"
	"crypto/rand"
	"io"
	"github.com/RhettDelFierro/rhett_memory_match/src/models"
	"github.com/dgrijalva/jwt-go/request"
)

type EncryptToken struct {
	Key string
	Token *oauth2.Token
}

type SpotifyAppClaims struct {
	Key      string `json:"key"`
	UserName string `json:"username"`
	Role     string `json:"role"`
	jwt.StandardClaims
}

//will be to verify server-client is trusted:
func(e EncryptToken) GenerateSpotifyCookieToken(username string) (http.Cookie, error) {

	expireToken := time.Now().Add(time.Minute * 30).Unix()

	key := []byte(os.Getenv("SPOTIFY_OAUTH_KEY_COOKIE"))
	encryptedKey,err := encrypt(key,e.Key)
	if err != nil {
		return http.Cookie{}, err
	}

	claims := SpotifyAppClaims{
		Key: encryptedKey,
		UserName: username,
		Role: "Spotify user",
		jwt.StandardClaims{
			ExpiresAt: expireToken,
			Issuer:    "admin",
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	signedToken, err := token.SignedString([]byte(os.Getenv("SPOTIFY_COOKIE_CLIENT")))

	//now encrypt the claims:


	return http.Cookie{
		Name: "Auth_Spotify",
		Value: signedToken,
		HttpOnly: true,
		MaxAge: 30 * 60,
	}, err
}

func(e EncryptToken) GenerateSpotifyTokenStorage(username string) (signedToken string, err error) {

	expireToken := time.Now().Add(time.Minute * 30).Unix()

	key := []byte(os.Getenv("SPOTIFY_OAUTH_KEY_STORAGE"))
	encryptedKey,err := encrypt(key,e.Key)
	if err != nil {
		return http.Cookie{}, err
	}

	claims := SpotifyAppClaims{
		Key: encryptedKey,
		UserName: username,
		Role: "Spotify user",
		jwt.StandardClaims{
			ExpiresAt: expireToken,
			Issuer:    "admin",
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	signedToken, err = token.SignedString([]byte(os.Getenv("SPOTIFY_STORAGE_CLIENT")))

	return
}

//middleware for verifying spotify oauth decrypt keys:
func ValidateSpotifyUser(protectedPage http.HandlerFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		splitCookie, err := PullCookie(r, "Auth_Spotify")
		if err != nil {
			DisplayAppError(w, err, "no Auth cookie found", 404)
			return
		}

		// Parse, validate and return a token.
		cookieToken, err := spotifyCookieHandler(splitCookie)
		if err != nil {
			errorString, errorCode := jwtError(err)
			cookieErrorString := "[Cookie]: " + errorString
			DisplayAppError(w, err, cookieErrorString, errorCode)
			return
		}

		sessionToken, err := spotifySessionTokenParse(r)
		if err != nil {
			errorString, errorCode := jwtError(err)
			sessionErrorString := "[SessionToken]: " + errorString
			DisplayAppError(w, err, sessionErrorString, errorCode)
			return
		}


		// Validate the token and save the token's claims to a context
		if claims, ok := cookieToken.Claims.(*SpotifyAppClaims); ok && cookieToken.Valid &&sessionToken.Valid {
			context.Set(r, "User", claims.UserName)
			//go go to the protected controller:
			protectedPage(w, r)
		} else {
			DisplayAppError(w, err, "Invalid Access Token", 401,
			)
		}
	})
}

func spotifyCookieHandler(cookie []string) (token *jwt.Token, err error) {

	token, err = jwt.ParseWithClaims(cookie[1], &SpotifyAppClaims{},
		func(token *jwt.Token) (interface{}, error) {
			// Prevents a known exploit
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("Unexpected signing method %v", token.Header["alg"])
			}
			return []byte(os.Getenv("SPOTIFY_COOKIE_CLIENT")), nil
		})
	return
}

func spotifySessionTokenParse(r *http.Request) (token *jwt.Token, err error) {
	token, err = request.ParseFromRequestWithClaims(r, request.OAuth2Extractor, &SpotifyAppClaims{}, func(token *jwt.Token) (interface{}, error) {
		// since we only use the one private key to sign the tokens,
		// we also only use its public counter part to verify
		return []byte(os.Getenv("SPOTIFY_STORAGE_CLIENT")), nil
	})

	return
}



func(e *EncryptToken) EncryptAccessToken() (dbToken models.Token,err error) {
	//strings
	dbToken.Access = e.Token.AccessToken
	dbToken.Refresh = e.Token.RefreshToken
	dbToken.Type = e.Token.TokenType

	//time.Time
	dbToken.Expiry = e.Token.Expiry
	dbToken.Expiry = dbToken.Expiry.String()

	key := []byte(e.Key)

	// encrypt value to base64
	dbToken.Access, err = encrypt(key, dbToken.Access)
	if err != nil {
		dbToken = models.Token{}
		return
	}
	dbToken.Refresh, err = encrypt(key, dbToken.Refresh)
	if err != nil {
		dbToken = models.Token{}
		return
	}
	dbToken.Type, err = encrypt(key, dbToken.Type)
	if err != nil {
		dbToken = models.Token{}
		return
	}
	dbToken.Expiry, err = encrypt(key, dbToken.Expiry)
	if err != nil {
		dbToken = models.Token{}
		return
	}

	//now upload dbToken struct to database.
	return
}

func (e *EncryptToken) DecryptAccessToken() (dbToken models.Token,err error) {
	// encrypt base64 crypto to original value.
	//the key will be passed in from the token.
	//text := decrypt(key, cryptoText)
	//fmt.Printf(text)
}

//just basic example from Golang docs:
func encrypt(key []byte, text string) (string, error) {
	// key := []byte(keyText)
	plaintext := []byte(text)

	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}

	// The IV needs to be unique, but not secure. Therefore it's common to
	// include it at the beginning of the ciphertext.
	ciphertext := make([]byte, aes.BlockSize + len(plaintext))
	iv := ciphertext[:aes.BlockSize]
	if _, err := io.ReadFull(rand.Reader, iv); err != nil {
		return "", err
	}

	stream := cipher.NewCFBEncrypter(block, iv)
	stream.XORKeyStream(ciphertext[aes.BlockSize:], plaintext)

	// convert to base64
	return base64.URLEncoding.EncodeToString(ciphertext), nil
}

func decrypt(key []byte, cryptoText string) string {
	ciphertext, _ := base64.URLEncoding.DecodeString(cryptoText)

	block, err := aes.NewCipher(key)
	if err != nil {
		panic(err)
	}

	// The IV needs to be unique, but not secure. Therefore it's common to
	// include it at the beginning of the ciphertext.
	if len(ciphertext) < aes.BlockSize {
		panic("ciphertext too short")
	}
	iv := ciphertext[:aes.BlockSize]
	ciphertext = ciphertext[aes.BlockSize:]

	stream := cipher.NewCFBDecrypter(block, iv)

	// XORKeyStream can work in-place if the two arguments are the same.
	stream.XORKeyStream(ciphertext, ciphertext)

	return fmt.Sprintf("%s", ciphertext)
}