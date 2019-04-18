import React, { Component } from 'react';
import {AsyncStorage, Image, View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Header, ListItem, SearchBar } from 'react-native-elements';
import ClubInfoScreen from '../screens/ClubInfoScreen';
import firebase from 'firebase';

export default class SearchScreen extends Component {
  static navigationOptions = {
    header: <Header
        centerComponent={<Image source={require('../assets/images/m_trans.png')} 
          style = {{width: 40,height: 40, resizeMode: 'contain'}}/>}
        backgroundImage={{uri: 'https://jssorcdn7.azureedge.net/demos/img/present/02.jpg'}}
        />
  };
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
    };

    this.arrayholder = [];
  }

  async componentDidMount() {
	const userToken = await AsyncStorage.getItem('userToken');
    this.readUserData(userToken);
  }

  readUserData(token) {
    this.setState({ loading: true });
    firebase.database().ref('clubs').on('value', snapshot => {
        var clubs = [];
        var uniq = token.substring(0, token.indexOf('*'));
        snapshot.forEach((child) => {
          clubs.push({
          	uniqname: uniq,
          	clublol : child.key,
            name: child.val().name,
            url: child.val().url,
            descrp: child.val().description,
            email: child.val().email,
            officers: child.val().officers,
            _key: child.key});
        });
      this.arrayholder = clubs;
      this.setState({name: token, data: clubs, loading: false});
    });
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: '#99cfe0'
        }}
      />
    );
  };

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        inputContainerStyle={{backgroundColor:'#fff'}}
        value={this.state.value}
      />
    );
  };

  render() {
    const nav = this.props.navigation;
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: "#fff"}}>
        <FlatList
          data={this.state.data}
          renderItem={({ item, i }) => (
            <ListItem key = {i}
              leftAvatar={{ source: { uri: item.url } }}
              title={item.name}
              onPress={() => nav.navigate('ClubInfo', 
                {uniqname: this.state.name, club: item.name, descrp: item.descrp, img: item.url, email: item.email, 
                  officers: item.officers, clublol: item.clublol })}
            />
          )}
          keyExtractor={item => item.name}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}

{/*  makeRemoteRequest = () => {
    const url = `https://randomuser.me/api/?&results=20`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.results,
          error: res.error || null,
          loading: false,
        });
        this.arrayholder = res.results;
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };*/
}