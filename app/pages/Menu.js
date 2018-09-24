import React from 'react'
import { StyleSheet, AsyncStorage, Animated, View } from 'react-native'
import { connect } from 'react-redux'
import { BackHandler } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import GLOBALS from '../../assets/utils/Global'

import { UserHeader, UserAvatar, FancyBackground, SearchInput, MenuSlide, HeaderButton, SearchButton, TopButtons } from '../components'
import { Main } from './'
class Menu extends React.Component {

    static navigationOptions = {
        header: null
      };

    constructor(props) {
        super(props)
        this.state = {
            menuToggle: true,
            searchToggle: true,
            search: '',
            type: {
                lashes: true,
                nails: false,
            },
            menu: {
                height: new Animated.Value(0),
                top: new Animated.Value(0),
                opacity: new Animated.Value(0)
            },
            searchAnimation: {
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


    toggleMenu = () => {
        this.setState({
            menuToggle: !this.state.menuToggle
        })
        this.openMenu()
    }

    toggleSearch = () => {
        this.setState({
            searchToggle: !this.state.searchToggle
        })
        this.openSearch()
    }

    menuAnimation = ( a, b, c ) => {
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

    searchAnimation = ( a, b, c ) => {
        const timing = Animated.timing
            Animated.parallel([
                timing(this.state.searchAnimation.height, {
                    toValue: a,
                    duration: 300
                }),
                timing(this.state.searchAnimation.top, {
                    toValue: b,
                    duration: 300
                }),
                timing(this.state.searchAnimation.opacity, {
                    toValue: c,
                    duration: 300
                })
            ]).start()     
    }

    openMenu = () => {
        
        if(this.state.menuToggle) {
            this.menuAnimation(90, 0, 1)
        } else {
            this.menuAnimation(0, 0, 0)

        }
    }

    openSearch = () => {
        if(this.state.searchToggle) {
            this.searchAnimation(90, 0, 1)
        } else {
            this.searchAnimation(0, 0, 0)

        }
    }

    renderState = ( state ) => {
        if ( state === 'lashes') {
            this.setState({ type: {lashes: true, nails: false}, search: '' })
        }
        else if( state === 'nails') {
            this.setState({ type: {lashes: false, nails: true}, search: '' })
        }
    }


    logout = () => {
        AsyncStorage.removeItem('user')
        this.toggleMenu()
        this.props.navigation.dispatch(this.resetAction('Login', null))
    }

    render() {
        return (    
        <FancyBackground>

                <UserHeader userName={this.props.user.email} />

                <UserAvatar />


                <Animated.View style={{ alignSelf: 'stretch', position: 'relative', height: this.state.menu.height, top: this.state.menu.top, opacity: this.state.menu.opacity}}>
                    <MenuSlide  onPressFirst={this.logout} onPressSecond={this.toggleMenu} icon="sign-out" text='SignOut'/>
                </Animated.View>

                <Animated.View style={{ alignSelf: 'stretch', position: 'relative', height: this.state.searchAnimation.height, top: this.state.searchAnimation.top, opacity: this.state.searchAnimation.opacity}}>
                    <SearchInput placeholder={'Search'} placeholderColor={'rgb(0,0,0)'} onChange={(search) => this.setState({ search })}/>  
                </Animated.View>
                
                <HeaderButton onPress={this.toggleMenu} iconName='cog' iconColor={GLOBALS.COLOR.SECONDARY} />
                
                <SearchButton onPress={this.toggleSearch} iconName='search' iconColor={GLOBALS.COLOR.SECONDARY} />

                <TopButtons action1={() => this.renderState('lashes')} action2={() => this.renderState('nails')} />

                <Main navigation={this.props.navigation} params={this.state.type} search={this.state.search} user={this.props.user} />


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
