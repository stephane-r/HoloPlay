# User ID
USER_ID=`id -u`

# include .env variables
-include .env
export $(shell sed 's/=.*//' .env)

ANDROID_PATH = android

# Help
.SILENT:
.PHONY: help

help: ## Display this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'


#################
# Project Setup #
#################
setup-production-env:
	@echo "--> Setup production env file"
	node ./scripts/env-production.js
setup:
	@echo "--> Setup project env files"
	sed s/KEYSTORE_PASSWORD/$(KEYSTORE_PASSWORD)/g $(ANDROID_PATH)/gradle.properties.dist > $(ANDROID_PATH)/gradle.properties
	sed s/CODE_PUSH_DEPLOY_KEY/$(CODE_PUSH_DEPLOY_KEY)/g $(ANDROID_PATH)/app/src/main/res/values/strings.xml.dist > $(ANDROID_PATH)/app/src/main/res/values/strings.xml


##############
# Native App #
##############
android-run:
	@echo "--> Run app on Android devices"
	yarn android:run
android-release:
	@echo "--> Release Android App"
	yarn android:release


##########
# Deploy #
##########
code-push-production:
	@echo "--> Push bundle to code-push"
	sed s/CODE_PUSH_LOGIN_KEY/$(CODE_PUSH_LOGIN_KEY)/g ./.code-push.config.dist > ./.code-push.config
	# $(DOCKERYARN) push:production
