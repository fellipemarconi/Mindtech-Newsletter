package validates

import (
	"errors"
	"regexp"
	"strings"

	"github.com/jackc/pgconn"
)

var emailRE = regexp.MustCompile(`^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,24}$`)

func NormalizeEmail(e string) string {
	return strings.ToLower(strings.TrimSpace(e))
}

func IsValidEmail(e string) bool {
	if e == "" || strings.ContainsAny(e, " \t\r\n") || len(e) > 254 {
		return false
	}
	return emailRE.MatchString(e)
}

func IsUniqueViolation(err error) bool {
	var pgErr *pgconn.PgError
	if errors.As(err, &pgErr) {
		return pgErr.Code == "23505"
	}
	return strings.Contains(strings.ToLower(err.Error()), "duplicate") ||
		strings.Contains(strings.ToLower(err.Error()), "unique")
}
