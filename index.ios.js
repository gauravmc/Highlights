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
  Text
} = React;

class Highlights extends Component {
  constructor(props) {
    super(props);
    this.state = {loggedIn: false};
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
      return <BooksView navigator={nav} />;
    case 'Highlights':
      return <HighlightsView navigator={nav} highlights={route.highlights} />;
    }
  }

  render() {
    if(this.state.loggedIn) {
      return (
        <Navigator
          style={styles.navBar}
          initialRoute={{ name: 'Books'}}
          navigationBar={
            <Navigator.NavigationBar routeMapper={this._navBarRouteMapper} />
          }
          renderScene={this.renderScene}
          sceneStyle={styles.scene}
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
  },
  navBar: {
    overflow: 'hidden',
    backgroundColor: 'white',
    flex: 1
  },
  navBarTitleText: {
    fontSize: 14,
    color: cssVar('fbui-bluegray-60'),
    fontWeight: '500',
    marginVertical: 9
  },
  scene: {
    paddingTop: 60,
    backgroundColor: '#eeeeee'
  }
});

AppRegistry.registerComponent('Highlights', () => Highlights);
