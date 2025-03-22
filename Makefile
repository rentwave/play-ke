# Define the default image and environment
IMAGE=osiru/playkefrontend:${FRONTEND_TAG}
ENV=stage

# Define the docker-compose file based on the environment
ifeq ($(ENV), prod)
	COMPOSE_FILE=docker-compose.prod.yml
else
	COMPOSE_FILE=docker-compose.stage.yml
endif

build:
	docker build -t $(IMAGE) .

up:
	docker-compose -f $(COMPOSE_FILE) up -d

ps:
	docker-compose -f $(COMPOSE_FILE) ps

logs:
	docker-compose -f $(COMPOSE_FILE) logs -f

rm: stop
	docker-compose -f $(COMPOSE_FILE) rm -f

stop:
	docker-compose -f $(COMPOSE_FILE) stop

# Set environment to production
prod:
	make ENV=prod up
