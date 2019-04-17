import React from 'react';
import {ActivityIndicator, Image,FlatList,ScrollView,StyleSheet,Text,TextInput, TouchableOpacity,
  TouchableHighlight,View,Modal,Linking} from 'react-native';
import {Header, Button, Icon, Divider, ListItem} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import firebase from 'firebase';
export default class MakeEventScreen extends React.Component {
  constructor(props)
  {
    super(props);
    this.state={
      date: '',
      title: '',
      details: '',
      datevar: ''
    }
  }
  static navigationOptions = ({navigation}) => {
      return {
        header: <Header
        leftComponent={<Button icon=
          {<Icon name="arrow-back" onPress={()=>navigation.goBack()}/>} size={15} 
          color='transparent' type='clear'/>}
        centerComponent= {<Text style={{fontFamily: 'SourceSansPro', fontSize: 20, fontWeight: 'bold'}}>
          Create an Event!</Text> }
           rightComponent= {<Button title='Create' titleStyle={{fontWeight: 'bold', color : 'black', fontSize: 17.5}} 
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
    if (this.state.date != '') {
      //Check for the Name TextInput
      if (this.state.title != '') {

        if (this.state.details != '') {
          firebase.database().ref('/clubs/' + club + '/events/').child(this.state.datevar).set({
            title: this.state.title,
            details: this.state.details,
            name: fullname,
            date: this.state.date
          });
          navigation.goBack();
      }
       else {
        alert('Please Enter Event Details!');
      }
      }
       else {
        alert('Please Enter an Event Title!');
      }
    } else {
      alert('Please Enter a Date!');
    }
  };
  async componentDidMount(){
        const {navigation} = this.props;
        navigation.setParams({show: this.CheckTextInput});
  }
  render(){
    return(
       <View style={{ flex: 1 }}>
         <DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode="datetime"
        placeholder="select date/time"
        format= "MM/DD/YYYY h:mm A"
        minDate = {new Date().toLocaleDateString('en-US')}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginTop: 10,
            marginLeft: 0
          },
          dateInput: {
            marginTop:30,
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date, datevar: Date.parse(date)})}}
      />
    <TextInput
          style={styles.subjectContainer}
          placeholder="Event Name"
          multiline = {true}
          maxHeight = {100}
          maxLength = {100}
          onChangeText={(title) => this.setState({title})}
        />
<TextInput
          style={styles.announceContainer}
          multiline = {true}
          autoGrow = {true}
          numberOfLines = {20}
          placeholder="Type event details here"
          onChangeText={(details) => this.setState({details})}
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
    paddingTop: 40,
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