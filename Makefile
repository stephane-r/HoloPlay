# User ID
USER_ID=`id -u`

# include .env variables
-include .env
export $(shell sed 's/=.*//' .env)

DOCKERCOMPO = USER_ID=$(USER_ID) docker-compose -p $(COMPOSE_PROJECT_NAME)
DOCKERCORRM = ${DOCKERCOMPO} run --rm --service-ports yap
DOCKERYARN = ${DOCKERCORRM} yarn

DOCKERCOREPATH = packages/core/src
DOCKERANDROIDPATH = packages/mobile/android

# Help
.SILENT:
.PHONY: help

help: ## Display this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'


#################
# Project Setup #
#################
setup:
	@echo "--> Setup project env files"
	cp .env.dist .env
	cp $(DOCKERCOREPATH)/env.js.dist $(DOCKERCOREPATH)/env.js
	cp $(DOCKERANDROIDPATH)/app/src/main/res/values/strings.xml.dist $(DOCKERANDROIDPATH)/app/src/main/res/values/strings.xml


##########
# Docker #
##########
docker-build:
	@echo "--> Building docker image"
	$(DOCKERCOMPO) build
docker-down:
	@echo "--> Stopping docker services"
	$(DOCKERCOMPO) down
docker-run-android:
	@echo "--> Run Android app"
	$(DOCKERYARN) mobile:android:run
docker-run:
	@echo "--> Run Docker container"
	$(DOCKERCORRM) bash


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
android-run:
	@echo "--> Run app on Android devices"
	$(DOCKERYARN) mobile:android:run
android-bundle:
	@echo "--> Bundle react-native app for Android"
	$(DOCKERYARN) mobile:android:bundle
android-prepare:
	@echo "--> Prepare Android App for relase"
	sed s/KEYSTORE_PASSWORD/$(KEYSTORE_PASSWORD)/g $(DOCKERANDROIDPATH)/gradle.properties.dist > $(DOCKERANDROIDPATH)/gradle.properties
	node ./scripts/prepare.js
android-release:
	@echo "--> Release Android App"
	$(DOCKERYARN) mobile:android:release
