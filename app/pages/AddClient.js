import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import FancyButton from '../components/FancyButton'
import FancyInput from '../components/FancyInput'
import FancyHeader from '../components/FancyHeader'
import FancyBackground from '../components/FancyBackground'



class AddClient extends React.Component {

    static navigationOptions = {
        header: null
      };

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
            this.props.navigation.push('Main')
        }
    }


  render() {
    return (
        <FancyBackground>
            <FancyHeader headerText='Add Client' />

            <FancyInput placeholder='Name' placeholderColor='#fff' onChange = {(name) => this.setState({name})} password={false}/>

            <FancyButton action={this.addClient} btnText='Add'/>
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
