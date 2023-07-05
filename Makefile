SERVER_SERVICE=firebase_server

.PHONY: bash
bash:
	docker-compose exec server bash

.PHONY: start
start: down up logs ## start the project

.PHONY: up
up:
	docker-compose up -d --remove-orphans

.PHONY: logs
logs:
	docker-compose logs -f server

.PHONY: stop
stop:
	docker-compose stop

.PHONY: down
down:
	docker-compose down

.PHONY: build
build: 
	DOCKER_BUILDKIT=1 docker-compose build
