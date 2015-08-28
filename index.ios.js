/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @flow
 */
'use strict';

import React from 'react-native';
import BooksView from './app/BooksView';
import Login from './app/Login';

var {
  AppRegistry,
  Component,
  StyleSheet,
  View
} = React;

class Highlights extends Component {
  constructor(props) {
    super(props);
    this.state = {loggedIn: false};
  }

  render() {
    if(this.state.loggedIn) {
      return (
        <View style={styles.container}>
          <BooksView />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Login />
        </View>
      );
    }
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});

AppRegistry.registerComponent('Highlights', () => Highlights);
