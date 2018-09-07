import React from 'react'
import { ScrollView, StyleSheet, Modal, View, Text } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';

import axios from 'axios'

import { InfoTab, FancyButton, FancyHeader, FancyBackground, HeaderButton } from '../components'


export default class Client extends React.Component {

    static navigationOptions = {
        header: null
      };

    constructor(props) {
        super(props)
        this.state = {
            modalToggle : false
        }
    }

    toggleModal = () => {
        this.setState({
            modalToggle: !this.state.modalToggle
        })
    }

    delete = async () => {
        const prop = this.props.navigation.state.params
        const response = await axios.delete('http://10.0.2.2:8080/public/client/'+prop.uuid)
        if( response.data.response ) {
            this.toggleModal()
            this.props.navigation.push('Main')
        }
    }


    render() {
        const data = this.props.navigation.state.params
        return (
            <FancyBackground>

                <Modal visible={this.state.modalToggle} transparent={true} onRequestClose={()=>{console.log('closed')}} >
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}> Are you sure ? </Text>
                        <Text style={styles.modalText} onPress={this.delete} > <Icon name="trash" size={30} color="#fff" /> Delete!</Text>
                        <Text style={styles.modalText} onPress={this.toggleModal} > <Icon name="times" size={30} color="#fff" /> Close</Text>
                    </View>
                </Modal>

                <FancyHeader headerText={data.name} />

                <ScrollView style={{alignSelf: 'stretch'}}>
                    <InfoTab toDisplay={data.applicationDate} tabName='Data aplikacji: '/>
                    <InfoTab toDisplay={data.lashName} tabName='Nazwa rzęs: '/>
                    <InfoTab toDisplay={data.lashType} tabName='Skręt:  '/>
                    <InfoTab toDisplay={data.size} tabName='Grubość: '/>
                </ScrollView>

                <HeaderButton onPress={this.toggleModal} iconName='trash' iconColor='#a8555e'/>

                <FancyButton action={() => this.props.navigation.navigate('EditClient', data)} btnText='Edit' />

            </FancyBackground>
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


