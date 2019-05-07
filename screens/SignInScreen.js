import React from "react"
import { AsyncStorage, StyleSheet, Text, View, Image, ImageBackground, Platform } from "react-native"
import { Vibration, Google } from 'expo'
import {SocialIcon, Button, Icon} from 'react-native-elements'

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    header : null
  };

 constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      name: "",
      id: "",
      photoUrl: ""
    };
  }
  

  signIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "52706272226-7jbs115mlj5ouulec4qemqib8bhtncn8.apps.googleusercontent.com",
        iosClientId: "52706272226-qnkagiepk8ps3qlsmon3rfauptutrs3c.apps.googleusercontent.com",
        scopes: ["profile", "email"],
        behavior: 'web'
      })

      if (result.type === "success") {
          var string = result.user.email.substring(0, result.user.email.indexOf("@")) + '*' + result.user.name; 
          await AsyncStorage.setItem('userToken', string);
          await AsyncStorage.setItem('accessToken',result.accessToken);
          this.props.navigation.navigate('Home');
      } 
      else {
        console.log("cancelled")
      }
    } catch (e) {
      Vibration.vibrate(1000)
      console.log("error", e)
    }
  }

  render() {
    return (
      <ImageBackground 
        source = {require('../assets/images/auth.png')}
        style={styles.container}>
          <LoginPage signIn={this.signIn} />
      </ImageBackground>
    )
  }
}

const LoginPage = props => {
  return (
    <View>
      <Text style={styles.header}>Welcome to Spades!</Text>
      <Button
        icon={<Icon name='google' type='antdesign' color='#fff' containerStyle={{marginRight: 15}}/>}
        raised={true}
        containerStyle={{marginTop: 20}}
        buttonStyle={{backgroundColor:'#dd4b39'}}
        underlayColor='transparent'
        title='Sign In With Google'
        titleStyle={{fontSize: 20, fontFamily: 'SourceSansPro', color: 'white'}}
        onPress={() => props.signIn()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 35,
    fontFamily: 'SourceSansPro'
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  }
})