import React, {PropTypes} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import  FancyInputEdit  from './FancyInputEdit'
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
                <FancyInputEdit password={false} datepicker={this.props.datepicker} placeholder={this.props.toDisplay} placeholderColor='#a592b7' onChange={this.props.onChange} />
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


