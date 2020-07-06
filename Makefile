# User ID
USER_ID=`id -u`

# include .env variables
-include .env
export $(shell sed 's/=.*//' .env)

DOCKERCOMPO = USER_ID=$(USER_ID) docker-compose -p $(COMPOSE_PROJECT_NAME)
DOCKERRM = ${DOCKERCOMPO} run --rm --service-ports
DOCKERYAP = $(DOCKERRM) yap
DOCKERYARN = $(DOCKERYAP) yarn

ANDROID_PATH = android

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
	cp $(ANDROID_PATH)/app/src/main/res/values/.strings.xml.dist $(ANDROID_PATH)/app/src/main/res/values/strings.xml
	cp $(ANDROID_PATH)/gradle.properties.dist $(ANDROID_PATH)/gradle.properties


##############
# Native App #
##############
android-run:
	@echo "--> Run app on Android devices"
	$(DOCKERYARN) android:run
set-env-production:
	@echo "--> Set production env file"
	node ./scripts/env-production.js
android-prepare:
	@echo "--> Prepare Android App for relase"
	sed s/KEYSTORE_PASSWORD/$(KEYSTORE_PASSWORD)/g $(ANDROID_PATH)/gradle.properties.dist > $(ANDROID_PATH)/gradle.properties
	node ./scripts/prepare-code-push.js
android-release:
	@echo "--> Release Android App"
	yarn android:release


##########
# Deploy #
##########
code-push-prepare:
	@echo "--> Set code-push config"
	sed s/CODE_PUSH_LOGIN_KEY/$(CODE_PUSH_LOGIN_KEY)/g ./.code-push.config.dist > ./.code-push.config
code-push-production:
	@echo "--> Push bundle to code-push"
	$(DOCKERYARN) push:production
