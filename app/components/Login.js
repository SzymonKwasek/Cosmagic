import React from 'react'
import { StyleSheet, TextInput, Text, View, KeyboardAvoidingView, TouchableOpacity, AsyncStorage } from 'react-native'
import Main from './Main'
import { sha512 } from 'js-sha512'
import axios from 'axios'
import { connect } from 'react-redux'

class Login extends React.Component {
    static navigationOptions = {
        title: 'Login',
        headerLeft: null,
      };
      
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }
    componentDidMount() {
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {

        let value = await AsyncStorage.getItem('user');
        if( value !== null) {
            this.props.navigation.navigate('Main');
        }
    }

    login = async () => {

        const password = sha512(this.state.password)

        const data = {
            email: this.state.email,
            password: password
        }
        const response = await axios.post('http://10.0.2.2:8080/public/user/login',
            data)
        if(response) {
            AsyncStorage.setItem('user', response.data.response)
            this.props.setUser(response.data.response)
            this.props.navigation.navigate('Main')
        } else {
            alert('User does not exist!')
        }
    }


    render() {
        return (
        <View style={styles.container}>
            <Text style={styles.header}> LOGIN </Text>

            <TextInput 
                style={styles.textInput} 
                placeholder="Email"
                onChangeText={ (email) =>this.setState({email}) }
                underlineColorAndroid='transparent'/>

            <TextInput 
                style={styles.textInput} 
                placeholder="Password"
                onChangeText={ (password) =>this.setState({password}) }
                secureTextEntry={true}
                underlineColorAndroid='transparent'/>

            <TouchableOpacity
                style={styles.btn}
                onPress={this.login}>
                <Text> Login </Text>
            </TouchableOpacity>
        </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setUser : (user) => dispatch({type:'SET_USER', user})
    }
}

function mapStateToProps (state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

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


