import React from 'react';
import {AsyncStorage, Image,ImageBackground,FlatList,Platform,ScrollView,StyleSheet,Text, 
  TouchableHighlight,TouchableOpacity,View,Modal,Linking} from 'react-native';
import {Avatar, Button, Divider, ListItem, 
  Header, SocialIcon, Icon, Input, Overlay} from 'react-native-elements';
import { WebBrowser } from 'expo';
import firebase from 'firebase';

export default class ClubHomeScreen extends React.PureComponent {
  constructor(props){ 
    super(props);
  }

  static navigationOptions = ({navigation}) => {
    return {
      header: <Header
      leftComponent={
        <Button icon= {<Icon name="arrow-back" onPress={()=>navigation.goBack()}/>} 
        size={15} color='transparent' type='clear'/>}

      centerComponent= {<Text style={{fontFamily: 'SourceSansPro', fontSize: 20, fontWeight: 'bold'}}>
        {navigation.getParam('club')}</Text> }

      backgroundImage={{uri: 'https://jssorcdn7.azureedge.net/demos/img/present/02.jpg'}}
      />
    };
  };

  renderSeparator = () => {
    return (
      <View style={{height: 1, width: '100%', backgroundColor: '#99cfe0'}}/>
    );
  };

  render(){
    const {navigation} = this.props;
    const club = navigation.getParam('club');
    const descrp = navigation.getParam('descrp');
    const img = navigation.getParam('img');
    const email = navigation.getParam('email');
    const officers = navigation.getParam('officers');
    return(
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.clubHeader}>
            <Image
              source = {{uri: img}}
              style={styles.clubLogo}/>
            <Text style={styles.clubTitle}>{club}</Text>
          </View>

          <View style={styles.clubContainer}>
            <Divider style={{marginBottom: 30, backgroundColor: '#99cfe0'}}/>

            <Text style={styles.clubDescription}>{descrp}</Text>

            <Divider style={{marginTop: 30, marginBottom: 30, backgroundColor: '#99cfe0'}}/>

            <Text style={styles.subtitle}>Contact Information</Text>
            <Text style={styles.clubDescription}>
              Ann Arbor, MI{"\n"}United States{"\n\n"}
            </Text>
            <TouchableHighlight onPress={() => Linking.openURL(`${"mailto:"} ${email}`)}>
              <Text style={styles.email}>{email}</Text>
            </TouchableHighlight> 

            <View style={{marginTop: 10, flexDirection: 'row'}}>
              <Icon raised name = 'web' color='#00aced' type = 'material-community'
                onPress={()=>{WebBrowser.openBrowserAsync("http://michiganhackers.org")}}/>
              <SocialIcon light type = 'instagram' underlayColor='3f729b'
                onPress={()=>{WebBrowser.openBrowserAsync("https://www.instagram.com/michiganhackers/")}}/>
              <SocialIcon light type = 'youtube' 
                onPress={()=>{WebBrowser.openBrowserAsync("http://youtube.com/MichiganHackers")}}/>
              <SocialIcon light type = 'facebook'
                onPress={()=>{WebBrowser.openBrowserAsync("http://facebook.com/MichiganHackers")}}/>
              <SocialIcon light type = 'twitter'
                onPress={()=>{WebBrowser.openBrowserAsync("https://twitter.com/MichiganHackers")}}/>
            </View>

            <Divider style={{marginTop: 30, marginBottom: 30, backgroundColor: '#99cfe0'}}/>

            <View style={{flexDirection:'row'}}>
              <Text style={styles.subtitle}>Officers</Text>
              {/* <Button style={{justifyContent: 'right'}} title='Full Roster'
                 onPress={()=> WebBrowser.openBrowserAsync("https://maizepages.umich.edu/organization/michiganhackers/roster")}/>*/}
            </View>

            {Object.keys(officers).map((key,i) => (
              <ListItem key = {i} title={key} titleStyle={styles.clubDescriptions}
                subtitle={officers[key]} subtitleStyle={styles.sub} topDivider={true}/>
            ))}
          </View>
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
  },
  email:{
    fontSize: 16,
    fontFamily: 'SourceSansPro',
    textDecorationLine: 'underline',
    color: '#99cfe0'
  }
});