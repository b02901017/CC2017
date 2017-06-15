import React, { Component } from 'react';
import { View, Text, Image, Animated, ART} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { styles } from "../style/base.js";



class SinglemoviePage extends Component {
    renderCast(item, i){
        let character = item.characters ? item.characters.slice(0,1):'unkown' ;
        let name = item.name ? item.name:'unkown' ;
        return  (
            <Text style={styles.singlemovie.cast}>{name +'  :  '+character }</Text>
        );
    }
    render() {
        const {data} = this.props;
        let runtime = data.runtime !== ''? data.runtime: 90
        return (
            <View sytle = {{flex : 1}}>
                <Image style={{height: 200}} source={{uri:  data.posters.thumbnail}} />
                <Text style={styles.singlemovie.title}>{data.title}</Text>
                <Text style={styles.singlemovie.text}>{'release date    :        '+data.year+'        runtime:    '+runtime}</Text>
                                <Text style={styles.singlemovie.text}>{'mpaa    :    '+data.mpaa_rating}</Text>
                <Text style={styles.singlemovie.text}>{'audience:    '+data.ratings.audience_score+'        critics:    '+data.ratings.critics_score }</Text>
                <Text style={styles.singlemovie.text}>{'cast : '}</Text>
                {!!data.abridged_cast ? data.abridged_cast.map(this.renderCast, this): <Text style={styles.singlemovie.cast}>no information</Text>  }
            
            </View>
    
            )
    }
}
export default SinglemoviePage;