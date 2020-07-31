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
	sed s/KEYSTORE_PASSWORD/$(KEYSTORE_PASSWORD)/g android/.gradle.properties.dist > android/gradle.properties


##############
# Native App #
##############
android-run:
	@echo "--> Run app on Android devices"
	yarn android:run
android-release:
	@echo "--> Release Android App"
	yarn android:release
