# Youtube Audio Player :notes: ![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/stephane-r/Youtube-Audio-Player) [![build status](https://img.shields.io/travis/stephane-r/Youtube-Audio-Player/master.svg?style=flat-square)](https://travis-ci.org/stephane-r/Youtube-Audio-Player) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)

Youtube Audio Player (YAP) is an open source app, can stream Youtube audio with an open source [Invidious API](https://github.com/omarroth/invidious). You can add your Invidious token and save music to favoris or create your playlists.

YAP has not been tested on iOS because i'm on a Linux environment. PR if needed are welcome.

![Dashboard screen](./docs/dashboard.jpg)
![Playlist screen](./docs/playlists.jpg)
![Favoris screen](./docs/favoris.jpg)
![Quick Actions](./docs/quick-actions.jpg)

Interface based on beautiful free [Music Song](https://www.uplabs.com/posts/music-song).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

YAP has [Docker image](https://github.com/stephane-r/react-native-docker) with all software and dependencies. Just run with the commands below :rocket:

Docker is not required. You can use default React-Native CLI for run/build the project.

### Installing

First, copy environment file :

`cp .env.dist .env`

Build Dockerfile :

```
make docker-build
```

Then, install project dependencies :

```
make yarn-install
```

Running React-Native app on your device :

```
make android-run // or react-native run-android/ios
```

Add new dependency :

```
make yarn-add $DEP
```

## Deployment

YAP is updated with [Code-Push](https://github.com/Microsoft/code-push/tree/master/cli) on every tags.

See `.travis.yml` file for process.

## Built With

- [React Native](https://facebook.github.io/react-native/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Paper](https://github.com/callstack/react-native-paper)
- [React Native Quick Actions](https://github.com/jordanbyron/react-native-quick-actions)
- [React Waterfall](https://github.com/didierfranc/react-waterfall)

And more.

## Contributing

Please read [CONTRIBUTING.md]() for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License.

## TODO

- [] Settings screen
- [] Add user preferences screen (from invidious API)
- [x] Adding search type (video, playlists)
- [] Compile on iOS
