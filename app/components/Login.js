import React from 'react'
import { Image, ImageBackground, StyleSheet, TextInput, Text, View, TouchableHighlight, TouchableOpacity, AsyncStorage } from 'react-native'
import { sha512 } from 'js-sha512'
import axios from 'axios'
import { connect } from 'react-redux'

import bgImage from '../../assets/images/meduza.jpeg'
import appIcon from '../../assets/images/eye.png'

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
    formValidator () {
        if(!this.state.email) {
            alert('Fill in Email field !')
            return false
        }
        if(!this.state.password) {
            alert('Fill in Password field !')
            return false
        }
        return true;
    }

    _loadInitialState = async () => {

        let value = await AsyncStorage.getItem('user');
        if( value !== null) {
            this.props.navigation.navigate('Main');
        }
    }

    login = async () => {

        if(!this.formValidator()) {
            return
        }

        const password = sha512(this.state.password)

        const data = {
            email: this.state.email,
            password: password
        }
        const response = await axios.post('http://10.0.2.2:8080/public/user/login',
            data)
        if(response.data.response) {
            AsyncStorage.setItem('user', response.data.response)
            this.props.setUser(response.data.response)
            this.props.navigation.navigate('Main')
        } else {
            alert('User does not exist!')
        }
    }


    render() {
        return (
            <ImageBackground style={styles.image} source={bgImage}>
                {/* <Text style={styles.header}> Shadow of Lashes</Text> */}
                <Image style={styles.appIcon} source={appIcon}/>
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
                    <Text style={styles.btnText}> Login </Text>
                </TouchableOpacity>

                <Text style={styles.bottomText}>
                    Don't have an account ? {'\n'}
                    <Text onPress={() => this.props.navigation.navigate('Register')} style={styles.linkText}>Sign up</Text> now !
                </Text>
            </ImageBackground>
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
    header: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold'
    },
    textInput: {
        alignSelf: 'stretch',
        padding: 14,
        marginBottom: 20,
        backgroundColor: '#fff',
        opacity: .8,
        borderRadius: 25,
        textAlign: 'center',
        fontSize: 16
    },
    btn: {
        alignSelf: 'stretch',
        backgroundColor: 'transparent',
        padding: 18,      
        borderRadius: 30,
        borderColor: '#9e79c6',
        borderWidth: 1.5,
        alignItems: 'center'
    },
    btnText: {
        fontSize: 22,
        color: '#fff',
        fontWeight: 'bold'
    },
    bottomText: {
        color: '#fff',
        textAlign: 'center'
    },
    linkText: {
        color: '#90b1e5',
    },
    image: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: null,
        height: null,
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 20,
        paddingBottom: 20
    },
    appIcon: {
        paddingTop: 20,
        alignSelf: 'center',
        marginBottom: 80

    }
})


