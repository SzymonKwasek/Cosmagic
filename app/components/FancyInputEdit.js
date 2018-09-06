import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TextInput } from 'react-native'
import DatePicker from 'react-native-datepicker'


export default class FancyInputEdit extends React.Component {

    constructor(props) {
        super(props)
    }
    renderType() {
        if(this.props.datepicker) {
            return (
                <DatePicker
                    style={{width:150}}
                    date={this.props.toDisplay}
                    mode='date'
                    placeholder={this.props.toDisplay}
                    format='DD-MM-YYYY'
                    confirmBtnText='Confirm'
                    cancelBtnText='Cancel'
                    onDateChange = {this.props.onChange}
                />
            )
        }
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


    render() {
        return this.renderType()
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
        color: '#fff',
        textAlign: 'right',
    }
})


