# User ID
export USER_ID=`id -u`

# include .env variables
-include .env
export $(shell sed 's/=.*//' .env)

DOCKERCOMPO = USER_ID=$(USER_ID) docker-compose -p $(COMPOSE_PROJECT_NAME)
DOCKERCOMPORUN = $(DOCKERCOMPO) run
DOCKERRN = $(DOCKERCOMPORUN) --user="$(USER_ID):$(USER_ID)" react-native
DOCKERSPRN = $(DOCKERCOMPORUN) --service-ports react-native
DOCKERRNRM = $(DOCKERCOMPORUN) --rm react-native

# Help
.SILENT:
.PHONY: help

help: ## Display this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'


##########
# Docker #
##########
docker-run:
	@echo "--> Run Docker container"
	docker run -it --privileged \
		-w /app \
		-v /dev/bus/usb:/dev/bus/usb \
		-v $(PWD):/app \
		-p 8081:8081 react-native-android bash

docker-run-android:
	@echo "--> Run app on android devices"
	$(DOCKERSPRN) react-native run-android

docker-down:
	@echo "--> Stopping docker services"
	docker-compose -p $(COMPOSE_PROJECT_NAME) down