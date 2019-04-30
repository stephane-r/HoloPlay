#!/bin/bash
rm -rf .cache
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64

yarn android:run
yarn start
