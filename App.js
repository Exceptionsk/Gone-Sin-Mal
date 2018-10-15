import React, { Component } from 'react';
import { AppLoading, Font } from 'expo';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {Router, Scene} from 'react-native-router-flux';
import { AppRegistry, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Footer_main from "./components/Footer_main";
import Home from "./components/Home";
import Fav from "./components/fav";

export default class AnatomyExample extends Component {
  state = {
  fontLoaded: false
};
async componentWillMount() {
    try {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
      });
      this.setState({ fontLoaded: true });
    } catch (error) {
      console.log('error loading icon fonts', error);
    }
  };
  login = async () => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(id, {
      permissions: ['public_profile'],
    });
  if (type === 'success') {
    // Get the user's name using Facebook's Graph API
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}`);
      Alert.alert(
      'Logged in!',
      `Hi ${(await response.json()).name}!`,
    );

  }
};

  get button() {
    return(
      <TouchableOpacity onPress={() => this.login()}>
        <Button full light>
          <Text>Light</Text>
        </Button>
      </TouchableOpacity>
    )
  };
  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    }
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View>
          <Router>
            <Scene key="root">
              <Scene key="home" component={Home}/>
              <Scene key="fav" component={Fav}/>
            </Scene>
          </Router>
          </View>
        </Content>
        <Footer>
            <Footer_main/>
        </Footer>
      </Container>
    );
  }
}
