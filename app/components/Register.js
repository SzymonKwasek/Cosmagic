import React from 'react'
import  axios  from 'axios'
import { sha512 } from 'js-sha512'
import { StyleSheet, TextInput, Text, View, TouchableHighlight, AsyncStorage } from 'react-native'


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
        return true
    }

    async onRegisterPressed() {

        this.formValidator()
       
        if(!this.formValidator) {
            return
        }
        
        const password = sha512(this.state.password)
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: password
        }
        const response = await axios.post('http://10.0.2.2:8080/public/user/new', data)
        console.log(response)
        this.props.navigation.navigate('Login')
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
                <View style={styles.container}>
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
                    
                    <TouchableHighlight style={styles.button} onPress={this.onRegisterPressed.bind(this)}>
                        <Text style={styles.buttonText}> Register </Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.button} onPress={ () => this.props.navigation.navigate('Login')}>
                        <Text style={styles.buttonText}> Already Registered ! </Text>
                    </TouchableHighlight>

                </View>
        );
    }

}

const styles = StyleSheet.create({
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
    button: {
        alignSelf: 'stretch',
        padding: 10,
        marginTop: 10,
        backgroundColor: '#fff'
    },
    buttonText: {
        alignSelf: 'center',
        fontSize: 16
    }
})


