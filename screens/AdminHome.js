import React, { Component } from "react";
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from 'react-navigation';

import NNoti from "../components/admin/NNoti";
import PNoti from "../components/admin/PNoti";
import Home from "../components/admin/Home";
import Security from "../components/admin/Security";
import Admins from "../components/admin/Admins";

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
  NNoti: {
    screen: NNoti,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-notifications" color={tintColor} size={24} />
      )
    }
  },
  PNoti: {
    screen: PNoti,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-notifications-outline" color={tintColor} size={24} />
      )
    }
  },
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-home" color={tintColor} size={24} />
      )
    }
  },
  Security: {
    screen: Security,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-lock" color={tintColor} size={24} />
      )
    }
  },
  Admins: {
    screen: Admins,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="md-people" color={tintColor} size={24} />
      )
    }
  },

}, {//router config
    initialRouteName: 'Home',
    order: ['NNoti','PNoti','Home','Security','Admins'],
    //navigation for complete tab navigator
    navigationOptions: {
      tabBarVisible: true
    },
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'grey'
    }
  });