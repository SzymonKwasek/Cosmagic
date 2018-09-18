import React, {PropTypes} from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import GLOBALS from '../../../assets/utils/Global'



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
        borderColor: GLOBALS.COLOR.PRIMARY,
        borderWidth: 2,
        alignItems: 'center',
        marginBottom: 20,
        marginLeft: 15,
        marginRight: 15
    },
    btnText: {
        fontSize: 27,
        color: GLOBALS.COLOR.SECONDARY,
        fontWeight: 'bold'
    },
})


