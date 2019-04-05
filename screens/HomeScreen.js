import React from 'react';
import {Image,ImageBackground,Platform,ScrollView,
  StyleSheet,Text,TouchableOpacity,View,} from 'react-native';

import { WebBrowser } from 'expo';

import {Button, Icon, Card, Header} from 'react-native-elements';

import ClubScreen from '../screens/Club';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: <Header
        leftComponent={<Button icon=
        {<Icon name="menu" onPress={()=>{}}/>} size={15} color="transparent" type='clear'/>}
        centerComponent={<Image source={require('../assets/images/m_trans.png')} 
          style = {{width: 40,height: 40, resizeMode: 'contain'}}/>}
        rightComponent= {<Button title='Edit' titleStyle={{fontWeight: 'bold', color : 'black'}} type='clear'/>}
        backgroundImage={{uri: 'https://jssorcdn7.azureedge.net/demos/img/present/02.jpg'}}
        />
  }
  render() {
    const nav = this.props.navigation;
    return (
      <View style={styles.container}>
      
        <ScrollView style={styles.container}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeTitle}>Clubs</Text>
          </View>
          
          <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.cardContainer} 
            onPress={() => nav.navigate('ClubScreen', {club: 'Michigan Hackers', img: 'https://se-infra-imageserver2.azureedge.net/clink/images/d575c35c-d2e0-489d-8a8a-039b0b668c62c21bde67-05e1-4f6e-9e3d-0db57b682736.png?preset=med-sq'})}>
            <Card image={{uri:"https://se-infra-imageserver2.azureedge.net/clink/images/d575c35c-d2e0-489d-8a8a-039b0b668c62c21bde67-05e1-4f6e-9e3d-0db57b682736.png?preset=med-sq"}}>
              <Text style={styles.cardTitle}>Michigan Hackers</Text>
            </Card>
          </TouchableOpacity>
          </View>

        </ScrollView>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cardTitle:{
    fontSize: 18,
    fontFamily: 'SourceSansPro',
    fontWeight: 'bold'
  },
  cardContainer:{
    flex: 0.5,
    aspectRatio: 1,
  },
  welcomeContainer: {
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20
  },
  welcomeTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
    fontFamily: 'SourceSansPro'
  },
});

 
/*
  Commeneted out code from default template. Might be needed for future reference.
  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };   
}

//Styling stuff
  <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
    <MonoText style={styles.codeHighlightText}>screens/HomeScreen.js</MonoText>
  </View>
  <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
    <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
  </View>
*/