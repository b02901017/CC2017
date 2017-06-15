import React, {
  Component,
} from 'react';
import {
  AppRegistry,
  Image,
  ListView,
  Text,
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import { styles } from "../style/base.js"



var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

class Movieboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      data:[],
      loaded: false,
      selects : [] 
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(res.movies),
          loaded: true,
          data: res
        });
      })
      .done();
  }

  render() {
    
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style={{marginTop: 32}}>
        <ListView 
          dataSource={this.state.dataSource}
          renderRow={this.renderMovie.bind(this)}
          style={styles.movieboard.listView}
        />
      </View>
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.movieboard.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  }
  _onPressButton(rowID) {
    const {movies} = this.state.data;

     Actions.singlemovie({text: rowID, data : movies[rowID]}); 
  }

  renderMovie(rowData, sectionID, rowID,) {
    const { selects }= this.state;

    return (
        <TouchableHighlight style = {styles.movieboard.rowStyle}  onPress = {() => this._onPressButton(rowID)}>
          <View style={styles.movieboard.container} >
            <Image
              source={{uri: rowData.posters.thumbnail}}
              style={styles.movieboard.thumbnail}
            />
            <View style={styles.movieboard.rightContainer}>
              <Text style={styles.movieboard.title}>{rowData.title}</Text>
              <Text style={styles.movieboard.year}>{rowData.year}</Text>
            </View>
          </View>
      </TouchableHighlight>
    );
  }

  /*renderMovie(movie, sectionID, rowID) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    );
  }*/
}



export default Movieboard;