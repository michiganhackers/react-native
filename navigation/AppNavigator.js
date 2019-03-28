import React from 'react';
import { Platform } from 'react-native';
import MainTabNavigator from './MainTabNavigator';
import SignInScreen from '../screens/SignInScreen';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

// const AppStack = createStackNavigator(
// 	{ Main: MainTabNavigator }, 
// 	{ defaultNavigationOptions: {header: null}},
// );

const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default MainTabNavigator;
//createSwitchNavigator
//   {
//     //Todo: add AuthLoading: AuthLoadingScreen,
//     App: AppStack,
//     Auth: AuthStack,
//   },
//   {
//     //Change back to initialRouteName: 'Auth',
//     initialRouteName: 'App'
//   }
// );