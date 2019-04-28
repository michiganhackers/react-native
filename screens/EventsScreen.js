import React from 'react';
import {ActivityIndicator, Image,FlatList,ScrollView,StyleSheet,Text,TouchableOpacity,
  TouchableHighlight,View,Modal,Linking, SectionList} from 'react-native';
import {Header, Button, Icon, Divider, ListItem} from 'react-native-elements';
import firebase from 'firebase';

export default class EventsScreen extends React.Component {
  constructor(props)
  {
    super(props);
    this.state={
      events:[],
      loading: true,

    };
  }

	static navigationOptions = ({navigation}) => {
    const admin = navigation.getParam('admin');
    const club = navigation.getParam('club');
    const fullname = navigation.getParam('fullname');
    if(admin)
    {
	    return {
	      header: <Header
	      leftComponent={<Button icon=
	        {<Icon name="arrow-back" onPress={()=>navigation.goBack()}/>} size={15} 
	        color='transparent' type='clear'/>}
	      centerComponent= {<Text style={{fontFamily: 'SourceSansPro', fontSize: 20, fontWeight: 'bold'}}>
	        Events</Text> }
           rightComponent= {<Button title='Add' titleStyle={{fontWeight: 'bold', color : 'black'}} 
        type='clear' onPress = {()=>navigation.navigate('MakeEvent', {club: club, fullname: fullname})}/>}
	      backgroundImage={{uri: 'https://jssorcdn7.azureedge.net/demos/img/present/02.jpg'}}
	      />
	    };
    }
    else{
      return {
        header: <Header
        leftComponent={<Button icon=
          {<Icon name="arrow-back" onPress={()=>navigation.goBack()}/>} size={15} 
          color='transparent' type='clear'/>}
        centerComponent= {<Text style={{fontFamily: 'SourceSansPro', fontSize: 20, fontWeight: 'bold'}}>
          Events</Text> }
        backgroundImage={{uri: 'https://jssorcdn7.azureedge.net/demos/img/present/02.jpg'}}
        />
      };
    }
  };
  
  async getData(){
    this.setState({loading: true});
    const {navigation} = this.props;
    const club = navigation.getParam('club');
    var a = false;
    var events = [];
    await firebase.database().ref('/clubs/' + club + '/events/').orderByKey().on('value', function(snapshot){
      snapshot.forEach((child) =>{
          events.push({
            name: child.val().name,
            title: child.val().title,
            date: child.val().date, 
            details: child.val().details
          });
      });
    });
    this.setState({events:events, loading: false});
  }
  
  async componentDidMount(){
    const { getData, navigation } = this.props;
    this.getData()
    this.willFocusListener = navigation.addListener(
      'willFocus',() => {this.getData()})
  }

  componentWillUnmount() {
    this.willFocusListener.remove()
  }

  render(){
    if(this.state.isLoading){
     return <ActivityIndicator size="large"/>;
    }
    if(this.state.events.length != 0){
      return(
        <ScrollView style={styles.container}>
          <View style={styles.clubContainer}>
           <FlatList
            data={this.state.events}
            renderItem={({ item, index }) => (
               <ListItem title = {item.title} titleStyle = {styles.title} subtitle = {item.date} 
                subtitleStyle= {styles.sub} chevron={true}  bottomDivider={true}
                onPress={()=>{this.props.navigation.navigate('Details',{item: item, src: "events"})}}
              />
            )}
            keyExtractor={(item) => item.date}
          />
            {/*TO-DO: Add Options to add/view events, add/edit members and maybe files/forms here*/}
          </View>
        </ScrollView>
      );
    }
    else{
      return(
        <ScrollView style={styles.container}>
           <View style={styles.container}>
          
              <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeTitle}>There are currently no events for this club!</Text>
              </View>       

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
    fontSize: 12,
    fontFamily: 'SourceSansPro'
  },
  title:{
    fontSize: 24, 
    fontFamily: 'SourceSansPro'
  },
  clubContainer:{
    margin: 20
  },
  clubDescription:{
    fontSize: 16,
    fontFamily: 'SourceSansPro',
  },
   buttonContainer: {
    marginRight: 10
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
  }
});