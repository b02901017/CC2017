import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  ListView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Linking
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { styles } from "../style/base.js";



var REQUEST_URL = 'http://104.198.249.209:3000/api/log';
class SinglemoviePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            data:[],
            loaded: false,
            page : 0
        };
    }
  
    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const {page} = this.state;
        const {Movietitle} = this.props.data;
        console.log(Movietitle);
        fetch(REQUEST_URL+"/?title=" + Movietitle + '&start=' + page.toString() + '&end=' + (page +20).toString() )
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
                page : page +20
            });
        })
        .done();
    }
    handleScroll(event) {
        const {page} = this.state;
        if (event.nativeEvent.contentOffset.y >= 10 * page ){
            this.fetchData();
        }
    }
    handlePress(rowID) {
        const {data} = this.state;
        Linking.openURL("https://www.ptt.cc" + data[rowID].Link);

    }
    render() {
        const {data} = this.props;
        return (
             <View style={{flex: 1}}>
                <View style={{flex: 3, backgroundColor: '#FFFFFF'}}>
                     <Image style={{flex: 7}} source={{uri:  data.Img}} />
                     <Text style={styles.singlemovie.title}>{data.Movietitle}</Text>
                     <View style= {{flex : 1, flexDirection : 'row'}}>
                        <Text style={styles.singlemovie.text}>放映日期</Text>
                        <Text style={styles.singlemovie.text}>{data.Date}</Text>
                        <Text style={styles.singlemovie.text}>放映長度</Text>
                        <Text style={styles.singlemovie.text}>{data.Time}</Text>
                    </View>
                    <View style= {{flex : 1, flexDirection : 'row'}}>
                        <Text style={styles.singlemovie.text}>分級</Text>
                        <Text style={styles.singlemovie.text}>{data.Date}</Text>
                        <Text style={styles.singlemovie.text}>狀態</Text>
                        <Text style={styles.singlemovie.text}>上映中</Text>
                    </View>
                    <View style= {{flex : 1, flexDirection : 'row'}}>
                        <Text style={styles.singlemovie.text}>Ptt評分</Text>
                        <Text style={styles.singlemovie.text}>{Math.round(10*data.Score)/10}</Text>
                        <Text style={styles.singlemovie.text}>Yahoo評分</Text>
                        <Text style={styles.singlemovie.text}>{data.Rate}</Text>
                    </View>                    
                </View>
                
                <View style={{flex: 2, backgroundColor: '#FAFAFA'}}>
                    <View style={styles.singlemovie.logtitle}>
                        <View style={{flex: 1, flexDirection: 'row', marginLeft : 15}}>
                            <Text style = {styles.singlemovie.listblock1}>類別</Text>
                            <Text style = {styles.singlemovie.listblock5}>標題</Text>
                            <Text style = {styles.singlemovie.listblock1}>日期</Text>
                            <Text style = {styles.singlemovie.listblock1}>推文</Text>
                        </View >
                    </View >
                    <ScrollView style={{flex : 1}} onScroll={this.handleScroll.bind(this)} scrollEventThrottle={16} >
                        <ListView 
                            dataSource={this.state.dataSource}
                            renderRow={this.renderLog.bind(this)}
                            style={styles.singlemovie.listView}
                        />
                    </ScrollView>
                </View>
            </View>
        )
    }
    renderLog(rowData, sectionID, rowID,) {
        let title = rowData.Title;
        if (title.length >= 19){
            title = title.slice(0,18) + '...'
        }
        return (
            <TouchableHighlight underlayColor = {'#DDDDDD'} onPress = {() => this.handlePress(rowID)}>
            <View style={styles.singlemovie.listitem} >
               <Text style = {styles.singlemovie.listblock1}>{rowData.Category.slice(0,2)}</Text>
               <Text style = {styles.singlemovie.listblock5}>{title}</Text>
               <Text style = {styles.singlemovie.listblock1}>{rowData.Data}</Text>
               <Text style = {styles.singlemovie.listblock1}>{rowData.Push}</Text>
            </View>
            </TouchableHighlight>
        );
    }
}
export default SinglemoviePage;