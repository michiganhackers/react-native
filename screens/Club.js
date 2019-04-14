import React from 'react';
import {ActivityIndicator, Image,FlatList,ScrollView,StyleSheet,Text,TouchableOpacity,
  TouchableHighlight,View,Modal,Linking} from 'react-native';
import {Header, Badge, Button, Icon, Divider, ListItem} from 'react-native-elements';
import firebase from 'firebase';
import ClubInfoScreen from '../screens/ClubInfoScreen';
export default class ClubScreen extends React.PureComponent {
  constructor(props)
  {
    super(props);
    this.state={
      isLoading: true,
      admin: false,
      reqs: []
    };
  }
	static navigationOptions = ({navigation}) => {
	    return {
	      header: <Header
	      leftComponent={<Button icon=
	        {<Icon name="arrow-back" onPress={()=>navigation.goBack()}/>} size={15} 
	        color='transparent' type='clear'/>}
	      centerComponent= {<Text style={{fontFamily: 'SourceSansPro', fontSize: 20, fontWeight: 'bold'}}>
	        {navigation.getParam('club')}</Text> }
	      backgroundImage={{uri: 'https://jssorcdn7.azureedge.net/demos/img/present/02.jpg'}}
	      />
	    };
  	};
  async componentDidMount()
  {
    const _this = this;
    const {navigation} = _this.props;
    const uniq = navigation.getParam('uniq');
    const short = navigation.getParam('short');
    var ref = firebase.database().ref('/clubs/' + short + '/admins/');
    var cl = '';
    await ref.once('value').then(function(snapshot) {
      cl = snapshot.val();
    });
    var clubs = cl.split('*');
    //console.log(clubs);
    var ad = false;
    var reqref = firebase.database().ref('/clubs/' + short + '/requests/');
    var reqs = [];
    for(var x = 0; x < clubs.length; ++x)
    {
      if(uniq == clubs[x])
      {
        ad = true;
        await reqref.once('value').then(function(snapshot) {
        snapshot.forEach(function(child){
          var uniq = child.val().substring(0, child.val().indexOf('*'));
          var name = child.val().substring(child.val().indexOf('*')+1);
          reqs.push({name:name, uniq: uniq});
        });
    });
      }
    }
    this.setState({reqs: reqs, admin: ad, isLoading: false});
  }
  goNext(screen, params){
    const {navigation} = this.props;
    navigation.navigate(screen, params);
  }
  render(){
  	const {navigation} = this.props;
  	const img = navigation.getParam('img');
  	const club = navigation.getParam('club');
    const uniq = navigation.getParam('uniq');
    const short = navigation.getParam('short');
    //console.log(this.state.admin);
    if(this.state.isLoading)
    {
  	 return <ActivityIndicator size="large"/>;
    }
    if(this.state.admin)
    {
    return(
    <ScrollView style={styles.container}>
      <View style={styles.clubHeader}>
        <Image source = {{uri: img}} style={styles.clubLogo}/>
          <Text style={styles.clubTitle}>{club}</Text>
      </View>

      <View style={styles.clubContainer}>
        <Divider style={{marginBottom: 30, backgroundColor: '#99cfe0'}}/>
        <FlatList
            data={[
              {name: 'Home', aName: 'home', aType: 'material', screen: '', params: {}, badgelol: true, value: 0},
              {name: 'Announcements', aName: 'bullhorn', aType: 'material-community', screen: '', params: {},  badgelol: true, value: 0},
              {name: 'Events', aName: 'event', aType:'material', screen: 'Requests', screen: '', params: {}, badgelol: true, value: 0},
              {name: 'People', aName: 'people', aType: 'material', screen: 'Requests', screen: '', params: {},  badgelol: true, value: 0},
              {name: 'Files', aName: 'file-document-outline', aType: 'material-community', screen: '', params: {},  badgelol: true, value: 0},
              {name: 'Requests', aName: 'feedback', aType: 'material', screen: 'Requests', params: {reqs: this.state.reqs, club: short}, badgelol: false, value: this.state.reqs.length}]
            }
            renderItem={({ item }) => (
              <ListItem
                leftAvatar={<Icon name={item.aName} type={item.aType}/>}
                title={item.name}
                titleStyle={styles.subtitle}
                chevron={item.badgelol ? item.badgelol : <Badge value={item.value}/>}
                contentContainerStyle={{marginTop: 10, marginBottom: 10}}
                onPress={ ()=> this.goNext(item.screen, item.params)}
              />
            )}
            keyExtractor={item => item.name}
          />
        {/*TO-DO: Add Options to add/view events, add/edit members and maybe files/forms here*/}
      </View>
    </ScrollView>

  );
  }
  else
  {
     return(
    <ScrollView style={styles.container}>
      <View style={styles.clubHeader}>
        <Image source = {{uri: img}} style={styles.clubLogo}/>
          <Text style={styles.clubTitle}>{club}</Text>
      </View>

      <View style={styles.clubContainer}>
        <Divider style={{marginBottom: 30, backgroundColor: '#99cfe0'}}/>
        <FlatList
            data={[
              {name: 'Home', aName: 'home', aType: 'material'},
              {name: 'Announcements', aName: 'bullhorn', aType: 'material-community'},
              {name: 'Events', aName: 'event', aType:'material'},
              {name: 'People', aName: 'people', aType: 'material'},
              {name: 'Files', aName: 'file-document-outline', aType: 'material-community'}]
            }
            renderItem={({ item}) => (
              <ListItem 
                leftAvatar={<Icon name={item.aName} type={item.aType}/>}
                title={item.name}
                titleStyle={styles.subtitle}
                contentContainerStyle={{marginTop: 10, marginBottom: 10}}
                onPress={() => {}}
              />
            )}
            keyExtractor={item => item.name}
          />
        {/*TO-DO: Add Options to add/view events, add/edit members and maybe files/forms here*/}
      </View>
    </ScrollView>

  );
  }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  clubLogo: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  clubHeader:{
    flex:1, 
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center',
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
  },
  clubTitle:{
    flex:1, 
    fontSize: 30,
    marginLeft: 30,
    justifyContent: 'center',
    fontFamily: 'SourceSansPro',
    alignItems: 'center',    
  },
  sub:{
    fontSize: 14,
    fontFamily: 'SourceSansPro'
  },
  subtitle:{
    fontSize: 20, 
    fontWeight: 'bold', 
    fontFamily: 'SourceSansPro'
  },
  clubContainer:{
    margin: 20
  },
  clubDescription:{
    fontSize: 16,
    fontFamily: 'SourceSansPro',
  }
});