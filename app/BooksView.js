'use strict';

import React from 'react-native';
import TimerMixin from 'react-timer-mixin';

var {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
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

  renderBook(book) {
    return (
      <View style={styles.container}>
        <Image style={styles.thumbnail} source={{uri: book.image_src}} />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.year}>{book.author}</Text>
        </View>
      </View>
    );
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
          dataSource={this.state.dataSource}
          renderRow={this.renderBook}
          style={styles.listView}
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
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center'
  },
  year: {
    textAlign: 'center'
  },
  thumbnail: {
    width: 53,
    height: 81
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF'
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

module.exports = BooksView;
