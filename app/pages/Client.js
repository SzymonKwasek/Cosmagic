import React from 'react'
import { ScrollView, Animated } from 'react-native'
import firebase from 'react-native-firebase'

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
    }

    toggleModal = () => {
        this.setState({
            modalToggle: !this.state.modalToggle
        })
        this.openMenu()
    }

    deleteClient = () => {
        this.ref.delete()
        this.toggleModal()
        this.props.navigation.pop()
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
                    <InfoTab toDisplay={data.lastApplication} tabName='Poprzednia stylizacja: '/>
                    <InfoTab toDisplay={data.nextApplication} tabName='Następna stylizacja: '/>
                    <InfoTab toDisplay={data.lashName} tabName='Nazwa rzęs: '/>
                    <InfoTab toDisplay={data.lashType} tabName='Skręt:  '/>
                    <InfoTab toDisplay={data.size} tabName='Grubość: '/>
                    <InfoTab toDisplay={data.length} tabName='Długość: '/>
                    <InfoTab toDisplay={data.method} tabName='Metoda: '/>
                    <InfoTab toDisplay={data.glue} tabName='Klej: '/>
                    <InfoTab toDisplay={data.style} tabName='Styl: '/>
                    <InfoTab toDisplay={data.notes} tabName='Uwagi: '/>

                </ScrollView>

                <HeaderButton onPress={this.toggleModal} iconName='trash' iconColor='#a8555e'/>

                <FancyButton action={() => this.props.navigation.push('EditClient', data)} btnText='Edit' />

            </FancyBackground>
        );
    }
}



