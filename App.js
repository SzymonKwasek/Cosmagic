import React from 'react';
import Register from './app/components/Register'
import Login from './app/components/Login'
import Main from './app/components/Main'
import AddClient from './app/components/AddClient'
import { createStackNavigator } from 'react-navigation'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const initialState = {
  user: {}
}

const reducer = (state=initialState, action) => {
  switch(action.type)
  {
    case 'SET_USER':
    return { user: action.user }
  }
  return state
}
const store = createStore(reducer)

const Application = createStackNavigator({
  Home: {screen: Register},
  Login: {screen: Login},
  Main: {screen: Main},
  AddClient: {screen: AddClient}
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

