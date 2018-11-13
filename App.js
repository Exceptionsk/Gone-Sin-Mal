import React, { Component } from 'react';
import { AppLoading, Font } from 'expo';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Text } from 'native-base';
import {Router, Scene, Stack} from 'react-native-router-flux';
import { AppRegistry, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {NativeRouter, Switch, Route} from "react-router-native";
import { TabNavigator, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons'

import NavigationService from './NavigationService';

import CustHome from "./screens/CustHome";
import RestHome from "./screens/RestHome";
import LoginScreen from "./screens/Login";
import AdminHome from "./screens/AdminHome";
import Register from "./screens/Register";


const TopLevelNavigator = createStackNavigator({
  Login: {screen: LoginScreen},
  CustHome: {screen: CustHome},
  RestHome: {screen: RestHome},
  AdminHome: {screen: AdminHome},
  Register: {screen: Register},
});

export default class Start extends Component {
  constructor(){
    super();
    global.HostURL = "http://192.168.8.101:2940",
    global.Profile={}
  }
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

  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    }
    return (
        // <AppNavigator/>
        <TopLevelNavigator
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}
