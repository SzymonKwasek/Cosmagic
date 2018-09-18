import React from 'react'
import { ScrollView, StyleSheet, Animated } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import firebase from 'react-native-firebase'

import Icon from 'react-native-vector-icons/FontAwesome';
import { InfoTab, FancyButton, FancyHeader, FancyBackground, HeaderButton, MenuSlide } from '../components'


export default class Client extends React.Component {

    static navigationOptions = {
        header: null
      };
      
    constructor(props) {
        super(props)
        this.ref = firebase.firestore().collection('clients').doc(this.props.navigation.state.params.id);
        this.unsubscribe = null;
        this.state = {
            modalToggle : true,
            client: {},
            menu: {
                height: new Animated.Value(0),
                top: new Animated.Value(0),
                opacity: new Animated.Value(0)
            }
        }
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.getClient)
    }

    getClient = (querySnapshot) => {
        const id = this.props.navigation.state.params.id
        const client = {...querySnapshot.data(), id}
        this.setState({client})
    }

    animationHandler = (a, b, c) => {
        const timing = Animated.timing
        Animated.parallel([
            timing(this.state.menu.height, {
                toValue: a,
                duration: 300
            }),
            timing(this.state.menu.top, {
                toValue: b,
                duration: 300
            }),
            timing(this.state.menu.opacity, {
                toValue: c,
                duration: 300
            })
        ]).start()
    }

    openMenu = () => {
        
        if(this.state.modalToggle) {
            this.animationHandler(90, 0, 1)
        } else {
            this.animationHandler(0, 0, 0)
        }
        console.log(this.state.menu)
    }

    toggleModal = () => {
        this.setState({
            modalToggle: !this.state.modalToggle
        })
        this.openMenu()
    }

    resetAction (data) {
        const reset = StackActions.reset({
            index: 1,
            actions: [
                NavigationActions.navigate({routeName:'Menu'}),
                NavigationActions.navigate({routeName: 'Main', params: data}),
            ]
        })
        return reset
    }


    deleteClient = () => {
        this.ref.delete()
        this.toggleModal()
        this.props.navigation.dispatch(this.resetAction(this.props.navigation.state.params))
    }


    render() {
        const data = this.state.client
        return (
            <FancyBackground>              
                <FancyHeader headerText={data.name} />

                <Animated.View style={{ alignSelf: 'stretch', position: 'relative', height: this.state.menu.height, top: this.state.menu.top, opacity: this.state.menu.opacity}}>
                    <MenuSlide  onPressFirst={this.deleteClient} onPressSecond={this.toggleModal} icon='trash' text='Delete' />
                </Animated.View>

                <ScrollView style={{alignSelf: 'stretch', flex: 1}}>
                    <InfoTab toDisplay={data.applicationDate} tabName='Data aplikacji: '/>
                    <InfoTab toDisplay={data.lashName} tabName='Nazwa rzęs: '/>
                    <InfoTab toDisplay={data.lashType} tabName='Skręt:  '/>
                    <InfoTab toDisplay={data.size} tabName='Grubość: '/>
                </ScrollView>

                <HeaderButton onPress={this.toggleModal} iconName='trash' iconColor='#a8555e'/>

                <FancyButton action={() => this.props.navigation.push('EditClient', this.ref)} btnText='Edit' />

            </FancyBackground>
        );
    }
}



