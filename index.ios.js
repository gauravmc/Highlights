/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @flow
 */
'use strict';

import React from 'react-native';
import BooksView from './app/BooksView';
import HighlightsView from './app/HighlightsView';
import Login from './app/Login';

var {
  AppRegistry,
  Component,
  StyleSheet,
  Navigator,
  View
} = React;

class Highlights extends Component {
  constructor(props) {
    super(props);
    this.state = {loggedIn: false};
  }

  renderScene(route, nav) {
    switch(route.name) {
    case 'books':
      return <BooksView navigator={nav} />;
    case 'highlights':
      return <HighlightsView navigator={nav} highlights={route.highlights} />;
    }
  }

  render() {
    if(this.state.loggedIn) {
      return (
        <Navigator
          initialRoute={{ name: 'books'}}
          renderScene={this.renderScene}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          <Login onLogin={(loggedIn) => this.setState({loggedIn})} />
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
