import React from 'react'
import { Modal, FlatList, StyleSheet, Text, View, Animated, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native'
import axios from 'axios'
import { connect } from 'react-redux'

import Icon from 'react-native-vector-icons/FontAwesome';

import ClientTab from '../components/ClientTab'
import FancyBackground from '../components/FancyBackground'
import HeaderButton from '../components/HeaderButton'

class Main extends React.Component {

    static navigationOptions = {
        header: null
      };

    constructor(props) {
        super(props)
        this.state = {
            modalToggle: false,
            clients : []
        }
    }

    componentDidMount() {
        this.props.clearTable()
        this.getAllClients()
    }

    toggleModal = () => {
        this.setState({
            modalToggle: !this.state.modalToggle
        })
    }

    getAllClients = async () => {
        this.setState({clients: []})
        const data = {
            userUUID: this.props.user.uuid
        }
        const response = await axios.post('http://10.0.2.2:8080/public/client/clients', data)
        if( response.data.response ) {
            const size = Object.keys(response.data.response).length
            const temp = []
            for( let i = 0; i < size; i++ ) {
                // if(this.props.clients) {
                //     this.props.addClients(this.props.clients, response.data.response[i])
                // } else {
                //     this.props.addClient(response.data.response[i])
                // }       
                temp.push(response.data.response[i])      
            }
            this.setState({clients: temp})
        }   
    }

    logout = () => {
        AsyncStorage.removeItem('user')
        this.toggleModal()
        this.props.navigation.push('Login')
    }

    render() {
        return (    
        <FancyBackground>

                <Modal visible={this.state.modalToggle} transparent={true} onRequestClose={()=>{console.log('closed')}} >
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText} onPress={this.logout} > <Icon name="sign-out" size={30} color="#fff" /> Sign Out</Text>
                        <Text style={styles.modalText} onPress={this.toggleModal} > <Icon name="times" size={30} color="#fff" /> Close</Text>
                    </View>
                </Modal>

                <ScrollView style={styles.scrollContainer}> 
                    <FlatList 
                        data={this.state.clients}
                        keyExtractor={(x) => x}
                        renderItem={({ item }) =>
                        <ClientTab data={item} onPress={() => this.props.navigation.navigate('Client', item)}/>
                        }/>          
                </ScrollView>

                <HeaderButton onPress={this.toggleModal} iconName='cog' iconColor='#fff' />

                <TouchableOpacity
                            style={styles.btn}
                            onPress={() => this.props.navigation.navigate('AddClient')}>
                            <Icon name="plus" size={40} color="#fff" />
                </TouchableOpacity>

        </FancyBackground>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return {
        addClients : (clients, client) => dispatch({type:'ADD_CLIENT', client, clients}),
        addClient : (client) => dispatch({type:'ADD_FIRST', client}),
        clearTable : () => dispatch({type: 'CLEAR_TABLE'})
    }
}

function mapStateToProps (state) {
    return {
        user: state.user,
        clients: state.clients
    }
}





export default connect(mapStateToProps, mapDispatchToProps)(Main)

const styles = StyleSheet.create({
    scrollContainer: {
        alignSelf: 'stretch'
    },
    btn: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        width: 80,
        height: 80,
        borderRadius: 40
    },
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
