'use strict';

import React from 'react-native';
import TimerMixin from 'react-timer-mixin';
import NavButton from './ui/NavButton';

var {
  StyleSheet,
  View,
  ListView,
  Image,
  PropTypes,
  Navigator,
  ActivityIndicatorIOS
} = React;

var REQUEST_URL = 'http://localhost:4567/highlights.json';

var BooksView = React.createClass({
  mixins: [TimerMixin],

  getInitialState() {
    return {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      next_book_index: 0,
      books: [],
      loaded: false
    };
  },

  componentDidMount() {
    this.fetchData(REQUEST_URL);
  },

  fetchData(url) {
    this.setTimeout(()=>{
      fetch(url)
        .then((response) => response.json())
        .then((responseData) => {
          var rows = this.state.books.concat([responseData.book]);
          this.setState({
            books: rows,
            dataSource: this.state.dataSource.cloneWithRows(rows),
            next_book_index: responseData.next_book_index,
            loaded: true
          });
        })
        .catch((error) => {console.warn(error);})
        .done(() => {
          if(this.state.next_book_index) {
            var index = this.state.next_book_index;
            var url = `${REQUEST_URL}?index=${index}`;
            this.fetchData(url);
          }
        });
    }, 200);
  },

  _renderRow(book) {
    return (
      <NavButton
        onPress={() => {
          this.props.navigator.push({
            name: 'highlights',
            sceneConfig: Navigator.SceneConfigs.FloatFromRight
          });
        }}>
        <View>
          <View style={styles.row}>
            <Image resizeMode={Image.resizeMode.contain} style={styles.thumb} source={{uri: book.image_src}} />
          </View>
        </View>
      </NavButton>
    );
  },

  render() {
    if(!this.state.loaded) {
      return (
        <View style={styles.container}>
          <ActivityIndicatorIOS
            animating={true}
            style={[styles.centering, {height: 80}]}
            size="large"
          />
        </View>
      );
    } else {
      return (
        <ListView
          style={styles.listView}
          contentContainerStyle={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
        />
      );
    }
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF'
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  list: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  row: {
    justifyContent: 'center',
    margin: 3,
    marginTop: 20,
    alignItems: 'center',
    shadowRadius: 2,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {height: 0.5}
  },
  thumb: {
    width: 100,
    height: 100
  }
});

BooksView.propTypes = {
  navigator: PropTypes.object.isRequired
};

module.exports = BooksView;
