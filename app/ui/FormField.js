'use strict';

import React from 'react-native';

var {
  Component,
  Text,
  View,
  PropTypes,
  StyleSheet
} = React;

class FormField extends Component {
  render() {
    return (
      <View style={styles.labelContainer}>
        <View style={styles.label}>
          <Text style={styles.text}>{this.props.label}</Text>
        </View>
        {this.props.children}
      </View>
    );
  }
}

var styles = StyleSheet.create({
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
  text: {
    color: '#666666'
  }
});

FormField.propTypes = {
  children: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired
};

module.exports = FormField;
