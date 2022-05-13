# Use bash sintaxe
SHELL := /bin/bash

# Run all containers in detached mode
run:
	docker-compose up -d

build:
	docker-compose -f docker-compose.yml up -d

# Stop all containers related to the app
stop:
	docker-compose stop

clean:
	docker-compose down