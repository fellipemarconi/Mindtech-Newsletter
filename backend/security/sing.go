package security

import (
	"api/validates"
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"os"
	"strings"
)

func secret() []byte {
	sec := os.Getenv("SECRET_KEY")
	if strings.TrimSpace(sec) == "" {
		panic("SECRET_KEY not set")
	}
	return []byte(sec)
}

func SignEmail(email string) string {
	email = validates.NormalizeEmail(email)
	mac := hmac.New(sha256.New, secret())
	mac.Write([]byte(email))
	return hex.EncodeToString(mac.Sum(nil))
}

func CheckEmailSignature(email, sig string) bool {
	email = validates.NormalizeEmail(email)
	mac := hmac.New(sha256.New, secret())
	mac.Write([]byte(email))
	expected := mac.Sum(nil)

	got, err := hex.DecodeString(sig)
	if err != nil {
		return false
	}
	return hmac.Equal(expected, got)
}
