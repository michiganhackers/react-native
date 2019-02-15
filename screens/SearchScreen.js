import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';

export default class SearchScreen extends React.Component {
  static navigationOptions = {
    title: 'Search',
  };

  render() {
  	return(
  		<View>
  			<Text>Search Screen</Text>
  		</View>
  	);
  }
}
