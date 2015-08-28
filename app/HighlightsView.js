'use strict';

import React from 'react-native';

var {
  Component,
  ListView,
  PixelRatio,
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

  _renderRow(highlight) {
    return (
      <View style={styles.rowContainer}>
        <View style={styles.row}>
          <View style={styles.textContainer}>
            <Text style={styles.rowDetailText}>{highlight}</Text>
          </View>
          <View style={styles.separator} />
        </View>
      </View>
    );
  }

  render() {
    return (
      <ListView
        style={styles.listView}
        dataSource={this.state.dataSource}
        automaticallyAdjustContentInsets={false}
        renderRow={this._renderRow}
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
  row: {
    backgroundColor: 'white',
    justifyContent: 'center'
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
  },
  separator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#eeeeee'
  }
});

HighlightsView.propTypes = {
  highlights: PropTypes.array.isRequired,
  navigator: PropTypes.object.isRequired
};

module.exports = HighlightsView;
