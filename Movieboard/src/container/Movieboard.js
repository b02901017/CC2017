import React, {
  Component,
} from 'react';
import {
  AppRegistry,
  Image,
  ListView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TextInput
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import { styles } from "../style/base.js"



var REQUEST_URL = 'http://104.198.249.209:3000/api/movie';

class Movieboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      data:[],
      loaded: false,
      selects : [],
      page : 0,
      search : ''
    };
  }

  componentDidMount() {
    this.fetchData();
  }
  handleSearch(){
    fetch(REQUEST_URL+"/?title="+ this.state.search )
      .then((res) => res.json())
      .then((res) =>{ 
          if (res.length === 0)
            console.log('haha')
          else
             Actions.singlemovie({data : res[0]}); 
        })

  }

  fetchData() {
    const {page} = this.state;
    console.log(page);
    fetch(REQUEST_URL+"/?start=" + page.toString() + '&end=' + (page +20).toString() )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          data: this.state.data.concat(res)
        });
      })
      .then(()=>{
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.state.data),
            loaded: true,
            page :page+20
        });
      })
      .done();
  }

  render() {
    
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style={{marginTop: 50}}>
        <View style = {styles.movieboard.searchbar}>
          <View style = {{flex:1, flexDirection : 'row', alignItems: 'center'}}>
            <TouchableHighlight onPress={this.handleSearch.bind(this)}>
            <Image 
              source={{uri:  "https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-512.png"}}
              style={styles.movieboard.searchiocn} />
            </TouchableHighlight>
              <TextInput
                style={{flex :1}}
                placeholder="輸入電影名稱"
                onChangeText={(search) => this.setState({search})}
                value={this.state.text}
              />
          </View>
        </View>
        <ScrollView onScroll={this.handleScroll.bind(this)} scrollEventThrottle={16} >
        <ListView 
          dataSource={this.state.dataSource}
          renderRow={this.renderMovie.bind(this)}
          style={styles.movieboard.listView}
        />
        </ScrollView>

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
  handlePress(rowID) {
     const {data} = this.state;
     Actions.singlemovie({text: rowID, data : data[rowID]}); 
  }
  handleScroll(event) {
    const {page} = this.state;
    if (event.nativeEvent.contentOffset.y >= 32 * page ){
       this.fetchData();
    }
  }
  renderMovie(rowData, sectionID, rowID,) {
    const { selects }= this.state;

    return (
        <TouchableHighlight underlayColor = {'#DDDDDD'}  onPress = {() => this.handlePress(rowID)}>
          <View style={styles.movieboard.container} >
            <Image
              source={{uri: rowData.Img}}
              style={styles.movieboard.img}
            />
            <View style={styles.movieboard.rightContainer}>
              <View style={styles.movieboard.title}>
                <Text style = {{ fontSize : 16}}>{rowData.Movietitle}</Text>
              </View>
              <View style={styles.movieboard.subtitle}>
                <Text style={styles.movieboard.block}>{rowData.Grade}</Text>
              </View>
          
            </View>
          </View>
      </TouchableHighlight>
    );
  }


}



export default Movieboard;