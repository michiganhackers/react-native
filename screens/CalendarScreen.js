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
      header: null,
    };
  render() {
    return(
      <View>
        <CalendarList
          // Max amount of months allowed to scroll to the past. Default = 50
          pastScrollRange={50}
          // Max amount of months allowed to scroll to the future. Default = 50
          futureScrollRange={50}
          showScrollIndicator={true}

          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffD662',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: 'orange',
            monthTextColor: '#005397',
            textMonthFontWeight: 'bold',
            textDayFontSize: 18,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 18
          }}
          />
          <Agenda
            // the list of items that have to be displayed in agenda. If you want to render item as empty date
            // the value of date key kas to be an empty array []. If there exists no value for date key it is
            // considered that the date in question is not yet loaded
            items={
              {'2019-02-22': [{text: 'item 1 - any js object'}],
               '2019-02-23': [{text: 'item 2 - any js object'}],
               '2019-02-24': [],
               '2019-02-25': [{text: 'item 3 - any js object'},{text: 'any js object'}],
              }}
            // callback that gets called when items for a certain month should be loaded (month became visible)
            loadItemsForMonth={(month) => {console.log('trigger items loading')}}
            // callback that fires when the calendar is opened or closed
            onCalendarToggled={(calendarOpened) => {console.log(calendarOpened)}}
            // callback that gets called on day press
            onDayPress={(day)=>{console.log('day pressed')}}
            // callback that gets called when day changes while scrolling agenda list
            onDayChange={(day)=>{console.log('day changed')}}
            
            selected={'2019-02-23'}
            // Max amount of months allowed to scroll to the past. Default = 50
            pastScrollRange={50}
            // Max amount of months allowed to scroll to the future. Default = 50
            futureScrollRange={50}
            // specify how each item should be rendered in agenda
            renderItem={(item, firstItemInDay) => {return (<View />);}}
            // specify how each date should be rendered. day can be undefined if the item is not first in that day.
            renderDay={(day, item) => {return (<View />);}}
            // specify how empty date content with no items should be rendered
            renderEmptyDate={() => {return (<View />);}}
            // specify how agenda knob should look like
            renderKnob={() => {return (<View />);}}
            // specify what should be rendered instead of ActivityIndicator
            renderEmptyData = {() => {return (<View />);}}
            // specify your item comparison function for increased performance
            rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
            // Hide knob button. Default = false
            hideKnob={true}
            // By default, agenda dates are marked if they have at least one item, but you can override this if needed
            markedDates={{
              '2019-02-22': {selected: true, marked: true},
              '2019-02-23': {marked: true},
              '2019-02-24': {disabled: true}
            }}
            // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
            onRefresh={() => console.log('refreshing...')}
            // Set this true while waiting for new data from a refresh
            refreshing={false}
            // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
            refreshControl={null}
            // agenda theme
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#b6c1cd',
              selectedDayBackgroundColor: '#00adf5',
              selectedDayTextColor: '#ffD662',
              todayTextColor: '#00adf5',
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',
              dotColor: '#00adf5',
              selectedDotColor: '#ffffff',
              arrowColor: 'orange',
              monthTextColor: '#005397',
              textMonthFontWeight: 'bold',
              textDayFontSize: 18,
              textMonthFontSize: 18,
              textDayHeaderFontSize: 18,
              agendaDayTextColor: 'yellow',
              agendaDayNumColor: 'green',
              agendaTodayColor: 'red',
              agendaKnobColor: 'blue'
            }}
            // agenda container style
            style={{}}
          />
      </View>
    );
  }
}
