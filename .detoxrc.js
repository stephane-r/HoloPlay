module.exports = {
  testRunner: "jest",
  runnerConfig: "e2e/config.json",
  skipLegacyWorkersInjection: true,
  apps: {
    ios: {
      binaryPath: "ios/build/Build/Products/Debug-iphonesimulator/holoplay.app",
      build:
        "xcodebuild -workspace ios/HoloPlay.xcworkspace -configuration Debug -scheme HoloPlay -sdk iphonesimulator -derivedDataPath ios/build",
      type: "ios.app",
      name: "iPhone X",
    },
    // android: {
    //   type: "android.apk",
    //   binaryPath: "ios/build/Build/Products/Debug-iphonesimulator/app.app",
    // },
  },
  devices: {
    simulator: {
      type: "ios.simulator",
      device: {
        type: "iPhone 12",
      },
    },
    // emulator: {
    //   type: "android.emulator",
    //   device: {
    //     avdName: "Pixel_3a_API_30_x86",
    //   },
    // },
  },
  configurations: {
    ios: {
      device: "simulator",
      app: "ios",
    },
    // android: {
    //   device: "emulator",
    //   app: "android",
    // },
  },
};
