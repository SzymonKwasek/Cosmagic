import React from 'react'
import { Modal, FlatList, StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native'
import axios from 'axios'
import { connect } from 'react-redux'
import ClientTab from './ClientTab'
import Icon from 'react-native-vector-icons/FontAwesome';

import bgImage from '../../assets/images/meduza.jpeg'

class Main extends React.Component {

    static navigationOptions = {
        header: null
      };

    constructor(props) {
        super(props)
        this.state = {
            modalToggle: false
        }
    }

    componentDidMount() {
        this.getAllClients()
    }

    toggleModal = () => {
        this.setState({
            modalToggle: !this.state.modalToggle
        })

    }

    getAllClients = async () => {
        const data = {
            userUUID: this.props.user.uuid
        }
        const response = await axios.post('http://10.0.2.2:8080/public/client/clients', data)
        if( response ) {
            const size = Object.keys(response.data.response).length
            for( let i = 0; i < size; i++ ) {
                if(this.props.clients) {
                    this.props.addClients(this.props.clients, response.data.response[i])
                } else {
                    this.props.addClient(response.data.response[i])
                }             
            }
        }   
    }

    logout = () => {
        AsyncStorage.removeItem('user')
        this.toggleModal()
        this.props.navigation.push('Login')
    }


  render() {
    return (    
      <ImageBackground style={styles.image} source={bgImage}>

            

            <Modal visible={this.state.modalToggle} transparent={true} onRequestClose={()=>{console.log('closed')}} >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText} onPress={this.logout} > <Icon name="sign-out" size={30} color="#fff" /> Sign Out</Text>
                    <Text style={styles.modalText} onPress={this.toggleModal} > <Icon name="times" size={30} color="#fff" /> Close</Text>
                </View>
            </Modal>

            <ScrollView style={styles.scrollContainer}> 
                <FlatList 
                    data={this.props.clients}
                    keyExtractor={(x) => x}
                    renderItem={({ item }) =>
                    <ClientTab data={item} onPress={() => this.props.navigation.navigate('Client', item)}/>}
                />
            
            </ScrollView>

            <TouchableOpacity style={styles.header} onPress={this.toggleModal}>
                <Text style={styles.headerText}> <Icon name="cog" size={30} color="#fff" /></Text>
            </TouchableOpacity>

            <TouchableOpacity
                        style={styles.btn}
                        onPress={() => this.props.navigation.navigate('AddClient')}>
                        <Icon name="plus" size={40} color="#fff" />
            </TouchableOpacity>

      </ImageBackground>
    );
  }

}

function mapDispatchToProps(dispatch) {
    return {
        addClients : (clients, client) => dispatch({type:'ADD_CLIENT', client, clients}),
        addClient : (client) => dispatch({type:'ADD_FIRST', client})
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
    image : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: null,
        height: null,
        paddingLeft: 20,
        paddingRight: 20,
    },
    header: {
        position: 'absolute',
        top: 0,
        right: 0,
        margin: 20
    },
    headerText: {
        color: 'white',
        fontSize: 14,
        alignSelf: 'flex-end'
    },
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
