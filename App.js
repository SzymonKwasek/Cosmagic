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

import firebase from 'firebase'


const config = {
        apiKey: "AIzaSyAZEHSq8ejwYdmSikSMI_srbja5FFkh1nQ",
        authDomain: "cosmagic-af754.firebaseapp.com",
        databaseURL: "https://cosmagic-af754.firebaseio.com",
        projectId: "cosmagic-af754",
        storageBucket: "cosmagic-af754.appspot.com",
        messagingSenderId: "910297652899"
    };

firebase.initializeApp(config);

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

