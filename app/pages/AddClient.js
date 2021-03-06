import React from 'react'
import { connect } from 'react-redux'
import { StackActions } from 'react-navigation'

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
        const reset = StackActions.pop({
            n:1
        })
        return reset
    }


    addNewClient = async () => {
        const response = await this.ref.add({
            name: this.state.name,
            userUUID: this.props.user.uid,
            cosType: this.props.navigation.state.params
        })
        if (response) this.props.navigation.pop()
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
