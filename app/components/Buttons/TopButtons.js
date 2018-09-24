import React, {PropTypes} from 'react'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import GLOBALS from '../../../assets/utils/Global'



export default class TopButtons extends React.Component {

    constructor(props) {
        super(props)
    }



    render() {
        return (
            <View style={styles.topButtons}>
                <View>
                    <TouchableOpacity onPress={this.props.action1} style={styles.topButton}>
                        <Text style={styles.buttonText}> Lashes </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={this.props.action2} style={styles.topButton}>
                        <Text style={styles.buttonText}> Nails </Text>
                    </TouchableOpacity>
                </View>
            </View>
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
    topButtons: {
        alignSelf: 'stretch',
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'center',     
    },
    topButton: {
        paddingHorizontal: 10
    },
    buttonText: {
        fontSize: 20
    }
})


