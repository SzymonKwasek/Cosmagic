import React from 'react';
import Register from './app/components/Register'
import Login from './app/components/Login'
import Main from './app/components/Main'
import AddClient from './app/components/AddClient'
import Client from './app/components/Client'
import ClientTab from './app/components/ClientTab'
import { createStackNavigator } from 'react-navigation'
import store from './app/store/store'
import { Provider } from 'react-redux'



const Application = createStackNavigator({
  Register: {screen: Register},
  Login: {screen: Login},
  Main: {screen: Main},
  AddClient: {screen: AddClient},
  Client: {screen: Client},
  ClientTab: {screen: ClientTab}
}, {
  initialRouteName: 'Login',
  headerMode: 'screen'
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Application />
      </Provider>
    );
  }
}

