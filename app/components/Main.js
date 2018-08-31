import React from 'react'
import { FlatList, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native'
import axios from 'axios'
import { connect } from 'react-redux'


class Main extends React.Component {

    static navigationOptions = {
        title: 'Main',
        headerLeft: null,
      };

    constructor(props) {
        super(props)
        this.state = {
            clients: []
        }
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
            console.log(response)
            const temp = []
            const size = Object.keys(response.data.response).length
            for( let i = 0; i < size;i++) {
                temp.push(response.data.response[i])
            }
            this.setState({clients: temp})
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
                    data={this.state.clients}
                    keyExtractor={(x) => x}
                    renderItem={({ item }) =>
                    <Text>
                        {item.name}
                    </Text>}
                />
            
            </ScrollView>
            
            <View style={styles.footer}>
                <TextInput
                    style={styles.TextInput}
                    placeholder='>note'
                    placeholderTextColor='white'
                    underlineColorAndroid='transparent'/>
            </View>
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

function mapStateToProps (state) {
    return {
        user: state.user
    }
}



export default connect(mapStateToProps)(Main)

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
