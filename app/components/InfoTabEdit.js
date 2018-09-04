import React, {PropTypes} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import  FancyInput  from './FancyInput'


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
                <FancyInput password={false} placeholder={this.props.toDisplay} placeholderColor='#fff' onChange={this.props.onChange} />
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
        borderColor: '#9e79c6',
        borderBottomWidth: 1.5,
    },
    infoName: {
        color: '#9e79c6',
        fontSize: 20,
        fontWeight: 'bold'
    }
})


