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
    this.state = {
      liked: this.props.liked
    };
  }

  buttonImage() {
    if(this.state.liked) {
      return LIKED_IMAGE;
    } else {
      return LIKE_IMAGE;
    }
  }

  _onPressButton() {
    var likeState;
    if(this.state.liked) {
      likeState = false;
    } else {
      likeState = true;
    }
    this.setState({liked: likeState});
    this.props.onLike(this.props.highlightId, likeState);
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
