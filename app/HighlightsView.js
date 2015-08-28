'use strict';

import React from 'react-native';

var {
  Component,
  View,
  Text,
  PropTypes,
  StyleSheet
} = React;

class HighlightsView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}><Text>Highlights be here.</Text></View>
    );
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

HighlightsView.propTypes = {
  navigator: PropTypes.object.isRequired
};

module.exports = HighlightsView;
