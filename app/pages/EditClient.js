import React from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { StackActions } from 'react-navigation'
import firebase from 'react-native-firebase'

import { InfoTabEdit, FancyButton, FancyHeader, FancyBackground, Loading } from '../components'


class EditClient extends React.Component {

    static navigationOptions = {
        header: null
      };

    constructor(props) {
        super(props)
        const data = this.props.navigation.state.params
        this.ref = firebase.firestore().collection('clients');
        this.state = {
            client: {
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
            },          
            indicator: false
        }
    }
    editClient = () => {
        this.setState({ indicator: true })
        const data = this.props.navigation.state.params
        this.ref.doc(data.id).update(this.state.client)
        .then( () => {
            this.props.navigation.pop()
        })
    }



render() {
    const data = this.props.navigation.state.params
    return (
        <FancyBackground>

                <FancyHeader headerText={data.name} />

                <ScrollView style={{alignSelf: 'stretch'}}>
                    <InfoTabEdit toDisplay={data.lastApplication} tabName='Data aplikacji: ' datepicker={true} onChange={ (lastApplication) => this.setState({client: {lastApplication}}) } />
                    <InfoTabEdit toDisplay={data.nextApplication} tabName='Data aplikacji: ' datepicker={true} onChange={ (nextApplication) => this.setState({client: {nextApplication}}) } />
                    <InfoTabEdit toDisplay={data.lashName} tabName='Nazwa rzęs: ' onChange={ (lashName) => this.setState({client: {lashName}}) } />
                    <InfoTabEdit toDisplay={data.lashType} tabName='Skręt:  ' onChange={ (lashType) => this.setState({client: {lashType}}) } />
                    <InfoTabEdit toDisplay={data.size} tabName='Grubość: ' onChange={ (size) => this.setState({client: {size}}) } />
                    <InfoTabEdit toDisplay={data.length} tabName='Długość: ' onChange={ (length) => this.setState({client: {length}}) } />
                    <InfoTabEdit toDisplay={data.method} tabName='Metoda: ' onChange={ (method) => this.setState({client: {method}}) } />
                    <InfoTabEdit toDisplay={data.glue} tabName='Klej: ' onChange={ (glue) => this.setState({client: {glue}}) } />
                    <InfoTabEdit toDisplay={data.style} tabName='Styl: ' onChange={ (style) => this.setState({client: {style}}) } />
                    <InfoTabEdit toDisplay={data.notes} tabName='Uwagi: ' onChange={ (notes) => this.setState({client: {notes}}) } />
                </ScrollView>

                <FancyButton action={this.editClient} btnText='Apply' />
                <Loading animating={this.state.indicator} />
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
