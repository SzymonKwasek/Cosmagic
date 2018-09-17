import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { StackActions, NavigationActions } from 'react-navigation'

import { FancyButton, FancyInput, FancyHeader, FancyBackground } from '../components'

import firebase from 'react-native-firebase'

class AddClient extends React.Component {

    static navigationOptions = {
        header: null
      };

    constructor(props) {
        super(props)
        this.ref = firebase.firestore().collection('clients')
        this.state = {
            name: '',
            userUUID: this.props.user.uuid,
            cosType: this.props.navigation.state.params
        }

    }

    goBackFunction(data) {
        const reset = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'Main', params: data})
            ]
        })
        return reset
    }

    addClient = async () => {
        const response = await axios.post('http://10.0.2.2:8080/public/client', this.state)

        if(response) {
            this.props.navigation.dispatch(this.goBackFunction(this.props.navigation.state.params))
        }
    }

    addNewClient = async () => {
        const response = await this.ref.add({
            name: this.state.name,
            userUUID: this.props.user.uid,
            cosType: this.props.navigation.state.params
        })
        if (response) this.props.navigation.dispatch(this.goBackFunction(this.props.navigation.state.params))
    }


  render() {
    return (
        <FancyBackground>
            <FancyHeader headerText='Add Client' />

            <FancyInput placeholder='Name' placeholderColor='#fff' onChange = {(name) => this.setState({name})} password={false}/>

            <FancyButton action={this.addNewClient} btnText='Add'/>
        </FancyBackground>
    );
  }

}

function mapStateToProps (state) {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(AddClient)
