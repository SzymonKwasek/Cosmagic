import React, {PropTypes} from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import  FancyText  from './FancyText'


export default class FancyButton extends React.Component {

    constructor(props) {
        super(props)
    }



    render() {
        return (
            <TouchableOpacity
                style={styles.btn}
                onPress={this.props.action}>
                <Text style={styles.btnText}> {this.props.btnText} </Text>
            </TouchableOpacity>
        );
    }
}

// FancyInput.PropTypes = {
//     placeholder: PropTypes.string,
//     placeholderColor: PropTypes.string,
//     onChange: PropTypes.func,
//     password: PropTypes.bool
// }


const styles = StyleSheet.create({
    btn: {
        alignSelf: 'stretch',
        backgroundColor: 'transparent',
        padding: 18,      
        borderRadius: 30,
        borderColor: '#9e79c6',
        borderWidth: 1.5,
        alignItems: 'center',
    },
    btnText: {
        fontSize: 22,
        color: '#fff',
        fontWeight: 'bold'
    },
})


