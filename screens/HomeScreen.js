import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl, 
  FlatList
} from 'react-native';

import { WebBrowser } from 'expo';

import {Button, Icon, Card, Header, List} from 'react-native-elements';

import firebase from 'firebase';

import { MonoText } from '../components/StyledText';


import ClubScreen from '../screens/Club';
var config = {
apiKey: "AIzaSyDB8VXxMiqunnhG0lLpQxqQMwf8MVbOOsA",
authDomain: "fir-test-72784.firebaseapp.com",
databaseURL: "https://fir-test-72784.firebaseio.com",
projectId: "fir-test-72784",
storageBucket: "fir-test-72784.appspot.com",
messagingSenderId: "752171087612"
};
firebase.initializeApp(config);
export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      uniqname: "",
      isLoading: true,
      clubs: [],
      refreshing: false
    }
    this._onRefresh = this._onRefresh.bind(this);
  }
  static navigationOptions = {
    header: <Header
        leftComponent={<Button icon=
          {<Icon name="menu" onPress={()=>{}}/>} size={15} color="transparent" type='clear'/>}

        centerComponent={<Image source={require('../assets/images/m_trans.png')} 
          style = {{width: 40,height: 40, resizeMode: 'contain'}}/>}

        rightComponent= {<Button title='Edit' titleStyle={{fontWeight: 'bold', color : 'black'}}
          type='clear'/>}

        backgroundImage={{uri: 'https://jssorcdn7.azureedge.net/demos/img/present/02.jpg'}}
        />
  }
     _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
  getData(){
       AsyncStorage.getItem('userToken').then(function(token) {
       var ref = firebase.database().ref();
       var uniq = token.substring(0, token.indexOf("*"));
       var name = token.substring(token.indexOf("*")+1);
       console.log(token);
       ref.child('/users/').once('value', function(snapshot)
       {
       		if(!snapshot.hasChild(uniq))
       		{
       			firebase.database().ref('users/' + uniq).set({
				    clubs: {},
				    name: name
				  });
       		}

       });
     var reads = [];
     
       return ref.child('/users/' + uniq + '/clubs/').once('value').then(function(snapshot) {
//      ^^^^^^^^^^^^^^
       snapshot.forEach(function(childSnapshot) {
          //console.log(ch ildSnapshot.val());
             var promise = ref.child('/clubs/' + childSnapshot.val()).once('value');
          reads.push(promise);
     });
       return Promise.all(reads);
      }).then( function(vals){
        //console.log(vals);
        this.setState({
          uniqname:uniq,
          isLoading:false,
          clubs:vals,
          refreshing:false
        });
      }.bind(this));
    }.bind(this));
     };
  async componentDidMount(){
      this.getData();
    };
   _onRefresh(){
  this.setState({refreshing:true});
    this.getData();
}
  render() {
    const nav = this.props.navigation;
    if(this.state.isLoading)
    {
      return <ActivityIndicator size="large"/>;

    }
    var nameurls = [];
    if(this.state.clubs.length == 0)
    {
    	 return (
    	<ScrollView style={styles.container} refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />} >
       <View style={styles.container}>
      
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeTitle}>You are currently not in any clubs. Search for clubs and join them!</Text>
          </View>       

          <Button title = "sign out" onPress={this._signOutAsync}>
          </Button>
      </View>
      </ScrollView>
    )
    }
    else
    {
    for(var x = 0; x < this.state.clubs.length; ++x)
    {
      var n = JSON.parse(JSON.stringify(this.state.clubs[x])).name;
      var url = JSON.parse(JSON.stringify(this.state.clubs[x])).url;
      nameurls.push({
      	key: x,
        name:n,
        url:url
      })
    }
    return (
       <View style={styles.container}>
      
          
         
           <FlatList style={styles.container} contentContainerStyle={styles.contentContainer} horizontal= {false} numColumns ={2} ListHeaderComponent={<View style={styles.welcomeContainer}>
            <Text style={styles.welcomeTitle}>Clubs</Text>
          </View>} refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />}
                data={nameurls}
                renderItem={({item}) =>(
                  <TouchableOpacity key = {item.key} style={styles.cardContainer} 
            onPress={() => nav.navigate('ClubScreen', {club: item.name, img: item.url})}>
            <Card image={{uri:item.url}} imageProps={{resizeMode: 'cover'}}>
              <Text numberOfLines={1} style={styles.cardTitle}>{item.name}</Text>
            </Card>
          </TouchableOpacity>
                )}
              />
         
          <Button title = "sign out" onPress={this._signOutAsync}>
          </Button>
      </View>
    );
}
  }
}

