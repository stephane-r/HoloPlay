import React, { Component } from "react";
import { Image, StyleSheet, Text, View, Button } from "react-native";
import Video from "react-native-video";
import YTSearch from "youtube-search";
import test from "@youtube-audio-player/core";

test();

const options = {
  maxResults: 10,
  key: "AIzaSyD4pyuFpgd3h_IgQAEjSFvsYHsCysoilr8"
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.searchOnYoutube = this.searchOnYoutube.bind(this);
    this.addSound = this.addSound.bind(this);
  }

  state = {
    results: [],
    sound: null
  };

  searchOnYoutube() {
    YTSearch("eminem", options, (err, results) => {
      if (err) alert(err);

      this.setState({
        results
      });
    });
  }

  addSound(sound) {
    this.setState({
      sound
    });
  }

  render() {
    const { results, sound } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Button title="Search" onPress={this.searchOnYoutube} />
        {results.length > 0 &&
          results.map((item, index) => (
            <Text key={index} onPress={() => this.addSound(item)}>
              <Image
                source={{ uri: item.thumbnails.default.url }}
                style={{
                  width: item.thumbnails.default.width,
                  height: item.thumbnails.default.height
                }}
              />
              <Text>{item.title}</Text>
            </Text>
          ))}
        {sound && (
          <Video
            source={{ uri: `http://192.168.10.21:8080/${sound.id}` }}
            audioOnly={true}
            playInBackground={true}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
