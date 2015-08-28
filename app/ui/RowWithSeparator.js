'use strict';

import React from 'react-native';

var {
  Component,
  View,
  StyleSheet,
  PropTypes,
  PixelRatio
} = React;


class RowWithSeparator extends Component {
  render() {
    return(
      <View style={styles.row}>
        {this.props.children}
        <View style={styles.separator} />
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
    height: 1 / PixelRatio.get(),
    backgroundColor: '#eeeeee'
  }
});

RowWithSeparator.propTypes = {
  children: PropTypes.object.isRequired
};

module.exports = RowWithSeparator;
