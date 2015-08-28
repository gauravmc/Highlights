'use strict';

import React from 'react-native';
import LikeShare from './LikeShare';
import RowWithSeparator from './ui/RowWithSeparator';

var {
  Component,
  ListView,
  View,
  Text,
  PropTypes,
  StyleSheet
} = React;

class HighlightsView extends Component {
  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.highlights)
    };
  }

  onHighligtLike(highlightId, liked) {
    this.props.onHighlightChange(this.props.bookId, highlightId, liked);
  }

  _renderRow(highlight) {
    var highlightId = this.props.highlights.indexOf(highlight);

    return (
      <View style={styles.rowContainer}>
        <RowWithSeparator>
          <View style={styles.textContainer}>
            <Text style={styles.rowDetailText}>{highlight.text}</Text>
          </View>
        </RowWithSeparator>
        <LikeShare highlightId={highlightId} onLike={this.onHighligtLike.bind(this)} liked={highlight.liked} />
      </View>
    );
  }

  render() {
    return (
      <ListView
        style={styles.listView}
        dataSource={this.state.dataSource}
        automaticallyAdjustContentInsets={false}
        renderRow={this._renderRow.bind(this)}
      />
    );
  }
}
var styles = StyleSheet.create({
  listContainer: {
    flex: 1
  },
  listView: {
    backgroundColor: '#eeeeee'
  },
  rowContainer: {
    flex: 1
  },
  textContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  rowDetailText: {
    lineHeight: 20,
    fontFamily: 'Cochin',
    fontSize: 14,
    fontWeight: '300',
    color: '#333333'
  }
});

HighlightsView.propTypes = {
  highlights: PropTypes.array.isRequired,
  navigator: PropTypes.object.isRequired
};

module.exports = HighlightsView;
