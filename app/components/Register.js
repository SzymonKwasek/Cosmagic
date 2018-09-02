import React from 'react'
import  axios  from 'axios'
import { sha512 } from 'js-sha512'
import { Image, ImageBackground, StyleSheet, TextInput, Text, View, TouchableHighlight, AsyncStorage } from 'react-native'

import bgImage from '../../assets/images/meduza.jpeg'
// import appIcon from '../../assets/images/eye.png'

export default class Register extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            errors: []
        }
    }


    formValidator () {
        const reg =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if(!this.state.name) {
            alert('Fill in Name field !')
            return false
        }
        if(!this.state.email) {
            alert('Fill in Email field !')
            return false
        }
        if(!reg.test(this.state.email)) {
            alert('Email is not correct !')
            return false
        }
        if(!this.state.password) {
            alert('Fill in Password field !')
            return false
        }
        if(!this.state.password_confirmation) {
            alert('Fill in Repeat Password field !')
            return false
        }
        if(this.state.password !== this.state.password_confirmation) {
            alert("Passwords must match !")
            return false
        }
        return true;
    }

    async onRegisterPressed() {
       
        if(!this.formValidator()) {
            return
        }
        
        const password = sha512(this.state.password)
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: password
        }
        const response = await axios.post('http://10.0.2.2:8080/public/user/new', data)
        if(response.data.response) {
            this.props.navigation.navigate('Login')
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


    render() {
        return (
                <ImageBackground style={styles.image} source={bgImage}>
                    <Text style={styles.header}> Register </Text>

                    <TextInput 
                        style={styles.textInput} 
                        placeholder="Name"
                        onChangeText={ (name) =>this.setState({name}) }
                        underlineColorAndroid='transparent'/>

                    <TextInput 
                        style={styles.textInput} 
                        placeholder="Email"
                        onChangeText={ (email) =>this.setState({email}) }
                        underlineColorAndroid='transparent'/>

                    <TextInput 
                        style={styles.textInput} 
                        placeholder="Password"
                        onChangeText={ (password) => this.setState({password}) }
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'/>

                    <TextInput 
                        style={styles.textInput} 
                        placeholder="Repeat Password"
                        onChangeText={ (password_confirmation) => this.setState({password_confirmation}) }
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'/>
                    
                    <TouchableHighlight style={styles.btn} onPress={this.onRegisterPressed.bind(this)}>
                        <Text style={styles.btnText}> Register </Text>
                    </TouchableHighlight>

                </ImageBackground>
        );
    }

}

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
    }
})


