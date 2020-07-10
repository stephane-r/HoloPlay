#!/bin/bash
JAVA_HOME=$(grep JAVA_HOME .env | cut -d '=' -f2)
ANDROID_HOME=$(grep ANDROID_HOME .env | cut -d '=' -f2)

rm -rf .cache
export JAVA_HOME
export ANDROID_HOME
export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools

yarn android:release
