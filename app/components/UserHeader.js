import React from 'react'
import { StyleSheet, Text, View} from 'react-native'


import Icon from 'react-native-vector-icons/FontAwesome';


export default class HeaderButton extends React.Component {


    render() {
        return (    

           <View style={styles.container}>
                <View style={styles.userPhoto}/>
                <Text style={styles.userTitle}> {this.props.userName} </Text>
            </View>

        );
    }

}



const styles = StyleSheet.create({
    container: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'stretch',
        height: 60,
        padding: 0,
        borderBottomWidth: 2.5,
        borderColor: '#9e79c6',
        marginBottom: 20
    },
    userTitle: {
        fontSize: 20,
        color: '#fff',
    },
    userPhoto: {
        backgroundColor: 'transparent',
        borderRadius: 80,
        borderWidth: 3.5,
        borderColor:'#9e79c6',
        height: 90,
        width: 90,
        margin: 20,
        overflow: 'visible',
        position: 'relative',
        top: 10,
        zIndex: 99,
        margin: 10
    }
});
