import React from 'react'
import { Modal, StyleSheet, Text, View} from 'react-native'


import Icon from 'react-native-vector-icons/FontAwesome';


export default class MenuSlide extends React.Component {



    constructor(props) {
        super(props)
    }




    render() {
        return (    

            <View style={styles.menu}>
                    <Text style={styles.menuButton} onPress={this.props.onPressFirst} > <Icon name="sign-out" size={30} color="#fff" /> Sign Out</Text>
                    <Text style={styles.menuButton} onPress={this.props.onPressSecond} > <Icon name="times" size={30} color="#fff" /> Close</Text>
            </View>

        );
    }

}



const styles = StyleSheet.create({
    menu: {
        alignSelf: 'stretch',
        backgroundColor: 'rgba(0,0,0,.1)',
        height: 90,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: -99
    },
    menuButton: {
        padding: 5,
        fontSize: 20,
        marginBottom: 5
    }
});
