import React from 'react'
import { StyleSheet, ScrollView, AsyncStorage } from 'react-native'
import axios from 'axios'
import { connect } from 'react-redux'
import { BackHandler} from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import GLOBALS from '../../assets/utils/Global'

import { UserHeader, UserAvatar, ClientTab, FancyBackground, HeaderButton, AddButton, LogOutModal } from '../components'

class Main extends React.Component {

    static navigationOptions = {
        header: null
      };

    constructor(props) {
        super(props)
        this.state = {
            modalToggle: false,
            clients : []
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

                <LogOutModal visible={this.state.modalToggle} onPressFirst={this.logout} onPressSecond={this.toggleModal} />

                {/* TUTAJ FAJNY HEADER USERA HEHE */}
                <UserHeader userName={this.props.user.email} />

                <UserAvatar />

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
