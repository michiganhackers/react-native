import React from "react"
import { AsyncStorage, StyleSheet, Text, View, Image, ImageBackground } from "react-native"
import * as Expo from "expo"
import {SocialIcon, Button, Icon} from 'react-native-elements';

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
      const result = await Expo.Google.logInAsync({
        androidClientId:
          "52706272226-7jbs115mlj5ouulec4qemqib8bhtncn8.apps.googleusercontent.com",
        iosClientId: "52706272226-qnkagiepk8ps3qlsmon3rfauptutrs3c.apps.googleusercontent.com",
        scopes: ["profile", "email"],
        behavior: 'web'
      })

      if (result.type === "success") {
          var string = result.user.email.substring(0, result.user.email.indexOf("@")) + '*' + result.user.name; 
          await AsyncStorage.setItem('userToken', string);
          this.props.navigation.navigate('Home');
      } 
      else {
        console.log("cancelled")
      }
    } catch (e) {
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







/*import React from "react"
import { AsyncStorage, StyleSheet, Text, View, Image, Button } from "react-native"
import * as Expo from "expo"

export default class SignInScreen extends React.Component {
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
      const result = await Expo.Google.logInAsync({
        androidClientId:
          "52706272226-7jbs115mlj5ouulec4qemqib8bhtncn8.apps.googleusercontent.com",
        iosClientId: "52706272226-qnkagiepk8ps3qlsmon3rfauptutrs3c.apps.googleusercontent.com",
        scopes: ["profile", "email"],
        behavior: 'web'
      })

      if (result.type === "success") {
          string = result.user.email.substring(0, result.user.email.indexOf("@"));
          await AsyncStorage.setItem('userToken', string);
          this.props.navigation.navigate('Home');
      } 
      else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
  }
  render() {
    return (
      <View style={styles.container}>
          <LoginPage signIn={this.signIn} />
      </View>
    )
  }
}

const LoginPage = props => {
  return (
    <View>
      <Text style={styles.header}>Sign In With Google</Text>
      <Button title="Sign in with Google" onPress={() => props.signIn()} />
    </View>
  )
}

const LoggedInPage = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome:{props.name}</Text>
      <Image style={styles.image} source={{ uri: props.photoUrl }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 25
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
*/