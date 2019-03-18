# Youtube Audio Player :notes: :musical_note:

Youtube Audio Player (YAP) is an open source multi platform app, can stream Youtube audio with an open source [external API](https://github.com/stephane-r/Youtube-Audio-Player-Api). You can create your free account, save music to favoris and create your playlist.

Every music can be downloaded for offline listening with your favorite Android player.

External API is build with Strapi, an Headless CMS, and YouTube Audio Serve for audio stream.

## Getting Started :ok_hand:

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Architecture :star2:

_components_ : every shared components between web and native app
_core_ : store, reducers and logic
_mobile_ : react-native app
_web_ : react web app

### Prerequisites :sunglasses:

YAP has Docker image with all software and dependencies. Just run native or web platform with the commands below :rocket:

### Installing :package:

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

Running React Native App on your device :

```
make android-run
```

Run web app :

```
make web-start
```

Add new dependency :

```
make add $DEP
```

Add new dependency for web app :

```
make web-add $DEP
```

Add new dependency for native app :

```
make mobile-add $DEP
```

TODO: Fix Docker container build-tools : `/usr/local/android-sdk/tools/android update sdk --no-ui --all --filter build-tools-27.0.1` :whale:

## Deployment :tada:

Native app is deployed with [Code-Push](https://github.com/Microsoft/code-push/tree/master/cli) and web with [Travis](https://travis-ci.org/).

TODO

## Built With :muscle:

- [React]() - React
- [React Native]() - React Native
- [React Native Web]() - React Native Web

## Contributing :+1:

Please read [CONTRIBUTING.md]() for details on our code of conduct, and the process for submitting pull requests to us.

## Authors :construction_worker_man:

- **Stéphane Richin** - _Initial work_

See also the list of [contributors]() who participated in this project.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc

TODO

Add code-push login on Dockerfile

Script d'init :

copie le .env.dist -> .env
V : ajoute la clé de déploiement dans le fichier strings.xml
~V : ajoute le password dans le fichier gradle.properties
~V : déencode le fichier yap.keystore
