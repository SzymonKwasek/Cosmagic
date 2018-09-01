import React from 'react'
import { FlatList, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native'
import axios from 'axios'
import { connect } from 'react-redux'
import ClientTab from './ClientTab'


class Main extends React.Component {

    static navigationOptions = {
        title: 'Main',
        headerLeft: null,
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
      <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.headerText}> Shadow Of Lashess </Text>
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
                        <Text> Add </Text>
            </TouchableOpacity>

            <TouchableOpacity
                        style={styles.btn}
                        onPress={this.logout}>
                        <Text> Logout </Text>
            </TouchableOpacity>
      </View>
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
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#ddcc85',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 10,
        borderBottomColor: '#d6bf5e'
    },
    headerText: {
        color: 'white',
        fontSize: 24,
        padding: 26,
        fontWeight: 'bold'
    },
    btn: {
        alignSelf: 'stretch',
        backgroundColor: '#01c853',
        padding: 20,
        alignItems: 'center'
        }
});
