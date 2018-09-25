import React, {PropTypes} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FancyText } from '../'
import GLOBALS from '../../../assets/utils/Global'

export default class InfoTab extends React.Component {

    constructor(props) {
        super(props)
    }



    render() {
        return (
            <View style={styles.infoTab} > 
                <Text style={styles.infoName}>
                    {this.props.tabName}
                </Text>
                <FancyText style={styles.infoText} text={this.props.toDisplay}/>
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
    infoTab: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'space-around',
        marginTop: 10,
        marginBottom: 10,
        height: 60,
    },
    infoName: {
        color: GLOBALS.COLOR.PRIMARY,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5
    },
    infoText: {
        fontSize: 17,
        paddingLeft: 5,

    }
})


