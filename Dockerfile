# -------- Build do frontend --------
FROM node:20-alpine AS web
WORKDIR /web
ARG VITE_API_URL=/
ENV VITE_API_URL=$VITE_API_URL
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build
    
# -------- Build do backend --------
FROM golang:1.25-alpine AS go
WORKDIR /app/backend
COPY backend/go.mod backend/go.sum ./
RUN go mod download
COPY backend/ .
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/api ./cmd/main.go
    
FROM alpine:3.20
WORKDIR /app
RUN apk add --no-cache ca-certificates tzdata
COPY --from=go /app/api /app/api
COPY --from=web /web/dist /app/public
EXPOSE 8080
CMD ["/app/api"]