/*<View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {
            nameurls.map((item, i)=>{
              return <TouchableOpacity key = {i} style={styles.cardContainer} 
            onPress={() => nav.navigate('ClubScreen', {club: item.name, img: item.url})}>
            <Card image={{uri:item.url}}>
              <Text style={styles.cardTitle}>{item.name}</Text>
            </Card>
          </TouchableOpacity>;
            })
          }
                    </View>
*/
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
    marginBottom: 40,
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





/*import React from 'react';
import {
  AsyncStorage,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl
} from 'react-native';

import firebase from 'firebase';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

import {Button, Icon, Card, Header} from 'react-native-elements';

import ClubScreen from '../screens/ClubScreen';

      var config = {
    apiKey: "AIzaSyDB8VXxMiqunnhG0lLpQxqQMwf8MVbOOsA",
    authDomain: "fir-test-72784.firebaseapp.com",
    databaseURL: "https://fir-test-72784.firebaseio.com",
    projectId: "fir-test-72784",
    storageBucket: "fir-test-72784.appspot.com",
    messagingSenderId: "752171087612"
  };
  firebase.initializeApp(config);
export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      uniqname: "",
      isLoading: true,
      clubs: [],
      refreshing: false
    }
    this._onRefresh = this._onRefresh.bind(this);
  }
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
    _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
  getData(){
       AsyncStorage.getItem('userToken').then(function(token) {
       var ref = firebase.database().ref();
       console.log(token);
     var reads = [];
     
       return ref.child('/users/' + token + '/clubs/').once('value').then(function(snapshot) {
//      ^^^^^^^^^^^^^^
       snapshot.forEach(function(childSnapshot) {
          //console.log(ch ildSnapshot.val());
             var promise = ref.child('/clubs/' + childSnapshot.val()).once('value');
          reads.push(promise);
     });
       return Promise.all(reads);
      }).then( function(vals){
        //console.log(vals);
        this.setState({
          uniqname:token,
          isLoading:false,
          clubs:vals,
          refreshing:false
        });
      }.bind(this));
    }.bind(this));
     };
  async componentDidMount(){
      this.getData();
    };
  
//     var usersRef = firebase.database().ref();
//     usersRef.child('/users/' + token + '/clubs/').once('value').then(function(snapshot) {
//         snapshot.forEach((child)=> {
//           usersRef.child('/clubs/' + child.val()).once('value').then(function(clubssnapshot) {
//             cl.push({
//               name: clubssnapshot.val().name,
//             });
//             console.log(cl);
//           });
//         });
//             this.setState({
//           isLoading: false
//         });

// });

    //};
    _onRefresh(){
      this.setState({refreshing:true});
        this.getData();
  }
  render() {
    const nav = this.props.navigation;
    if(this.state.isLoading)
    {
      return <Text>loading...</Text>;
    }
    var nameurls = [];
    for(var x = 0; x < this.state.clubs.length; ++x)
    {
      var n = JSON.parse(JSON.stringify(this.state.clubs[x])).name;
      var url = JSON.parse(JSON.stringify(this.state.clubs[x])).url;
      nameurls.push({
        name:n,
        url:url
      })
    }
    console.log(this.state);

    return(
      <View style={styles.container}>
      
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} pagingEnabled = {true}  refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeTitle}>Welcome to Maize Pages App!</Text>
          </View>
          
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {
            nameurls.map((item, i)=>{
              return <TouchableOpacity key = {i} style={styles.cardContainer} 
            onPress={() => nav.navigate('ClubScreen', {club: item.name, img: item.url})}>
            <Card image={{uri:item.url}}>
              <Text style={styles.cardTitle}>{item.name}</Text>
            </Card>
          </TouchableOpacity>;
            })
          }
          
          </View>
          <Button title = "sign out" onPress={this._signOutAsync}>
          </Button>
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
  },
  cardContainer:{
    flex: 0.5,
    aspectRatio: 1,
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
*/

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