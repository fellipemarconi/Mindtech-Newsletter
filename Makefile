# Comands
DOCKER_COMPOSE=docker-compose

# Build the containers
build:
	$(DOCKER_COMPOSE) build

# Start the application
up:
	$(DOCKER_COMPOSE) up -d

# Stop the application
down:
	$(DOCKER_COMPOSE) down

# Clean in containers and volumes
clean:
	$(DOCKER_COMPOSE) down -v --remove-orphans

help:
	@echo "Usage: make <target>"
	@echo "Available targets:"
	@echo "  help               - Display this help message"
	@echo "  build              - Build Docker images"
	@echo "  up                 - Start the application"
	@echo "  down               - Stop the application"
	@echo "  clean              - Clean up Docker containers and volumes"