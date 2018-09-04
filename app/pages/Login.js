import React from 'react'
import { Image, ImageBackground, StyleSheet, Animated, Text, TouchableOpacity, AsyncStorage } from 'react-native'
import { sha512 } from 'js-sha512'
import axios from 'axios'
import { connect } from 'react-redux'
import FancyInput from '../components/FancyInput'
import FancyButton from '../components/FancyButton'

import bgImage from '../../assets/images/meduza.jpeg'
import appIcon from '../../assets/images/eye.png'

class Login extends React.Component {
    static navigationOptions = {
        header: null
      };

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            animation: {
                emailPositionLeft: new Animated.Value(795),
                passwordPositionLeft: new Animated.Value(905)
            }
        }
    }
    componentDidMount() {
        this._loadInitialState().done();
        const timing = Animated.timing
        Animated.parallel([
            timing(this.state.animation.emailPositionLeft, {
                toValue: 0,
                duration: 700
            }),
            timing(this.state.animation.passwordPositionLeft, {
                toValue: 0,
                duration: 900
            })
        ]).start()
    }
    formValidator () {
        if(!this.state.email) {
            alert('Fill in Email field !')
            return false
        }
        if(!this.state.password) {
            alert('Fill in Password field !')
            return false
        }
        return true;
    }

    _loadInitialState = async () => {

        let value = await AsyncStorage.getItem('user');
        if( value !== null) {
            this.props.navigation.navigate('Main');
        }
    }

    login = async () => {

        if(!this.formValidator()) {
            return
        }

        const password = sha512(this.state.password)

        const data = {
            email: this.state.email,
            password: password
        }
        const response = await axios.post('http://10.0.2.2:8080/public/user/login',
            data)
        if(response.data.response) {
            AsyncStorage.setItem('user', response.data.response)
            this.props.setUser(response.data.response)
            this.props.navigation.navigate('Main')
        } else {
            alert('User does not exist!')
        }
    }


    render() {
        return (
            <ImageBackground style={styles.image} source={bgImage}>
                {/* <Text style={styles.header}> Shadow of Lashes</Text> */}
                <Image style={styles.appIcon} source={appIcon}/>
                <Animated.View style={{position: 'relative', left: this.state.animation.emailPositionLeft, alignSelf: 'stretch'}}>
                <FancyInput 
                    placeholder="Email"
                    onChange={ (email) =>this.setState({email}) }
                    password={false}
                    placeholderColor={'#fff'}/>
                </Animated.View>

                <Animated.View style={{position: 'relative', left: this.state.animation.passwordPositionLeft, alignSelf: 'stretch'}}>
                <FancyInput 
                    placeholder="Password"
                    onChange={ (password) =>this.setState({password}) }
                    password= {true}
                    placeholderColor={'#fff'}
                    />
                </Animated.View>

                <FancyButton action={this.login} btnText='Login' />

                <Text style={styles.bottomText}>
                    Don't have an account ? {'\n'}
                    <Text onPress={() => this.props.navigation.navigate('Register')} style={styles.linkText}>Sign up</Text> now !
                </Text>
            </ImageBackground>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setUser : (user) => dispatch({type:'SET_USER', user})
    }
}

function mapStateToProps (state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold'
    },
    textInput: {
        alignSelf: 'stretch',
        padding: 14,
        marginBottom: 20,
        backgroundColor: '#fff',
        opacity: .8,
        borderRadius: 25,
        textAlign: 'center',
        fontSize: 16
    },
    bottomText: {
        color: '#fff',
        textAlign: 'center'
    },
    linkText: {
        color: '#90b1e5',
    },
    image: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: null,
        height: null,
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 20,
        paddingBottom: 20
    },
    appIcon: {
        paddingTop: 20,
        alignSelf: 'center',
        marginBottom: 80

    }
})


