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
    },
    title: {
      fontSize: 16,
      marginBottom: 8,
      textAlign: 'center',
    },
    year: {
      fontSize: 12,
      textAlign: 'center',
    },
    thumbnail: {
      width: 40,
      height: 62,
    },
    listView: {
      paddingTop: 20,
      backgroundColor: '#F5FCFF',
    },
  },
  singlemovie : {
    

    title: {
      fontSize: 14,
      margin: 8,
      textAlign: 'left',
      marginLeft : 30
    },
    text: {
      fontSize: 12,
      textAlign: 'left',
      margin : 2,
      marginLeft : 40

    },
    cast: {
      margin:1,
      fontSize: 10,
      textAlign: 'left',
      marginLeft : 55
    },
    

  }
 
};

export  {styles};