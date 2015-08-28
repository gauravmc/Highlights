/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @flow
 */
'use strict';

import React from 'react-native';
import cssVar from 'cssVar';
import BooksView from './app/BooksView';
import HighlightsView from './app/HighlightsView';
import Login from './app/Login';

var {
  AppRegistry,
  Component,
  StyleSheet,
  Navigator,
  View,
  PixelRatio,
  Text
} = React;

class Highlights extends Component {
  constructor(props) {
    super(props);
    this.state = {loggedIn: true};
  }

  componentWillMount() {
    this._navBarRouteMapper = {
      LeftButton() {
        return null;
      },
      RightButton() {
        return null;
      },
      Title(route) {
        return (
          <Text style={styles.navBarTitleText}>{route.name}</Text>
        );
      }
    };
  }

  _navBarRouteMapper: Object;

  renderScene(route, nav) {
    switch(route.name) {
    case 'Books':
      return (
        <View style={{flex: 1}}>
          <View style={styles.separator} />
          <BooksView navigator={nav} />
        </View>
      );
    case 'Highlights':
      return (
        <View style={{flex: 1}}>
          <View style={styles.separator} />
          <HighlightsView navigator={nav} highlights={route.highlights} />
        </View>
      );
    }
  }

  render() {
    if(this.state.loggedIn) {
      return (
        <View style={styles.appContainer}>
          <Navigator
            style={styles.navBar}
            initialRoute={{ name: 'Books'}}
            navigationBar={
              <Navigator.NavigationBar routeMapper={this._navBarRouteMapper} />
            }
            renderScene={this.renderScene}
          />
        </View>
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
  appContainer: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  navBar: {
    backgroundColor: 'white',
    paddingTop: 65
  },
  navBarTitleText: {
    fontSize: 14,
    color: cssVar('fbui-bluegray-60'),
    fontWeight: '500',
    marginVertical: 9
  },
  separator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#bbbbbb'
  }
});

AppRegistry.registerComponent('Highlights', () => Highlights);
