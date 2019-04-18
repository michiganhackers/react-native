import React from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import {Header} from 'react-native-elements';

export default class NotificationScreen extends React.Component {
  static navigationOptions = {
    header: <Header
        centerComponent={<Image source={require('../assets/images/m_trans.png')} 
          style = {{width: 40,height: 40, resizeMode: 'contain'}}/>}
        backgroundImage={{uri: 'https://jssorcdn7.azureedge.net/demos/img/present/02.jpg'}}
        />
  };

  render() {
    return (
      <ScrollView style={styles.container} pagingEnabled = {true}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        <ExpoLinksView />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
