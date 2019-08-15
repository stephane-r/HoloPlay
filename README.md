# Youtube Audio Player :notes: :musical_note:

Youtube Audio Player (YAP) is an open source app, can stream Youtube audio with an open source [external API](https://github.com/stephane-r/Youtube-Audio-Player-Api). You can create your free account, save music to favoris and create your playlist.

YAP has not been tested on iOS because i'm on a Linux environment. PR if needed are welcome.

External API is build with [Strapi](https://strapi.io/), an Headless CMS, and [YouTube Audio Serve](https://github.com/stephane-r/Youtube-Audio-Server) for audio stream.

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
- [GraphQL](https://graphql.org/)
- [React Apollo](https://github.com/apollographql/react-apollo)
- [React Native Paper](https://github.com/callstack/react-native-paper)
- [React Native Quick Actions](https://github.com/jordanbyron/react-native-quick-actions)
- [React Waterfall](https://github.com/didierfranc/react-waterfall)

And more.

## Contributing

Please read [CONTRIBUTING.md]() for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License.

## TODO

- Share playlist between users
- Add tests
