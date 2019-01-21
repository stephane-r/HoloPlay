// import React, { Component } from 'react';
// import { StyleSheet, View, ScrollView, Button } from 'react-native';
// import {
//   Provider,
//   actions,
//   SearchResultContainer
// } from '@youtube-audio-player/core';
// import { Input } from '@youtube-audio-player/components';
// import AudioContainer from '../../containers/Audio';

// class App extends Component {
//   componentDidMount() {
//     actions.search();
//   }

//   render() {
//     return (
//       <Provider>
//         <ScrollView>
//           <View style={styles.container}>
//             <Input
//               onChangeText={text => actions.setSearchValue(text)}
//               placeholder="Rechercher..."
//             />
//             <Button title="Search" onPress={actions.search} />
//             <SearchResultContainer
//               onPress={index => actions.loadSource(index)}
//             />
//             <AudioContainer />
//           </View>
//         </ScrollView>
//       </Provider>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF'
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5
//   }
// });

// export default App;

import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from '@youtube-audio-player/core';
import SwitchNavigator from '../../navigation/SwitchNavigator';

class App extends React.Component {
  render() {
    return (
      <Provider>
        <SwitchNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

export default App;
