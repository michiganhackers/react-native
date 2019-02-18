import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';

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
                //iosClientId: YOUR_CLIENT_ID_HERE,  <-- Todo: add IOS client ID
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
              //Todo: Add google styles
              <View style={styles.container}>
                  <Text style={styles.header}>Sign In To Maize Pages!</Text>
                  <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.signIn()}>
                        <Text style={styles.signInText}>
                            SIGN IN WITH GOOGLE
                        </Text>
                  </TouchableOpacity>
              </View>

          );
      }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    header: {
        padding: 5,
        fontSize: 25,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
        height: 35,
        borderRadius: 5,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 2, // Android
    },
    signInText: {
        fontSize: 14,
        padding: 8,
        
    },
    
});