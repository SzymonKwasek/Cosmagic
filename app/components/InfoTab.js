import React, {PropTypes} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import  FancyText  from './FancyText'
import GLOBALS from '../../assets/utils/Global'

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
                <FancyText text={this.props.toDisplay}/>
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
        flex: 0,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
        height: 60,
        borderColor: GLOBALS.COLOR.PRIMARY,
        borderBottomWidth: 1.5,
    },
    infoName: {
        color: GLOBALS.COLOR.PRIMARY,
        fontSize: 20,
        fontWeight: 'bold'
    }
})


