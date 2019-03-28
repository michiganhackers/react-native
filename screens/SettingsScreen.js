import React from 'react';
import {Image} from 'react-native';
import { ExpoConfigView } from '@expo/samples';
import {Header} from 'react-native-elements';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: <Header
        centerComponent={<Image source={require('../assets/images/m_trans.png')} 
          style = {{width: 50,height: 50, resizeMode: 'contain'}}/>}
        backgroundImage={{uri: 'https://jssorcdn7.azureedge.net/demos/img/present/02.jpg'}}
        />
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <ExpoConfigView />;
  }
}
