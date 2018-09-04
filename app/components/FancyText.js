import React, {PropTypes} from 'react'
import { StyleSheet, Text } from 'react-native'


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
        padding: 14,
        marginBottom: 20,
        backgroundColor: 'transparent',
        fontSize: 20,
        color: '#fff',
        height: 60,
    }
})


