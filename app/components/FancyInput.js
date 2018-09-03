import React, {PropTypes} from 'react'
import { StyleSheet, TextInput } from 'react-native'


export default class FancyInput extends React.Component {
    static navigationOptions = {
        header: null
      };

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
        alignSelf: 'stretch',
        padding: 14,
        marginBottom: 20,
        backgroundColor: 'transparent',
        fontSize: 20,
        borderColor: '#9e79c6',
        borderBottomWidth: 1.5,
        color: '#fff'
    }
})


