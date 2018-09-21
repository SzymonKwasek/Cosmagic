import React from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { StackActions } from 'react-navigation'
import firebase from 'react-native-firebase'

import { InfoTabEdit, FancyButton, FancyHeader, FancyBackground } from '../components'


class EditClient extends React.Component {

    static navigationOptions = {
        header: null
      };

    constructor(props) {
        super(props)
        const data = this.props.navigation.state.params
        this.ref = firebase.firestore().collection('clients');
        this.state = {
            lastApplication: data.lastApplication,
            nextApplication: data.nextApplication,
            lashName: data.lashName,
            lashType: data.lashType,
            size: data.size,
            length: data.length,
            method: data.method,
            glue: data.glue,
            style: data.style,
            notes: data.notes,
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
    console.log(data)
    return (
        <FancyBackground>

                <FancyHeader headerText={data.name} />

                <ScrollView style={{alignSelf: 'stretch'}}>
                    <InfoTabEdit toDisplay={data.lastApplication} tabName='Data aplikacji: ' datepicker={true} onChange={ (lastApplication) => this.setState({lastApplication}) } />
                    <InfoTabEdit toDisplay={data.nextApplication} tabName='Data aplikacji: ' datepicker={true} onChange={ (nextApplication) => this.setState({nextApplication}) } />
                    <InfoTabEdit toDisplay={data.lashName} tabName='Nazwa rzęs: ' onChange={ (lashName) => this.setState({lashName}) } />
                    <InfoTabEdit toDisplay={data.lashType} tabName='Skręt:  ' onChange={ (lashType) => this.setState({lashType}) } />
                    <InfoTabEdit toDisplay={data.size} tabName='Grubość: ' onChange={ (size) => this.setState({size}) } />
                    <InfoTabEdit toDisplay={data.length} tabName='Długość: ' onChange={ (length) => this.setState({length}) } />
                    <InfoTabEdit toDisplay={data.method} tabName='Metoda: ' onChange={ (method) => this.setState({method}) } />
                    <InfoTabEdit toDisplay={data.glue} tabName='Klej: ' onChange={ (glue) => this.setState({glue}) } />
                    <InfoTabEdit toDisplay={data.style} tabName='Styl: ' onChange={ (style) => this.setState({style}) } />
                    <InfoTabEdit toDisplay={data.notes} tabName='Uwagi: ' onChange={ (notes) => this.setState({notes}) } />
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
