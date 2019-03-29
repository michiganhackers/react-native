import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-elements';

export default class SignInScreen extends React.Component {
    static navigationOptions = {
        header: null,
      };

    //Get info from google sign in
    constructor(props) {
        super(props)
        this.state = { signedIn: false, name: "", photoUrl: "" }
    } 

    //Sign in with google
    signIn = async () => {
        try {
            const result = await Expo.Google.logInAsync({
                androidClientId:
                    "714781313345-6sg5819b8bk8kta4fjgm86vm6fdq6rs6.apps.googleusercontent.com",
                iosClientId: 
                    "714781313345-nttukifoqg7o3g9mrhi3cc2hdrgvprrp.apps.googleusercontent.com",
                scopes: ["profile", "email"]
            })

            if (result.type === "success") {
                this.setState({
                    signedIn: true,
                    name: result.user.name,
                    photoUrl: result.user.photoUrl
                })
                this.props.navigation.navigate('App');
            } else {
                console.log("cancelled")
            }
        } catch (e) {
            console.log("error", e)
        }
    }
    state = {
        isLoadingComplete: false,
    };

      render() {
          return(
            <View style={{
          flex: 1,
          backgroundColor: '#eee',
        }}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <Image style={styles.backgroundImage} 
            source={{uri:"https://webgradients.com/public/webgradients_png/035%20Itmeo%20Branding.png"}}/>
        </View>
        <View style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'center'
          }}>
          <Text style={styles.header}>Sign In To Maize Pages!</Text>
          <View style={{flex:0.3,alignItems:'center'}}>
          <Button onPress={() => this.signIn()} title="SIGN IN WITH GOOGLE" titleStyle={styles.signInText}/>
          </View>
        </View>
          
      </View>
          );
      }

}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  },
  header: {
      padding: 15,
      fontSize: 35,
      textAlign:  'center',
      fontFamily: 'SourceSansPro'
  },
  backgroundImage: {
      flex: 1,
      resizeMode: 'cover' // or 'stretch'
  },
  signInText: {
      fontSize: 14,
      padding: 8,
      fontFamily: 'SourceSansPro'
  }
});