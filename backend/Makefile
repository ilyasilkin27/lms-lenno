DOCKER_COMPOSE = docker-compose -f docker-compose.yml
DOCKER_BUILD = docker build -t lms_backend .
DOCKER_UP = docker-compose up --build -d
DOCKER_DOWN = docker-compose down

up: 
	$(DOCKER_UP)
	
down:
	$(DOCKER_DOWN)

build:
	$(DOCKER_BUILD)

rebuild: down build up

stop:
	docker-compose down

logs:
	docker-compose logs -f

clean:
	docker-compose down --volumes --remove-orphans

all: down rebuild logs
