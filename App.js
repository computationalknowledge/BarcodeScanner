/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
console.disableYellowBox = true;
import React, { Component } from 'react';
import Splash from './scanner/screens/Splash';
import Routes from './scanner/screens/Routes';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

class App extends Component {

 
  render() {

    return (
    
        <AppContainer />
     
    )
  }

}

const RootStack = createStackNavigator(

  {
    Splash: Splash,
    Routes: Routes,
   
  },
  {
    initialRouteName:"Splash",
    headerMode: "none",
  },

);

const AppContainer = createAppContainer(RootStack);

export default App;