import React from 'react';
import {ActivityIndicator,AsyncStorage,Button,StatusBar,StyleSheet,
  View,Text,Image,Platform} from 'react-native';
import { Font, AppLoading, Asset, Icon, SplashScreen } from 'expo';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import CalendarScreen from './screens/CalendarScreen';
import SearchScreen from './screens/SearchScreen';
import NotificationScreen from './screens/NotificationScreen';
import ClubScreen from './screens/Club';
import SignInScreen from './screens/SignInScreen';

import MainTabNavigator from './navigation/MainTabNavigator';
import AppNavigator from './navigation/AppNavigator';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
          autoHideSplash={false}
        />
      );
    } else {
      return (<AppNavigator />);
    }
  }

  async _loadResourcesAsync(){
    await Asset.loadAsync([
        require('./assets/images/m_trans.png'),
        require('./assets/images/auth.png')
    ]);
    await Font.loadAsync({
      'SourceSansPro': require('./assets/fonts/SourceSansPro-Regular.ttf'),
    });
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
    SplashScreen.hide();
  };
}