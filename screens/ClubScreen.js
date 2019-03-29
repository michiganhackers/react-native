import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Avatar, Button, Header, Icon} from 'react-native-elements';

export default class ClubScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <Header
      leftComponent={<Button icon=
        {<Icon name="arrow-back" onPress={()=>navigation.goBack()}/>} size={15} color='transparent' type='clear'/>}
      centerComponent= {<Text style={{fontFamily: 'SourceSansPro', fontSize: 20, fontWeight: 'bold'}}>
        {navigation.getParam('club', 'A Nested Details Screen')}</Text> }
      rightComponent= {<Button title='Join' titleStyle={{fontWeight: 'bold', color : 'black'}} type='clear'/>}
      backgroundImage={{uri: 'https://jssorcdn7.azureedge.net/demos/img/present/02.jpg'}}
      />
    };
  };

  render(){
    const {navigation} = this.props;
    const club = navigation.getParam('club','N/A');
    return(
      <View style={styles.container}>
        <ScrollView pagingEnabled={true}>
          <View style={{alignItems: 'center'}}>
            <Avatar rounded size="xlarge" 
              source = {{uri:"https://se-infra-imageserver2.azureedge.net/clink/images/d575c35c-d2e0-489d-8a8a-039b0b668c62c21bde67-05e1-4f6e-9e3d-0db57b682736.png?preset=med-sq"}}
              containerStyle={{flex: 1, marginTop: 20}}/>
            <View><Text style={styles.clubTitle}>{club}</Text></View>
          </View>
          <View style={styles.clubContainer}>
            <Text style={styles.clubDescription}>Michigan Hackers is a community where passionate
              students can build and grow relevant skills in a technological and fast-paced world. 
              Our end goal is to provide high quality resources for any and all students to become more
              competent members of society (technically, socially, and professionally) with a computer science twist.
              While connecting students to projects, skills, faculty, companies, and more, we hope to make a large
              university feel smaller and forge lifelong bonds in an inclusive environment while also bridging
              passionate people together. Join our slack or visit our website today! 
              (bit.ly/mhslack and michiganhackers.org)</Text>
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
  clubTitle:{
    fontSize: 30,
    justifyContent: 'center',
    fontFamily: 'SourceSansPro'
  },
  clubContainer:{
    marginLeft:20,
    marginRight:20,
    marginTop:20
  },
  clubDescription:{
    fontSize: 18,
    fontFamily: 'SourceSansPro',
  }
});