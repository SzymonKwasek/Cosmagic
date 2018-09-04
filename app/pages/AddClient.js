import React from 'react'
import { FlatList, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native'
import axios from 'axios'
import { connect } from 'react-redux'


class AddClient extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            userUUID: this.props.user.uuid
        }

    }


    addClient = async () => {
        const response = await axios.post('http://10.0.2.2:8080/public/client', this.state)
        const data = {
            name: this.state.name
        }
        if(response) {
            this.props.addClients(this.props.clients, data)
            this.props.navigation.navigate('Main')
        }
    }


  render() {
    return (
        <View style={styles.container}>
            <Text style={styles.header}> Add Client </Text>

            <TextInput 
                style={styles.textInput} 
                placeholder="Name"
                onChangeText={ (name) =>this.setState({name}) }
                underlineColorAndroid='transparent'/>

            <TouchableOpacity
                style={styles.btn}
                onPress={this.addClient}>
                <Text> Add </Text>
            </TouchableOpacity>
        </View>
    );
  }

}

function mapStateToProps (state) {
    return {
        user: state.user,
        clients: state.clients
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addClients : (clients, client) => dispatch({type:'ADD_CLIENT', clients, client})
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(AddClient)

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2896d3',
        paddingLeft: 40,
        paddingRight: 40
    },
    header: {
        fontSize: 24,
        marginBottom: 60,
        color: '#fff',
        fontWeight: 'bold'
    },
    textInput: {
        alignSelf: 'stretch',
        padding: 16,
        marginBottom: 20,
        backgroundColor: '#fff'
    },
    btn: {
        alignSelf: 'stretch',
        backgroundColor: '#01c853',
        padding: 20,
        alignItems: 'center'
    }
})