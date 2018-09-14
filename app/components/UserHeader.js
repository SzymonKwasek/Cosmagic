import React from 'react'
import { StyleSheet, Text, View} from 'react-native'
import GLOBALS from '../../assets/utils/Global'

import Icon from 'react-native-vector-icons/FontAwesome';


export default class UserHeader extends React.Component {


    render() {
        return (    

           <View style={styles.container}>
                <Text style={styles.userTitle}> {this.props.userName} </Text>
            </View>

        );
    }

}



const styles = StyleSheet.create({
    container: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'stretch',
        height: 60,
        padding: 0,
        borderBottomWidth: 2.5,
        borderColor: GLOBALS.COLOR.SECONDARY,
        marginBottom: 20
    },
    userTitle: {
        fontSize: 23,
        color: GLOBALS.COLOR.TEXT,
        paddingLeft: 150,
        fontWeight: 'bold'
    }
});
