# User ID
export USER_ID=`id -u`

# include .env variables
-include .env
export $(shell sed 's/=.*//' .env)

DOCKERCOMPO = USER_ID=$(USER_ID) docker-compose -p $(COMPOSE_PROJECT_NAME)
DOCKERCOMPORUN = $(DOCKERCOMPO) run
DOCKERRN = $(DOCKERCOMPORUN) --service-ports yap
DOCKERYARN = $(DOCKERCOMPORUN) --service-ports --user="$(USER_ID):$(USER_ID)" yap yarn
DOCKERFLOW = $(DOCKERCOMPORUN) --user="$(USER_ID):$(USER_ID)" yap flow-typed

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

docker-down:
	@echo "--> Stopping docker services"
	docker-compose -p $(COMPOSE_PROJECT_NAME) down


########
# Yarn #
########
yarn-install:
	@echo "--> Install project dependencies"
	$(DOCKERYARN)

yarn-add:
	@echo "--> Add dependency"
	$(DOCKERYARN) add ${DEP} # Example : make web-add DEP="lodash"

yarn-add-dev:
	@echo "--> Add dev dependency"
	$(DOCKERYARN) add -D ${DEP} # Example : make yarn-add-dev DEP="lodash"

yarn-remove:
	@echo "--> Remove dependency"
	$(DOCKERYARN) remove ${DEP} # Example : make yarn-remove DEP="lodash"


##############
# FLOW TYPED #
##############
flow-install:
	@echo "--> Add flow-typed libdefs"
	# https://github.com/flow-typed/flow-typed
	$(DOCKERFLOW) install ${DEP} # Example : make flow-install DEP="react-navigation"


###########
# Web App #
###########
web-start:
	@echo "--> Run app on android devices"
	$(DOCKERYARN) web:start


##############
# Native App #
##############
run-android:
	@echo "--> Run app on android devices"
	$(DOCKERSPRN) yarn mobile:android:run
