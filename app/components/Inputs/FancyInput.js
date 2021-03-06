import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TextInput } from 'react-native'
import GLOBALS from '../../../assets/utils/Global'

export default class FancyInput extends React.Component {

    constructor(props) {
        super(props)
    }



    render() {
        return (
                <TextInput 
                    style={styles.textInput} 
                    placeholder= { this.props.placeholder }
                    placeholderTextColor={this.props.placeholderColor}
                    onChangeText={ this.props.onChange }
                    secureTextEntry = { this.props.password }
                    underlineColorAndroid='transparent'/>
        );
    }
}

FancyInput.propTypes = {
    placeholder: PropTypes.string,
    placeholderColor: PropTypes.string,
    onChange: PropTypes.func,
    password: PropTypes.bool
}


const styles = StyleSheet.create({
    textInput: {
        alignSelf: 'stretch',
        padding: 14,
        marginBottom: 20,
        backgroundColor: 'transparent',
        fontSize: 20,
        borderColor: GLOBALS.COLOR.PRIMARY,
        borderBottomWidth: 1.5,
        color: GLOBALS.COLOR.TEXT,
        marginLeft: 25,
        marginRight: 25
    }
})


