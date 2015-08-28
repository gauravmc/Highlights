'use strict';

import React from 'react-native';

var {
  Component,
  Text,
  View,
  TextInput,
  StyleSheet
} = React;

class WithLabel extends Component {
  render() {
    return (
      <View style={styles.labelContainer}>
        <View style={styles.label}>
          <Text>{this.props.label}</Text>
        </View>
        {this.props.children}
      </View>
    );
  }
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <WithLabel label="Amazon Email">
          <TextInput
            autoFocus={true}
            keyboardType={'email-address'}
            placeholder="email"
            style={styles.default}
          />
        </WithLabel>
        <WithLabel label="Amazon Password">
          <TextInput
            secureTextEntry={true}
            placeholder="password"
            style={styles.default}
            onSubmitEditing={() => this.props.onLogin(true)}
          />
        </WithLabel>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  labelContainer: {
    flexDirection: 'column',
    marginVertical: 2,
    flex: 1
  },
  label: {
    width: 250,
    alignItems: 'flex-start',
    paddingBottom: 3
  },
  default: {
    height: 26,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    flex: 1,
    fontSize: 13,
    padding: 4
  }
});

module.exports = Login;
