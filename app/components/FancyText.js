import React from 'react'
import { StyleSheet, Text } from 'react-native'
import GLOBALS from '../../assets/utils/Global'

export default class FancyText extends React.Component {

    constructor(props) {
        super(props)
    }



    render() {
        return (
                <Text style={styles.text}>
                    {this.props.text}
                </Text>
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
    text: {
        alignSelf: 'stretch',
        marginBottom: 20,
        backgroundColor: 'transparent',
        fontSize: 20,
        color: GLOBALS.COLOR.TEXT,
        height: 60,
        padding: 14
    }
})


