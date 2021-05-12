<p align="center"><img src="./docs/logo.png" width="150" /></p>
<h2 align="center">HoloPlay</h2>
<p align="center" style="margin: 10px 0;"><a href="https://f-droid.org/fr/packages/com.holoplay"><img height="70" src="https://f-droid.org/wiki/images/0/06/F-Droid-button_get-it-on.png"></a></p>
<p align="center">
    <a href="https://travis-ci.org/stephane-r/HoloPlay"><img src="https://img.shields.io/github/v/tag/stephane-r/HoloPlay" alt="Build Status"></a>
    <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
    <a href="https://github.com/stephane-r/HoloPlay/tags"><img src="https://www.repostatus.org/badges/latest/active.svg" alt="Badges"></a>
    <a href="https://github.com/stephane-r/HoloPlay/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome"></a>
    <a href="https://github.com/stephane-r/HoloPlay/tags"><img src="https://img.shields.io/github/stars/stephane-r/HoloPlay?label=%E2%AD%90%20Stars" alt="Stars"></a>
    <a href="https://github.com/stephane-r/HoloPlay/tags"><img src="https://img.shields.io/github/forks/stephane-r/HoloPlay?color=%23ff69b4" alt="Forks"></a>
</p>

<hr>

HoloPlay (HoP) is a audio only Youtube alternative app using [Invidious API](https://github.com/omarroth/invidious). You can add your Invidious token and save music to favoris or create your playlists. This project is fully open source.

If you want add more feature, PM or PR are welcome :)

[<img src="fastlane/metadata/android/en-US/images/phoneScreenshots/dashboard.jpg" width=250>](./fastlane/metadata/android/en-US/images/phoneScreenshots/dashboard.jpg)
[<img src="fastlane/metadata/android/en-US/images/phoneScreenshots/search.jpg" width=250>](./fastlane/metadata/android/en-US/images/phoneScreenshots/search.jpg)
[<img src="fastlane/metadata/android/en-US/images/phoneScreenshots/playlists.jpg" width=250>](./fastlane/metadata/android/en-US/images/phoneScreenshots/playlists.jpg)
[<img src="fastlane/metadata/android/en-US/images/phoneScreenshots/favoris.jpg" width=250>](./fastlane/metadata/android/en-US/images/phoneScreenshots/favoris.jpg)
[<img src="fastlane/metadata/android/en-US/images/phoneScreenshots/dashboard-dark.jpg" width=250>](./fastlane/metadata/android/en-US/images/phoneScreenshots/dashboard-dark.jpg)
[<img src="fastlane/metadata/android/en-US/images/phoneScreenshots/player.jpg" width=250>](./fastlane/metadata/android/en-US/images/phoneScreenshots/player.jpg)
[<img src="fastlane/metadata/android/en-US/images/phoneScreenshots/drawler.jpg" width=250>](./fastlane/metadata/android/en-US/images/phoneScreenshots/drawler.jpg)
[<img src="fastlane/metadata/android/en-US/images/phoneScreenshots/settings.jpg" width=250>](./fastlane/metadata/android/en-US/images/phoneScreenshots/settings.jpg)
[<img src="fastlane/metadata/android/en-US/images/phoneScreenshots/quick-actions.jpg" width=250>](./fastlane/metadata/android/en-US/images/phoneScreenshots/quick-actions.jpg)

Interface based on beautiful free [Music Song](https://www.uplabs.com/posts/music-song).

## Android version compatibility

HoloPlay has been tested on real devices with Android version 8, 9 and 10. Android 5, 6 and 7 on Emulator only.

For now, HoloPlay is designed for mobile, not optimized for tablet device.

## Features

- **Search by video and playlist**
- **Live video**
- **Create your playlists**
- **Save on favoris**
- **Downloading video**
- **Background mode**
- **Offline**
- **Work on Android Auto**
- **Respect your privacy**
- **Open Source**
- **Cloud Syncing**
- **Dark Theme**
- **internationalization with EN (default) and FR**

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

[See React Native doc prerequisites](https://reactnative.dev/docs/getting-started#prerequisites)

### Installing

First, setup environment file :

`cp .env.dist .env`

Use correct Node version (>= 12) :

`nvm use`

Then, install dependencies :

`yarn install`

Start NodeJS development server :

`yarn start`

And run your Android emulator :

`yarn android:run`

## Built With

- [React Native](https://facebook.github.io/react-native/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Paper](https://github.com/callstack/react-native-paper)
- [React Native Quick Actions](https://github.com/jordanbyron/react-native-quick-actions)
- [React Waterfall](https://github.com/didierfranc/react-waterfall)
- [TypeScript](https://www.typescriptlang.org/)

And more.

## Android permissions

- `INTERNET` : Connect to the network
- `FORGROUND_SERVICE` : used by [react-native-music-control](https://github.com/tanguyantoine/react-native-music-control)
- `READ_EXTERNAL_STORAGE`, `WRITE_EXTERNAL_STORAGE` and `DOWNLOAD_WITHOUT_NOTIFICATION` : for download and save downloaded file

All **STORAGE** permissions are requested only when you need use them.

## Error and performance monitoring

**HoloPlay** uses an self hosted [Sentry](https://sentry.io/welcome/) instance crash reporting library, **disabled** by default. This reporting can be enabled and disabled via settings screen.

## Contributing

Please read [CONTRIBUTING.md]() for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT.

## TODO

- [ ] Add video support
- [ ] UI for tablet
- [x] Submit on f-droid store
- [x] Adding music on playlist from all screen and player
- [x] Can create playlist from adding music on playlist dialog
- [x] Add popular/trending videos and search screen
- [x] Add i18n with EN and FR translation (EN default language)
- [x] Add update alert
- [x] Adding search type (video, playlists)
- [x] Show playlist on player view
- [x] Settings screen
