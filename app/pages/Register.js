import React from 'react'
import { sha512 } from 'js-sha512'
import { AsyncStorage } from 'react-native'

import { FancyBackground, FancyInput, FancyButton, FancyHeader } from '../components'

import firebase from 'react-native-firebase'



export default class Register extends React.Component {

    static navigationOptions = {
        header: null
      };

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

    signUp = () => {

        
        try {
            if(this.state.password.length < 2){
                alert('Please enter atleast 2 characters')
                return
            }
            firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
            .then( res => {
                console.log(res)
                this.props.navigation.navigate('Login')
            })
            .catch( err => {
                alert(err)
            })
        }
        catch (error) {
            console.log(error)
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
            <FancyBackground>
                
                <FancyHeader headerText='Register' />

                <FancyInput placeholder='Name' placeholderColor="#a592b7" onChange={ (name) => this.setState({name}) } password={false} />
                <FancyInput placeholder='Email' placeholderColor="#a592b7" onChange={ (email) => this.setState({email}) } password={false} />
                <FancyInput placeholder='Password' placeholderColor="#a592b7" onChange={ (password) => this.setState({password}) } password={true} />
                <FancyInput placeholder='Repeat Password' placeholderColor="#a592b7" onChange={ (password_confirmation) => this.setState({password_confirmation}) } password={true} />

                <FancyButton btnText='Register' action={() => this.signUp()} />

            </FancyBackground>
        );
    }

}


