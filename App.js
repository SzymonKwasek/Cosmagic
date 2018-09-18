import React from 'react';
import { AddClient, Client, EditClient, Login, Main, Menu, Register } from './app/pages'
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

