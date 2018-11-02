import React, { Component } from "react";
import Icon from 'react-native-vector-icons/Ionicons'
import Home from "../components/restaurant/Home";
import QR from "../components/restaurant/QRScan";
import Coins from "../components/restaurant/Coins";

import { createBottomTabNavigator } from 'react-navigation';

export default class CustHome extends Component{
  static navigationOptions = {
    header:null
  }
  render(){
    return(
      <Buttontab/>
    )
  }
}

const Buttontab = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-home" color={tintColor} size={24} />
      )
    }
  },
  QR: {
    screen: QR,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-qr-scanner" color={tintColor} size={24} />
      )
    }
  },
  Coins: {
    screen: Coins,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="logo-bitcoin" color={tintColor} size={24} />
      )
    }
  },

}, {//router config
    initialRouteName: 'Home',
    order: ['QR','Home','Coins'],
    //navigation for complete tab navigator
    navigationOptions: {
      tabBarVisible: true
    },
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'grey'
    }
  });
