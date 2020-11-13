/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
console.disableYellowBox = true;
import React, { Component } from 'react';
import Scan from './Scan'
import Home from './Home'
import ScanList from './ScanList'
import SignUp from './SignUp'
import Login from './Login'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

class Routes extends Component {

 
  render() {

    return (
        <AppContainer />
    )
  }

}

const RootStack = createStackNavigator(

  {
    Scan:Scan,
    Home:Home,
    ScanList:ScanList,
    SignUp:SignUp,
    Login:Login
   
  },
  {
    initialRouteName: 'SignUp',
    headerMode: "none",
  },

);

const AppContainer = createAppContainer(RootStack);

export default Routes;
