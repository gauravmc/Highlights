'use strict';

import React from 'react-native';
import RowWithSeparator from './ui/RowWithSeparator';

var {
  Component,
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  ActionSheetIOS
} = React;

var LIKE_IMAGE = 'https://dl.dropboxusercontent.com/u/45917215/highlights/like.png';
var LIKED_IMAGE = 'https://dl.dropboxusercontent.com/u/45917215/highlights/liked.png';
var SHARE_IMAGE = 'https://dl.dropboxusercontent.com/u/45917215/highlights/share2.png';

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

  _onLike() {
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
      return [styles.image, {tintColor: 'pink'}];
    } else {
      return [styles.image, {tintColor: '#aaaaaa'}];
    }
  }

  showShareActionSheet() {
    ActionSheetIOS.showShareActionSheetWithOptions({
      message: this.props.highlightText
    },
    (error) => {
      console.error(error);
    },
    (success, method) => {
      var text;
      if (success) {
        text = `Shared via ${method}`;
      } else {
        text = 'You didn\'t share';
      }
      console.log(text);
    });
  }

  render() {
    return (
      <RowWithSeparator separatorColor={'#eeeeee'}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => this._onLike()}>
            <Image style={this.likeButtonStyle()} source={{uri: this.buttonImage()}} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.showShareActionSheet()}>
            <Image style={[styles.image, {tintColor: '#aaaaaa'}]} source={{uri: SHARE_IMAGE}} />
          </TouchableOpacity>
        </View>
      </RowWithSeparator>
    );
  }
}

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingBottom: 5
  },
  button: {
    paddingLeft: 80,
    flex: 0.5
  },
  image: {
    width: 15,
    height: 15
  }
});

module.exports = LikeShare;
