import React, {PropTypes} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import  FancyInputEdit  from './FancyInputEdit'


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
                <FancyInputEdit password={false} placeholder={this.props.toDisplay} placeholderColor='#a592b7' onChange={this.props.onChange} />
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
        height: 60,
        borderColor: '#9e79c6',
        borderBottomWidth: 1.5,
    },
    infoName: {
        color: '#9e79c6',
        fontSize: 20,
        fontWeight: 'bold'
    }
})


