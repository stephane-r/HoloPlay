#!/bin/bash
JAVA_HOME=$(grep JAVA_HOME .env | cut -d '=' -f2)
ANDROID_HOME=$(grep ANDROID_HOME .env | cut -d '=' -f2)

export JAVA_HOME
export ANDROID_HOME
export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools

$ANDROID_HOME/tools/emulator -list-avds
$ANDROID_HOME/tools/emulator -avd Pixel_XL_API_28_2
