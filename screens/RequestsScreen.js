import React from 'react';
import {ActivityIndicator, Image,FlatList,ScrollView,StyleSheet,Text,TouchableOpacity,
  TouchableHighlight,View,Modal,Linking} from 'react-native';
import {Header, Button, Icon, Divider, ListItem} from 'react-native-elements';
import firebase from 'firebase';
export default class RequestsScreen extends React.Component {
  constructor(props)
  {
    super(props);
    this.state={
      reqs:[]
    };
  }
	static navigationOptions = ({navigation}) => {
	    return {
	      header: <Header
	      leftComponent={<Button icon=
	        {<Icon name="arrow-back" onPress={()=>navigation.goBack()}/>} size={15} 
	        color='transparent' type='clear'/>}
	      centerComponent= {<Text style={{fontFamily: 'SourceSansPro', fontSize: 20, fontWeight: 'bold'}}>
	        Requests</Text> }
	      backgroundImage={{uri: 'https://jssorcdn7.azureedge.net/demos/img/present/02.jpg'}}
	      />
	    };
  	};
    acceptRequest(uniq, index){
      const {navigation} = this.props;
    const club = navigation.getParam('club');
        var ref = firebase.database().ref('/users/' + uniq);
        ref.child('clubs').push(club);
        var requests = this.state.reqs;
        console.log(requests);
        requests.splice(index, 1);
        console.log(requests);
        var reqref = firebase.database().ref('/clubs/' + club + '/requests/');
        reqref.child(uniq).remove();
        if(requests.length == 0)
        this.setState({reqs: []});
        else
        this.setState({reqs: requests});
         
        
    }
    declineRequest(uniq, index){
        const {navigation} = this.props;
        const club = navigation.getParam('club');
        var requests = this.state.reqs;
        requests.splice(index, 1);
        var reqref = firebase.database().ref('/clubs/' + club + '/requests/');
        reqref.child(uniq).remove();
        if(requests.length == 0)
        this.setState({reqs: []});
        else
        this.setState({reqs: requests});
         // var reqref = firebase.database().ref('/clubs/' + club + '/requests/');
         // reqref.child(uniq).remove();
        
    }
    componentDidMount(){
          const {navigation} = this.props;
    const reqs = navigation.getParam('reqs');
    this.setState({reqs:reqs})
    }
  render(){

    return(
    <ScrollView style={styles.container}>
      <View style={styles.clubContainer}>
        <FlatList
            data={this.state.reqs}
            renderItem={({ item, index }) => (
              <ListItem
                title={item.name}
                subtitle={item.uniq}
                titleStyle={styles.subtitle}
                rightElement={<View style={{ flexDirection:"row" }}><View>
                <Button style ={styles.buttonContainer} title = "Accept" onPress={()=> this.acceptRequest(item.uniq, index)}/></View><View>
                <Button title = "Decline" onPress={()=> this.declineRequest(item.uniq, index)} /></View></View> }
                contentContainerStyle={{marginTop: 10, marginBottom: 10}}
              />
            )}
            keyExtractor={(item) => item.uniq}
          />
        {/*TO-DO: Add Options to add/view events, add/edit members and maybe files/forms here*/}
        
      </View>
    </ScrollView>

  );
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
  },
   buttonContainer: {
    marginRight: 10
  }
});