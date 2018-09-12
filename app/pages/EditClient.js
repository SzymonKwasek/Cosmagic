import React from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import { StackActions, NavigationActions } from 'react-navigation'


import InfoTabEdit from '../components/InfoTabEdit'
import FancyButton from '../components/FancyButton'
import FancyHeader from '../components/FancyHeader'
import FancyBackground from '../components/FancyBackground'


class EditClient extends React.Component {

    static navigationOptions = {
        header: null
      };

    constructor(props) {
        super(props)
        const data = this.props.navigation.state.params
        this.state = {
            applicationDate: data.applicationDate,
            lashName: data.lashName,
            lashType: data.lashType,
            size: data.size,
            uuid: data.uuid
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

    edit = async () => {
        const response = await axios.put('http://10.0.2.2:8080/public/client',
            this.state)
        if(response.data.response) {
            alert('Client edited successfully !')
            this.props.navigation.dispatch(this.goBackFunction(this.props.navigation.state.params))
        } else {
            alert('Something went wrong !')
        }
    }



render() {
    const data = this.props.navigation.state.params
    return (
        <FancyBackground>

                <FancyHeader headerText={data.name} />

                <ScrollView style={{alignSelf: 'stretch'}}>
                    <InfoTabEdit toDisplay={data.applicationDate} tabName='Data aplikacji: ' datepicker={true} onChange={ (applicationDate) => this.setState({applicationDate}) } />
                    <InfoTabEdit toDisplay={data.lashName} tabName='Nazwa rzęs: ' onChange={ (lashName) => this.setState({lashName}) } />
                    <InfoTabEdit toDisplay={data.lashType} tabName='Skręt:  ' onChange={ (lashType) => this.setState({lashType}) } />
                    <InfoTabEdit toDisplay={data.size} tabName='Grubość: ' onChange={ (size) => this.setState({size}) } />
                </ScrollView>

                <FancyButton action={this.edit} btnText='Apply' />

        </FancyBackground>
    );
}

}

function mapStateToProps (state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(EditClient)
