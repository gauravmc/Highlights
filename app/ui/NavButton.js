'use strict';

import React from 'react-native';

var {
  TouchableHighlight,
  PropTypes,
  Component
} = React;

class NavButton extends Component {
  render() {
    return (
      <TouchableHighlight
        underlayColor="transparent"
        onPress={this.props.onPress}>
        {this.props.children}
      </TouchableHighlight>
    );
  }
}

NavButton.propTypes = {
  children: PropTypes.object.isRequired,
  onPress: PropTypes.func
};

module.exports = NavButton;
