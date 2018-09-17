import React from 'react'
import { StyleSheet, AsyncStorage, Animated, View } from 'react-native'
import { connect } from 'react-redux'
import { BackHandler } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import GLOBALS from '../../assets/utils/Global'

import { UserHeader, UserAvatar, FancyBackground, FancyButton, MenuSlide, HeaderButton } from '../components'

class Menu extends React.Component {

    static navigationOptions = {
        header: null
      };

    constructor(props) {
        super(props)
        this.state = {
            modalToggle: true,
            menu: {
                height: new Animated.Value(0),
                top: new Animated.Value(0),
                opacity: new Animated.Value(0)
            }
        }
        this.lastBackButtonPress = null
    }

    componentDidMount() {   
        // if(this.props.navigation.isFocused()) {
        //     this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        //         if(this.lastBackButtonPress + 2000 >= new Date().getTime()) {
        //             BackHandler.exitApp();
        //             return true
        //         }
        //         this.lastBackButtonPress = new Date().getTime()

        //         return true;
        //     })
        // }
    }

    componentWillUnmount() {
        // const reset = StackActions.reset({
        //     index: 0,
        //     actions: [
        //         NavigationActions.navigate({routeName: 'Menu'})
        //     ]
        // })
        // this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        //     this.props.navigation.dispatch(reset)
        // })
        console.log("Unmount from Menu")

    }


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


    logout = () => {
        AsyncStorage.removeItem('user')
        this.toggleModal()
        this.props.navigation.dispatch(this.resetAction('Login', null))
    }

    render() {

        return (    
        <FancyBackground>

                <UserHeader userName={this.props.user.email} />

                <UserAvatar />

                <Animated.View style={{ alignSelf: 'stretch', position: 'relative', height: this.state.menu.height, top: this.state.menu.top, opacity: this.state.menu.opacity}}>
                    <MenuSlide  onPressFirst={this.logout} onPressSecond={this.toggleModal} />
                </Animated.View>

                <HeaderButton onPress={this.toggleModal} iconName='cog' iconColor={GLOBALS.COLOR.SECONDARY} />

                <View>
                    <FancyButton action={() => this.props.navigation.dispatch(this.resetAction('Main', {lashes: true, nails: false, both: false}))} btnText='Lashes'/>
                </View>
                <View>
                    <FancyButton action={() => this.props.navigation.dispatch(this.resetAction('Main', {lashes: false, nails: true, both: false}))} btnText='Nails'/>
                </View>

        </FancyBackground>
        );
    }

}



function mapStateToProps (state) {
    return {
        user: state.user
    }
}


export default connect(mapStateToProps)(Menu)

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        alignSelf: 'stretch'
    }
});
