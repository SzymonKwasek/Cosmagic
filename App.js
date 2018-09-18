import React from 'react';
import Register from './app/pages/Register'
import Login from './app/pages/Login'
import Main from './app/pages/Main'
import Menu from './app/pages/Menu'
import AddClient from './app/pages/AddClient'
import Client from './app/pages/Client'
import EditClient from './app/pages/EditClient'
import { createStackNavigator } from 'react-navigation'
import store from './app/store/store'
import { Provider } from 'react-redux'


const Application = createStackNavigator({
  Register: {screen: Register},
  Login: {screen: Login},
  Main: {screen: Main},
  AddClient: {screen: AddClient},
  Client: {screen: Client},
  EditClient: {screen: EditClient},
  Menu: {screen: Menu}
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

