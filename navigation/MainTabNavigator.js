import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import {Ionicons} from '@expo/vector-icons';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import SearchScreen from '../screens/SearchScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator({Home: HomeScreen,});

const SearchStack = createStackNavigator({Search: SearchScreen});

const CalendarStack = createStackNavigator({Calendar: CalendarScreen});

const NotificationStack = createStackNavigator({Links: NotificationScreen,});

const SettingsStack = createStackNavigator({Settings: SettingsScreen,});

export default createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    Search: {screen: SearchStack},
    Notifications: {screen: NotificationStack},
    Calendar: {screen: CalendarStack},
    Settings: { screen: SettingsStack },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'ios-home';
        } 
        else if (routeName === 'Settings') {
          iconName = 'ios-menu';
        }
        else if(routeName==='Calendar'){
          iconName='ios-calendar'
        }
        else if(routeName==='Search'){
          iconName='ios-search';
        }
        else if(routeName==='Notifications'){
          iconName='ios-notifications';
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#ef5b2e',
      inactiveTintColor: 'gray',
      showLabel:false,
    },
  }
);
