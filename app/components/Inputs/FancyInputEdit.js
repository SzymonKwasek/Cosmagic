import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TextInput } from 'react-native'
import DatePicker from 'react-native-datepicker'
import GLOBALS from '../../../assets/utils/Global'


export default class FancyInputEdit extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            date: this.props.placeholder
        }
    }

    renderDataPicker() {
        return (
            <DatePicker
                style={{ width:150, margin: 10} }
                date={ this.props.placeholder }
                mode='date'
                placeholder={ this.state.date }
                format='DD-MM-YYYY'
                confirmBtnText='Confirm'
                cancelBtnText='Cancel'
                onDateChange = { this.props.onChange }
            />
        )
    }
    renderInput() {
        return (
            <TextInput 
                style={ styles.textInput } 
                placeholder= { this.props.placeholder ? this.props.placeholder : 'Press to input' }
                placeholderTextColor={ this.props.placeholderColor }
                onChangeText={ this.props.onChange }
                secureTextEntry = { this.props.password }
                underlineColorAndroid='transparent'/>
        );
    }


    render() {
        if(this.props.datepicker) return this.renderDataPicker()
        else return this.renderInput()
    }
}

FancyInputEdit.propTypes = {
    placeholder: PropTypes.string,
    placeholderColor: PropTypes.string,
    onChange: PropTypes.func,
    password: PropTypes.bool
}


const styles = StyleSheet.create({
    textInput: {
        width: 150,
        backgroundColor: 'transparent',
        fontSize: 20,
        color: GLOBALS.COLOR.TEXT,
        alignSelf: 'stretch',
        padding: 5,
        marginTop: 5,
        marginBottom: 5
    }
})


