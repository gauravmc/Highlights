'use strict';

import React from 'react-native';
import TimerMixin from 'react-timer-mixin';
import NavButton from './ui/NavButton';
import SearchBar from 'react-native-search-bar';

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
      loaded: false,
      showSearch: false
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
          var bookset = this.state.books.concat([responseData.book]);
          this.setState({
            books: bookset,
            dataSource: this.state.dataSource.cloneWithRows(this._prepareRows(bookset)),
            next_book_index: responseData.next_book_index,
            loaded: true
          });
        })
        .catch((error) => {console.warn(error);})
        .done(() => {
          // this.props.navigator.push({
          //   name: 'Highlights',
          //   highlights: this.state.books[0].highlights,
          //   sceneConfig: Navigator.SceneConfigs.FloatFromRight
          // });
          if(this.state.next_book_index) {
            var index = this.state.next_book_index;
            var url = `${REQUEST_URL}?index=${index}`;
            this.fetchData(url);
          }
        });
    }, 200);
  },

  _prepareRows(books) {
    var rows = [];
    books.forEach(
      (book) => {
        rows.push([books.indexOf(book), book]);
      }
    );
    return rows;
  },

  onHighlightChange(bookId, highlighId, liked) {
    this.state.books[bookId].highlights[highlighId].liked = liked;
    this.setState(this.state);
  },

  _renderRow(row) {
    var [index, book] = row;
    return (
      <NavButton
        onPress={() => {
          this.props.navigator.push({
            name: 'Highlights',
            highlights: book.highlights,
            bookId: index,
            onHighlightChange: this.onHighlightChange,
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

  _filterBooks(search) {
    var reg = new RegExp(search, 'i');
    var filterdBooks = [];
    this.state.books.forEach(
      (book) => {
        if(book.title.match(reg)) {
          filterdBooks.push(book);
        }
      }
    );
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this._prepareRows(filterdBooks))
    });
  },

  _handleScroll(e) {
    if(e.nativeEvent.contentOffset.y < -40) {
      this.setState({showSearch: true});
    } else if(e.nativeEvent.contentOffset.y > 20) {
      this.setState({showSearch: false});
    }
  },

  renderSearchBar() {
    if(this.state.showSearch) {
      return (
        <SearchBar
          placeholder='Search'
          onChangeText={(search) => this._filterBooks(search)}
        />
      );
    }
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
        <View style={{flex: 1}}>
          {this.renderSearchBar()}
          <ListView
            style={styles.listView}
            onScroll={this._handleScroll}
            scrollEventThrottle={200}
            contentContainerStyle={styles.list}
            automaticallyAdjustContentInsets={false}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
          />
        </View>
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
    backgroundColor: '#ffffff'
  },
  listView: {
    backgroundColor: '#ffffff'
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
