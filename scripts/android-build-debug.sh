#!/bin/bash
mkdir -p android/app/src/main/assets
node ./node_modules/react-native/local-cli/cli.js bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

yarn android:release:debug
