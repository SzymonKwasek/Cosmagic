import React from 'react'
import { Modal, StyleSheet, Text, View} from 'react-native'


import Icon from 'react-native-vector-icons/FontAwesome';


export default class LogOutModal extends React.Component {



    constructor(props) {
        super(props)
    }




    render() {
        return (    

            <Modal visible={this.props.visible} transparent={true} onRequestClose={()=>{console.log('closed')}} >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText} onPress={this.props.onPressFirst} > <Icon name="sign-out" size={30} color="#fff" /> Sign Out</Text>
                    <Text style={styles.modalText} onPress={this.props.onPressSecond} > <Icon name="times" size={30} color="#fff" /> Close</Text>
                </View>
            </Modal>

        );
    }

}



const styles = StyleSheet.create({
    modalContainer: {
        marginTop: 200,
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,.8)',
        borderRadius: 20,
        width: 350,
        padding: 40
    },
    modalText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: "#fff",
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center'
    }
});
