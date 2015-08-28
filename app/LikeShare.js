'use strict';

import React from 'react-native';
import RowWithSeparator from './ui/RowWithSeparator';

var {
  Component,
  Image,
  TouchableOpacity
} = React;

var LIKE_IMAGE = 'https://dl.dropboxusercontent.com/u/45917215/highlights/like.png';
var LIKED_IMAGE = 'https://dl.dropboxusercontent.com/u/45917215/highlights/liked.png';

class LikeShare extends Component {
  constructor(props) {
    super(props);
    this.state = {liked: false};
  }

  buttonImage() {
    if(this.state.liked) {
      return LIKED_IMAGE;
    } else {
      return LIKE_IMAGE;
    }
  }

  _onPressButton() {
    if(this.state.liked) {
      this.setState({liked: false});
    } else {
      this.setState({liked: true});
    }
  }

  likeButtonStyle() {
    if(this.state.liked) {
      return {width: 20, height: 20, tintColor: 'pink'};
    } else {
      return {width: 20, height: 20, tintColor: '#aaaaaa'};
    }
  }

  render() {
    return (
      <RowWithSeparator>
        <TouchableOpacity onPress={() => this._onPressButton()}>
          <Image style={this.likeButtonStyle()} source={{uri: this.buttonImage()}} />
        </TouchableOpacity>
      </RowWithSeparator>
    );
  }
}

module.exports = LikeShare;
