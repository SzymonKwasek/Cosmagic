import React from 'react'
import { StyleSheet, View} from 'react-native'
import GLOBALS from '../../assets/utils/Global'

import Icon from 'react-native-vector-icons/FontAwesome';


export default class HeaderButton extends React.Component {


    render() {
        return (    

           <View style={styles.userPhoto}>
                <Icon  name="user" size={80} color={GLOBALS.COLOR.SECONDARY}/>
            </View>

        );
    }

}



const styles = StyleSheet.create({
    userPhoto: {
        backgroundColor: '#fff',
        borderRadius: 80,
        borderWidth: 3.5,
        borderColor: GLOBALS.COLOR.PRIMARY,
        height: 100,
        width: 100,
        margin: 20,
        position: 'absolute',
        top: 5,
        left: 15,
        zIndex: 99,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    userIcon: {

    }
});
