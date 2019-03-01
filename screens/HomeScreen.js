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

import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

import { Card,ListItem, Button, Icon  } from 'react-native-elements';
import { CardViewWithImage } from 'react-native-simple-card-view'

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={require('../assets/images/Michigan.png')}
              style={styles.welcomeImage}
            />
          </View>
          {/*
          <Card containerStyle={styles.cardContainer}             
            image = {{uri: 'https://se-infra-imageserver2.azureedge.net/clink/images/d575c35c-d2e0-489d-8a8a-039b0b668c62c21bde67-05e1-4f6e-9e3d-0db57b682736.png?preset=med-sq'}}>
            <Text style={styles.cardTitle}>Michigan Hackers</Text>
            <Button
              icon={<Icon name='code' color='#ffffff' />}
              onPress={()=>WebBrowser.openBrowserAsync
                ("https://maizepages.umich.edu/organization/michiganhackers")}
              backgroundColor='#03A9F4'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              title='VIEW NOW' />
          </Card>
          <Card containerStyle={styles.cardContainer}             
            image = {{uri: 'https://se-infra-imageserver2.azureedge.net/clink/images/d575c35c-d2e0-489d-8a8a-039b0b668c62c21bde67-05e1-4f6e-9e3d-0db57b682736.png?preset=med-sq'}}>
            <Text style={styles.cardTitle}>Michigan Hackers</Text>
            <Button
              icon={<Icon name='code' color='#ffffff' />}
              onPress={()=>WebBrowser.openBrowserAsync
                ("https://maizepages.umich.edu/organization/michiganhackers")}
              backgroundColor='#03A9F4'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              title='VIEW NOW' />
          </Card>*/}
          <View style={{flexDirection:'row'}}>
          <CardViewWithImage 
              width={ 180 }
              source={ {uri: 'https://se-infra-imageserver2.azureedge.net/clink/images/d575c35c-d2e0-489d-8a8a-039b0b668c62c21bde67-05e1-4f6e-9e3d-0db57b682736.png?preset=med-sq'} }
              title={ 'Michigan Hackers' }
              titleFontFamily={'Trebuchet MS'}
              imageWidth={ 180 }
              imageHeight={ 100 }
              roundedImage={ false }
              shadowOpacity={ 0.5 }
              contentPadding ={{left: 50}, {right: 50}}
              onPress={()=>WebBrowser.openBrowserAsync
                ("https://maizepages.umich.edu/organization/michiganhackers")}
          />
          <CardViewWithImage
              width={ 180 }
              source={ {uri: 'https://se-infra-imageserver2.azureedge.net/clink/images/4fcaf324-d56b-4cae-be54-edeef97dc9240216b9cb-26de-43c1-89aa-7d76635f2f87.png?preset=med-sq'} }
              title={ 'University of Michigan Central Student Government' }
              titleFontFamily={'Trebuchet MS'}
              imageWidth={ 180 }
              imageHeight={ 100 }
              roundedImage={ false }
              shadowOpacity={ 0.5 }
              contentPadding ={{left: 10}, {right: 50}}
              onPress={()=>WebBrowser.openBrowserAsync
                ("https://maizepages.umich.edu/organization/csgumich")}
          />
          </View>

          <View style={{flexDirection:'row'}}>
          <CardViewWithImage 
              width={ 180 }
              source={ {uri: 'https://se-infra-imageserver2.azureedge.net/clink/images/3bd65bed-6142-40e6-b9b5-157a17b8236c65a0c374-5975-4dc4-bf81-860f1bfc91e3.png?preset=med-sq'} }
              title={ 'University of Michigan Solar Car Team' }
              titleFontFamily={'Trebuchet MS'}
              imageWidth={ 180 }
              imageHeight={ 100 }
              roundedImage={ false }
              shadowOpacity={ 0.5 }
              contentPadding ={{left: 50}, {right: 50}}
              onPress={()=>WebBrowser.openBrowserAsync
                ("https://maizepages.umich.edu/organization/umsolar")}
          />
          <CardViewWithImage
              width={ 180 }
              source={ {uri: 'https://se-infra-imageserver2.azureedge.net/clink/images/e329f4bf-c480-4528-8c9e-34789ad9ab7e986e9bbc-7103-4e3c-b085-448c1a17862d.png?preset=med-sq'} }
              title={ 'Michigan Mars Rover Team' }
              titleFontFamily={'Trebuchet MS'}
              imageWidth={ 180 }
              imageHeight={ 100 }
              roundedImage={ false }
              shadowOpacity={ 0.5 }
              contentPadding ={{left: 10}, {right: 50}}
              onPress={()=>WebBrowser.openBrowserAsync
                ("https://maizepages.umich.edu/organization/mrover")}
          />
          </View>
          {/*<Text style={styles.getStartedText}>This is the home page for the Maize Pages App</Text>*/}

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
    fontFamily: 'Trebuchet MS',
  },
  cardContainer:{
    width: '45%',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
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