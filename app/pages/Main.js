import React from 'react'
import { StyleSheet, ScrollView, AsyncStorage, Animated, View } from 'react-native'
import axios from 'axios'
import { connect } from 'react-redux'
import { BackHandler} from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import GLOBALS from '../../assets/utils/Global'

import { UserHeader, UserAvatar, ClientTab, FancyBackground, HeaderButton, AddButton, MenuSlide } from '../components'

class Main extends React.Component {

    static navigationOptions = {
        header: null
      };

    constructor(props) {
        super(props)
        this.state = {
            modalToggle: true,
            clients : [],
            menu: {
                height: new Animated.Value(0),
                top: new Animated.Value(0),
                opacity: new Animated.Value(0)
            }
        }
        this.lastBackButtonPress = null
    }

    componentDidMount() {   
        if(this.props.navigation.isFocused()) {
            this.getAllClients()
        }
    }

    componentWillUnmount() {
        const reset = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'Main'}),
            ]
        })
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.dispatch(reset)
        })
    }


    
    resetAction(route, data) {
        const reset = StackActions.reset({
            index: 1,
            actions: [
                NavigationActions.navigate({routeName: 'Main'}),
                NavigationActions.navigate({routeName: route, params: data})
            ]
        })
        return reset
    }


    toggleModal = () => {
        this.setState({
            modalToggle: !this.state.modalToggle
        })
        this.openMenu()
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

    getAllClients = async () => {
        this.setState({clients: []})
        const type = this.props.navigation.state.params
        const data = {
            userUUID: this.props.user.uuid,
            cosType: type
        }
        const response = await axios.post('http://10.0.2.2:8080/public/client/clients', data)
        if( response.data.response ) {
            const size = Object.keys(response.data.response).length
            const temp = []
            for( let i = 0; i < size; i++ ) {     
                temp.push(response.data.response[i])      
            }
            this.setState({clients: temp})
        }   
    }

    logout = () => {
        AsyncStorage.removeItem('user')
        this.toggleModal()
        this.props.navigation.dispatch(this.resetAction('Login', null))
    }

    render() {
        const clientList = this.state.clients.map((item, x) => {
            const data = {...this.props.navigation.state.params, ...item}
            return(
                <ClientTab data={item} key={x} onPress={() => this.props.navigation.dispatch(this.resetAction('Client', data))}/>
            )
        })
        return (    
        <FancyBackground>

                <UserHeader userName={this.props.user.email} />

                <UserAvatar />

                <Animated.View style={{ alignSelf: 'stretch', position: 'relative', height: this.state.menu.height, top: this.state.menu.top, opacity: this.state.menu.opacity}}>
                    <MenuSlide  onPressFirst={this.logout} onPressSecond={this.toggleModal} />
                </Animated.View>

                <ScrollView style={styles.scrollContainer}>
                        {clientList}
                </ScrollView>

                <HeaderButton onPress={this.toggleModal} iconName='cog' iconColor={GLOBALS.COLOR.SECONDARY} />

                <AddButton onPress={() => this.props.navigation.dispatch(this.resetAction('AddClient', this.props.navigation.state.params))} />

        </FancyBackground>
        );
    }

}



function mapStateToProps (state) {
    return {
        user: state.user
    }
}


export default connect(mapStateToProps)(Main)

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        alignSelf: 'stretch'
    }
});
