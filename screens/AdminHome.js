import React, { Component } from "react";
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from 'react-navigation';
import {View,  Modal, TextInput, Alert, StyleSheet } from "react-native";
import {Content, Text, Button, Icon, Left, Body, Right } from 'native-base';

import Notification from "../components/admin/NNoti";
import Refund from "../components/admin/PNoti";
import Home from "../components/admin/Home";
import Admins from "../components/admin/Admins";

export default class AdminHome extends Component{

  state={
    input:'',
    modalVisible:false,
  }


  getSystemStatus(){
    fetch(global.HostURL + '/api/Admin')
   .then((response) => response.json())
   .then((responseJson) => {
     global.SystemStatus = responseJson;
   })
   .catch((error) => {
     console.log("Admin status failed");
   });
  }

  componentWillMount() {
    this.getSystemStatus();
  }

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
  Notification: {
    screen: Notification,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-notifications" color={tintColor} size={24} />
      ),
      tabBarOnPress: ({navigation, defaultHandler})=> {
        fetch(global.HostURL + '/api/notification/12?type=admin')
        .then((response) => response.json())
        .then((responseJson) => {
          global.AdminNotification=responseJson;
        })
        .catch((error) => {
          // console.log("admin noti failed");
        });
        defaultHandler();
      }
    }
  },
  Refund: {
    screen: Refund,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-notifications-outline" color={tintColor} size={24} />
      ),
      tabBarOnPress: ({navigation, defaultHandler})=> {
        fetch(global.HostURL + '/api/Refund')
        .then((response) => response.json())
        .then((responseJson) => {
          global.RefundNotification=responseJson;
        })
        .catch((error) => {
          // console.log("admin noti failed");
        });
        global.adminModel=true;
        defaultHandler();
      }
    }
  },
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-home" color={tintColor} size={24} />
      ),
      tabBarOnPress:({navigation, defaultHandler})=>{
        fetch(global.HostURL + '/api/Admin')
       .then((response) => response.json())
       .then((responseJson) => {
         global.SystemStatus = responseJson;
       })
       .catch((error) => {
         console.log("Admin status failed");
       });
       defaultHandler();
      }
    }
  },
  Admins: {
    screen: Admins,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="md-people" color={tintColor} size={24} />
      ),
      tabBarOnPress:({navigation, defaultHandler})=>{
        global.adminModel=true;
        defaultHandler();
      }
    }
  },

}, {//router config
    initialRouteName: 'Home',
    order: ['Notification','Refund','Home','Admins'],
    //navigation for complete tab navigator
    navigationOptions: {
      tabBarVisible: true
    },
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'grey'
    }
  });

  const styles= StyleSheet.create({
      input: {
          borderColor: '#ff7d21',
          borderRadius: 5,
          borderWidth: 1,
          width:'100%',
          height:40
       },
    })
