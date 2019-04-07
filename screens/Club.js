import React from 'react';
import {Image,FlatList,ScrollView,StyleSheet,Text,TouchableOpacity,
  TouchableHighlight,View,Modal,Linking} from 'react-native';
import {Header, Button, Icon, Divider} from 'react-native-elements';

export default class ClubScreen extends React.PureComponent {
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

  render(){
  	const {navigation} = this.props;
  	const img = navigation.getParam('img');
  	const club = navigation.getParam('club');
  	return(
	  <ScrollView style={styles.container}>
		  <View style={styles.clubHeader}>
		    <Image source = {{uri: img}} style={styles.clubLogo}/>
		    	<Text style={styles.clubTitle}>{club}</Text>
		  </View>

		  <View style={styles.clubContainer}>
		  	<Divider style={{marginBottom: 30, backgroundColor: '#99cfe0'}}/>
		  	<Text style={styles.clubDescription}>
		  		TO-DO: Add Options to add/view events, add/edit members and maybe files/forms here
		  	</Text>
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
    fontFamily: 'SourceSansPro',
    marginBottom: 10 
  },
  clubContainer:{
    margin: 20
  },
  clubDescription:{
    fontSize: 16,
    fontFamily: 'SourceSansPro',
  }
});