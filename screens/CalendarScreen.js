import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default class CalendarScreen extends React.Component {
    static navigationOptions = {
      title : 'Calendar'
    };
  render() {
    return(
      <View>
        <Calendar />
      </View>
    );
  }
}
