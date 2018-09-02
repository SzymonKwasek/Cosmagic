import React from 'react'
import { FlatList, StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native'
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
    }

    componentDidMount() {
        this.getAllClients()
    }


    getAllClients = async () => {
        const data = {
            userUUID: this.props.user.uuid
        }
        const response = await axios.post('http://10.0.2.2:8080/public/client/clients', data)
        if( response ) {
            const size = Object.keys(response.data.response).length
            for( let i = 0; i < size;i++) {
                if(this.props.clients) {
                    this.props.addClients(this.props.clients, response.data.response[i])
                } else {
                    this.props.addClient(response.data.response[i])
                }             
            }
            console.log(this.props.clients)
            console.log(this.props.user)
        }   
    }

    logout = () => {
        AsyncStorage.removeItem('user')
        this.props.navigation.push('Login')
    }


  render() {
    return (
      <ImageBackground style={styles.image} source={bgImage}>

            <View style={styles.header}>
                <Text style={styles.headerText} onPress={this.logout} > <Icon name="rocket" size={30} color="#900" /></Text>
            </View>
            <ScrollView style={styles.scrollContainer}> 
                <FlatList 
                    data={this.props.clients}
                    keyExtractor={(x) => x}
                    renderItem={({ item }) =>
                    <ClientTab data={item} onPress={() => this.props.navigation.navigate('Client', item)}/>}
                />
            
            </ScrollView>
            <TouchableOpacity
                        style={styles.btn}
                        onPress={() => this.props.navigation.navigate('AddClient')}>
                        <Text style={styles.btnText}> + </Text>
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
        backgroundColor: 'rgba(0,0,0,0)',
        justifyContent: 'center',
        alignSelf: 'stretch',
        height: 40
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
        backgroundColor: '#01c853',
        padding: 40,
        margin: 20,
        width: 40,
        height: 40,
        borderRadius: 40
    },
    btnText: {
        color: '#fff',
        fontSize: 60,
        fontWeight: 'bold'
    }
});
