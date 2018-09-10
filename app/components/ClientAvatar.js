import React from 'react'
import { StyleSheet, View} from 'react-native'
import GLOBALS from '../../assets/utils/Global'

import Icon from 'react-native-vector-icons/FontAwesome';


export default class HeaderButton extends React.Component {


    render() {
        return (    

            <View style={styles.photo}>
                <Icon  name="eye" size={50} color={GLOBALS.COLOR.SECONDARY} />
            </View>

        );
    }

}



const styles = StyleSheet.create({
    photo: {
        backgroundColor: 'transparent',
        borderRadius: 40,
        borderWidth: 2,
        borderColor: GLOBALS.COLOR.PRIMARY,
        height: 80,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
