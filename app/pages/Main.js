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
            this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
                if(this.lastBackButtonPress + 2000 >= new Date().getTime()) {
                    BackHandler.exitApp();
                    return true
                }
                this.lastBackButtonPress = new Date().getTime()

                return true;
            })
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


    resetClientAction(data) {
       const reset = StackActions.reset({
            index: 1,
            actions: [
                NavigationActions.navigate({routeName: 'Main'}),
                NavigationActions.navigate({routeName: 'Client', params: data})
            ]
        })
        return reset
    }
    
    resetAddAction() {
        const reset = StackActions.reset({
            index: 1,
            actions: [
                NavigationActions.navigate({routeName: 'Main'}),
                NavigationActions.navigate({routeName: 'AddClient'})
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
            console.log(this.state.menu)
        } else {
            this.animationHandler(0, 0, 0)
            console.log(this.state.menu)

        }
    }

    getAllClients = async () => {
        this.setState({clients: []})

        const data = {
            userUUID: this.props.user.uuid
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
        this.props.navigation.push('Login')
    }

    render() {
        const clientList = this.state.clients.map((item, x) => {
            return(
                <ClientTab data={item} key={x} onPress={() => this.props.navigation.dispatch(this.resetClientAction(item))}/>
            )
        })
        return (    
        <FancyBackground>

                {/* TUTAJ FAJNY HEADER USERA HEHE */}
                <UserHeader userName={this.props.user.email} />

                <UserAvatar />

                <Animated.View style={{ alignSelf: 'stretch', position: 'relative', height: this.state.menu.height, top: this.state.menu.top, opacity: this.state.menu.opacity}}>
                    <MenuSlide  onPressFirst={this.logout} onPressSecond={this.toggleModal} />
                </Animated.View>

                <ScrollView style={styles.scrollContainer}> 
                    {/* <FlatList 
                        data={this.state.clients}
                        keyExtractor={(x) => x}
                        renderItem={({ item }) =>
                        <ClientTab data={item} onPress={() => this.props.navigation.dispatch(this.resetClientAction(item))}/>
                        }/>           */}

                        {clientList}
                </ScrollView>

                <HeaderButton onPress={this.toggleModal} iconName='cog' iconColor={GLOBALS.COLOR.SECONDARY} />

                <AddButton onPress={() => this.props.navigation.dispatch(this.resetAddAction())} />

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
