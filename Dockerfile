FROM golang:1.25-alpine

WORKDIR /app/backend

COPY backend/go.mod backend/go.sum ./
RUN go mod download

COPY backend/ .

RUN CGO_ENABLED=0 GOOS=linux go build -o api ./cmd/main.go

EXPOSE 8080

CMD ["./api"]
