import React, {PropTypes} from 'react'
import { StyleSheet, TextInput } from 'react-native'


export default class FancyInputEdit extends React.Component {

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

// FancyInput.PropTypes = {
//     placeholder: PropTypes.string,
//     placeholderColor: PropTypes.string,
//     onChange: PropTypes.func,
//     password: PropTypes.bool
// }


const styles = StyleSheet.create({
    textInput: {
        width: 150,
        backgroundColor: 'transparent',
        fontSize: 20,
        color: '#fff',
    }
})

