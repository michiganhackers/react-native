import React from 'react';
import { Image, Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import {Ionicons} from '@expo/vector-icons';
import Header from 'react-native-elements';

import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import SearchScreen from '../screens/SearchScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ClubInfoScreen from '../screens/ClubInfoScreen';
import SignInScreen from '../screens/SignInScreen';
import RequestsScreen from '../screens/RequestsScreen';
import ClubScreen from '../screens/Club';
import ClubHomeScreen from '../screens/ClubHomeScreen';
import AnnouncementsScreen from '../screens/AnnouncementsScreen';
import MakeAnnouncementScreen from '../screens/MakeAnnouncementScreen';
import EventsScreen from '../screens/EventsScreen';
import MakeEventScreen from '../screens/MakeEventScreen';
import DetailsScreen from '../screens/DetailsScreen';

const HomeStack = createStackNavigator({Home: HomeScreen, ClubScreen: ClubScreen, 
  Requests: RequestsScreen, ClubHome: ClubHomeScreen, Announcements: AnnouncementsScreen, 
  MakeAnnounce: MakeAnnouncementScreen, Events: EventsScreen, MakeEvent: MakeEventScreen,
  Details: DetailsScreen});

const SearchStack = createStackNavigator({Search: SearchScreen, ClubInfo: ClubInfoScreen});

const CalendarStack = createStackNavigator({Calendar: CalendarScreen});

const NotificationStack = createStackNavigator({Links: NotificationScreen,});

export default createBottomTabNavigator(
  {
    Home: { screen: HomeStack},
    Search: {screen: SearchStack},
    Notifications: {screen: NotificationStack},
    Calendar: {screen: CalendarStack}
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'ios-home';
        } 
        else if(routeName==='Calendar'){
          iconName = 'ios-calendar'
        }
        else if(routeName==='Search'){
          iconName = 'ios-search';
        }
        else if(routeName==='Notifications'){
          iconName = 'ios-notifications';
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={27} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: '#99cfe0',
      inactiveTintColor: 'gray',
      showLabel:false,
    },
  }
);


    