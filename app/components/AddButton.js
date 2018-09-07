import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';



export default class AddButton extends React.Component {


    constructor(props) {
        super(props)
    }


    render() {
        return (
            <TouchableOpacity
                style={styles.btn}
                onPress={this.props.onPress}>
                <Icon name="plus" size={40} color="#fff" />
            </TouchableOpacity>
        );
    }

}

const styles = StyleSheet.create({
    btn: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        width: 80,
        height: 80,
        borderRadius: 40
    },
});
