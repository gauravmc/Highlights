'use strict';

import React from 'react-native';

var {
  Component,
  View,
  StyleSheet,
  PixelRatio
} = React;


class RowWithSeparator extends Component {
  render() {
    return(
      <View style={styles.row}>
        {this.props.children}
        <View style={[styles.separator, {backgroundColor: this.props.separatorColor}]} />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  row: {
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  separator: {
    height: 1 / PixelRatio.get()
  }
});

module.exports = RowWithSeparator;
