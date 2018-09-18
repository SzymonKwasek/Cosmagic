import React from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { StackActions } from 'react-navigation'
import firebase from 'react-native-firebase'


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
        this.ref = firebase.firestore().collection('clients');
        this.state = {
            applicationDate: data.applicationDate,
            lashName: data.lashName,
            lashType: data.lashType,
            size: data.size,
        }
    }

    goBackFunction() {
        const reset = StackActions.pop({
            n: 1
        })
        return reset
    }

    editClient = () => {
        const data = this.props.navigation.state.params
        this.ref.doc(data.id).update(this.state)
        .then( () => {
            this.props.navigation.dispatch(this.goBackFunction())
        })
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

                <FancyButton action={this.editClient} btnText='Apply' />

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
