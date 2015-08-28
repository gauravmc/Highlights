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
      <View style={styles.row}>
        <Text style={styles.rowDetailText}>
          {highlight}
        </Text>
        <View style={styles.separator} />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.listContainer}>
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
        />
      </View>
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
  row: {
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8
  },
  separator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#bbbbbb',
    marginLeft: 15
  },
  rowDetailText: {
    fontSize: 15,
    color: '#777777',
    lineHeight: 20
  }
});

HighlightsView.propTypes = {
  highlights: PropTypes.array.isRequired,
  navigator: PropTypes.object.isRequired
};

module.exports = HighlightsView;
