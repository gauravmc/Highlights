'use strict';

import React from 'react-native';
import FormField from './ui/FormField';

var {
  Component,
  View,
  TextInput,
  PropTypes,
  StyleSheet
} = React;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <FormField label="Amazon Email">
          <TextInput
            autoFocus={true}
            keyboardType={'email-address'}
            placeholder="email"
            style={styles.default}
          />
        </FormField>
        <FormField label="Amazon Password">
          <TextInput
            secureTextEntry={true}
            placeholder="password"
            style={styles.default}
            onSubmitEditing={() => this.props.onLogin(true)}
          />
        </FormField>
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
  default: {
    height: 26,
    borderWidth: 0.5,
    borderRadius: 3,
    borderColor: '#aaaaaa',
    flex: 1,
    fontSize: 13,
    padding: 4
  }
});

Login.propTypes = {
  onLogin: PropTypes.func
};

module.exports = Login;
