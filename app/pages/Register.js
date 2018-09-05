import React from 'react'
import  axios  from 'axios'
import { sha512 } from 'js-sha512'
import { AsyncStorage } from 'react-native'

import FancyBackground from '../components/FancyBackground'
import FancyInput from '../components/FancyInput'
import FancyButton from '../components/FancyButton'
import FancyHeader from '../components/FancyHeader'

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
            <FancyBackground>
                
                <FancyHeader headerText='Register' />

                <FancyInput placeholder='Name' placeholderColor="#a592b7" onChange={ (name) => this.setState({name}) } password={false} />
                <FancyInput placeholder='Email' placeholderColor="#a592b7" onChange={ (email) => this.setState({email}) } password={false} />
                <FancyInput placeholder='Password' placeholderColor="#a592b7" onChange={ (password) => this.setState({password}) } password={true} />
                <FancyInput placeholder='Repeat Password' placeholderColor="#a592b7" onChange={ (password_confirmation) => this.setState({password_confirmation}) } password={true} />

                <FancyButton btnText='Register' action={this.onRegisterPressed.bind(this)} />

            </FancyBackground>
        );
    }

}


