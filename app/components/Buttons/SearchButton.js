import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'


import Icon from 'react-native-vector-icons/FontAwesome';


export default class HeaderButton extends React.Component {


    render() {
        return (    

            <TouchableOpacity style={styles.headerMenu} onPress={this.props.onPress}>
                <Text style={styles.headerMenuText}> <Icon name={this.props.iconName} size={30} color={this.props.iconColor} /></Text>
            </TouchableOpacity>

        );
    }

}



const styles = StyleSheet.create({
    headerMenu: {
        position: 'absolute',
        top: 0,
        right: 50,
        margin: 20
    },
    headerMenuText: {
        color: 'white',
        fontSize: 14,
        alignSelf: 'flex-end'
    }
});
