import React from 'react'
import { StyleSheet, AsyncStorage, Animated, View } from 'react-native'
import { connect } from 'react-redux'
import { BackHandler } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import GLOBALS from '../../assets/utils/Global'

import { UserHeader, UserAvatar, FancyBackground, FancyButton, MenuSlide, HeaderButton, TopButtons } from '../components'
import { Main } from './'
class Menu extends React.Component {

    static navigationOptions = {
        header: null
      };

    constructor(props) {
        super(props)
        this.state = {
            modalToggle: true,
            type: {
                lashes: true,
                nails: false,
            },
            menu: {
                height: new Animated.Value(0),
                top: new Animated.Value(0),
                opacity: new Animated.Value(0)
            }
        }
        this.lastBackButtonPress = null
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

    renderState = ( state ) => {
        if ( state === 'lashes') {
            this.setState({type: {lashes: true, nails: false}})
        }
        else if( state === 'nails') {
            this.setState({type: {lashes: false, nails: true}})
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
                    <MenuSlide  onPressFirst={this.logout} onPressSecond={this.toggleModal} icon="sign-out" text='SignOut'/>
                </Animated.View>

                <HeaderButton onPress={this.toggleModal} iconName='cog' iconColor={GLOBALS.COLOR.SECONDARY} />
                
                <TopButtons action1={() => this.renderState('lashes')} action2={() => this.renderState('nails')} />

                <Main navigation={this.props.navigation} params={this.state.type} user={this.props.user} />


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
    },
    topButtons: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        height: 60
    }
});
