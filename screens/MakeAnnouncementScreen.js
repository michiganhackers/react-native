import React from 'react';
import {ActivityIndicator, Image,FlatList,ScrollView,StyleSheet,Text,TextInput, TouchableOpacity,
  TouchableHighlight,View,Modal,Linking} from 'react-native';
import {Header, Button, Icon, Divider, ListItem} from 'react-native-elements';
import firebase from 'firebase';
export default class MakeAnnouncementScreen extends React.Component {
  constructor(props)
  {
    super(props);
    this.state={
      subject: '',
      message: '',
      foo: ''
    }
  }
	static navigationOptions = ({navigation}) => {
	    return {
	      header: <Header
	      leftComponent={<Button icon=
	        {<Icon name="arrow-back" onPress={()=>navigation.goBack()}/>} size={15} 
	        color='transparent' type='clear'/>}
	      centerComponent= {<Text style={{fontFamily: 'SourceSansPro', fontSize: 20, fontWeight: 'bold'}}>
	        Make an Announcement!</Text> }
           rightComponent= {<Button title='Post' titleStyle={{fontWeight: 'bold', color : 'black'}} 
        type='clear' onPress = {()=>navigation.state.params.show()}/>}
	      backgroundImage={{uri: 'https://jssorcdn7.azureedge.net/demos/img/present/02.jpg'}}
	      />
	    };
  	};
CheckTextInput = () => {
          const {navigation} = this.props;
          const club = navigation.getParam('club');
          const fullname = navigation.getParam('fullname');

    //Handler for the Submit onPress
    if (this.state.subject != '') {
      //Check for the Name TextInput
      if (this.state.message != '') {
            var ms = new Date(); 
          firebase.database().ref('/clubs/' + club + '/announcements/').child(ms.getTime()).set({
            subject: this.state.subject,
            message: this.state.message,
            name: fullname,
            date: ms.toLocaleString('en-US', {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute:'2-digit'})
          });
          navigation.goBack();
      } else {
        alert('Please Enter an Announcement!');
      }
    } else {
      alert('Please Enter a Subject Line!');
    }
  };
  async componentDidMount(){
        const {navigation} = this.props;
        navigation.setParams({show: this.CheckTextInput});
  }
  render(){

    return(
      <View>
    <TextInput
          style={styles.subjectContainer}
          placeholder="Subject"
          multiline = {true}
          maxHeight = {100}
          maxLength = {100}
          onChangeText={(subject) => this.setState({subject})}
        />
<TextInput
          style={styles.announceContainer}
          multiline = {true}
          autoGrow = {true}
          numberOfLines = {20}
          placeholder="Type your announcement here"
          onChangeText={(message) => this.setState({message})}
        />
      </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  subjectContainer: {
    height: 80,
    paddingLeft: 10,
    fontSize: 20
  },
  announceContainer: {
    paddingLeft: 10,
    fontSize: 20
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