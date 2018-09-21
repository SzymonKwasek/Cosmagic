import React from 'react'
import { StyleSheet, ScrollView, AsyncStorage, Animated } from 'react-native'
import { connect } from 'react-redux'
import { BackHandler } from 'react-native'
import { StackActions } from 'react-navigation'
import GLOBALS from '../../assets/utils/Global'
import firebase from 'react-native-firebase'

import { UserHeader, UserAvatar, ClientInfo, FancyBackground, HeaderButton, AddButton, MenuSlide } from '../components'

export default class Main extends React.Component {

    static navigationOptions = {
        header: null
      };

    constructor(props) {
        super(props)
        this.ref = firebase.firestore().collection('clients');
        this.unsubscribe = null;
        this.state = {
            modalToggle: true,
            clients : [],
            type: this.props.params,
            loading: true,
            menu: {
                height: new Animated.Value(0),
                top: new Animated.Value(0),
                opacity: new Animated.Value(0)
            }
        }
        this.lastBackButtonPress = null
    }

    

    componentDidMount() {
        console.log(('------------------------------------'))
            console.log('helo from did mount')
            console.log(this.state.type)
            this.getClientsHandler()
            // this.backHandlerListener()
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.params !== prevState.params){
            return { type: nextProps.params}
        }
        else return null
    }

    componentDidUpdate(prevProps) {
        if (this.props.params !== prevProps.params) {
            this.setState({type: prevProps.params}) 
            this.getClientsHandler()    
        }      
        
    }

    getClientsHandler () {
        let type = ''
            if( this.state.type.lashes ) {
                type = 'cosType.lashes'
            } else if( this.state.type.nails ) {
                type = 'cosType.nails'
            }
            this.unsubscribe = this.ref
                .where('userUUID', '==', this.props.user.uid)
                .where(type, '==', true)
                .onSnapshot(this.getClients)
    }

    // backHandlerListener = () => {
    //     this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    //         this.props.navigation.pop()
    //         return true;
    //     })
    // }

    
    resetAction(route, data) {
        const reset = StackActions.push({
            routeName: route,
            params: data
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

    getClients = async(querySnapshot) => {
        const clients = []
        await querySnapshot.forEach( client => {
            const id = client.id
            const data = {...client.data(), id}
            clients.push(data)
        })
        this.setState({clients})
    }

    logout = () => {
        AsyncStorage.removeItem('user')
        this.toggleModal()
        this.props.navigation.dispatch(this.resetAction('Login', null))
    }

    render() {
        const clientList = this.state.clients.map((item, x) => {
            const data = {...this.props.params, ...item}
            return(
                <ClientInfo data={data} key={x} onPress={() => this.props.navigation.dispatch(this.resetAction('Client', data))}/>
            )
        })
        return (    
        <FancyBackground>


                <ScrollView style={styles.scrollContainer}>
                        {clientList}
                </ScrollView>

                {/* <HeaderButton onPress={this.toggleModal} iconName='cog' iconColor={GLOBALS.COLOR.SECONDARY} /> */}

                <AddButton onPress={() => this.props.navigation.dispatch(this.resetAction('AddClient', this.props.params))} />

        </FancyBackground>
        );
    }

}



// function mapStateToProps (state) {
//     return {
//         user: state.user
//     }
// }


// export default connect(mapStateToProps)(Main)

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        alignSelf: 'stretch'
    }
});
