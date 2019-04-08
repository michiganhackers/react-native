import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import { Font, AppLoading, Asset, Icon } from 'expo';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import CalendarScreen from './screens/CalendarScreen';
import SearchScreen from './screens/SearchScreen';
import NotificationScreen from './screens/NotificationScreen';
import ClubScreen from './screens/Club';
import SignInScreen from './screens/SignInScreen';

import MainTabNavigator from './navigation/MainTabNavigator';

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();

    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
  await Font.loadAsync({
 SourceSansPro: require('./assets/fonts/SourceSansPro-Regular.ttf'),
});
    const userToken = await AsyncStorage.getItem('userToken');
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'Home' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <ActivityIndicator size="large"/>
    );
  }
}


const AuthStack = createStackNavigator({ SignIn: SignInScreen });
const AuthLStack = createStackNavigator({ AuthLoading: AuthLoadingScreen });

export default createSwitchNavigator(
  {
    //Todo: add AuthLoading: AuthLoadingScreen,
    App: MainTabNavigator,
    Auth: AuthStack,
    AuthLoading: AuthLStack,
  },
  {
    //Change back to initialRouteName: 'Auth',
    initialRouteName: 'AuthLoading'
  }
);
