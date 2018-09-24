import React from 'react'
import { StyleSheet, View, ActivityIndicator, Dimensions } from 'react-native'


import Icon from 'react-native-vector-icons/FontAwesome';


export default class MenuSlide extends React.Component {



    constructor(props) {
        super(props)
    }




    render() {
        return (    

            <View style={styles.menu}>
                    <ActivityIndicator size='large' color='rgb(0,0,0)' animating={this.props.animating}/>
            </View>

        );
    }

}


const width = Dimensions.get('window').width

const height = Dimensions.get('window').height

const styles = StyleSheet.create({
    menu: {
        position: 'absolute',
        alignSelf: 'stretch',
        height: height,
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
