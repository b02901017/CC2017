import {
  StyleSheet
} from 'react-native';


const styles = {
  movieboard :{
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FDFDFD',
    },
    rightContainer: {
      flex: 1,
      alignItems:'center',
      flexDirection:'column',
      borderBottomColor : '#DDDDDD',
      borderBottomWidth : 1
    },
    title: {
      marginTop : 8,
      flex:1,
    },
    subtitle: {
      flex: 1,
      justifyContent :'space-between',
      flexDirection: 'row',
    },
    block :{
      fontSize: 12,
      flex : 1,
      textAlign:'center'
    },
    img: {
      width: 50,
      height: 75,
    },
    listView: {
      paddingTop: 5,
    },
    searchbar :{
      height : 50,
      borderColor : "#DDDDDD",
      borderWidth : 1
    },
    searchiocn :{
       width: 50,
       height: 50,

    }
  },
  singlemovie : {
    title: {
      fontSize: 20,
      flex: 1,
      margin:8,
      textAlign: 'left',
      marginLeft : 15,
      borderBottomColor : '#DDDDDD',
      borderBottomWidth : 1
    },
    text: {
      fontSize: 12,
      textAlign: 'left',
      marginLeft : 20,
      flex:1
    },
    cast: {
      margin:1,
      fontSize: 10,
      textAlign: 'left',
      marginLeft : 55
    },
    listitem :{
      height : 25,
      flex : 1,
      flexDirection:'row',
      marginLeft : 15
    },
    listblock1:{
      flex : 1,
      fontSize : 12,
      textAlign:'left'
    },
    listblock5:{
      flex : 5,
      fontSize : 12,
      textAlign:'left'
    },
    listView: {
      paddingTop: 8,
    },
    logtitle :{
      height:25, 
      paddingBottom : 7,
      borderBottomColor : '#DDDDDD', 
      borderBottomWidth : 1
    }
    

  }
 
};

export  {styles};