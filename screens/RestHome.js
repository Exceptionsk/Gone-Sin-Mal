import React, { Component } from "react";
import Icon from 'react-native-vector-icons/Ionicons'
import Home from "../components/restaurant/Home";
import QR from "../components/restaurant/QRScan";
import Coins from "../components/restaurant/Coins";
import Notification from "../components/restaurant/Notification";

import { createBottomTabNavigator } from 'react-navigation';

export default class RestHome extends Component{
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
      ),
      tabBarOnPress: ({navigation, defaultHandler})=> {
        fetch(global.HostURL + '/api/restaurant?id=' + global.Profile.id + "&profile=true")
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("gg");
          console.log(responseJson);
         global.Restaurant= responseJson
        })
        .catch((error) => {
          console.error(error);
          console.log("Home failed");
        });
        fetch(global.HostURL + '/api/Promotion/' + global.Restaurant.Rest_id, {
          method: 'DELETE'
        }).then((response) => response.json())
          .then((responsejson)=>{
          }).catch((error)=>{
             console.log(error);
          });
        defaultHandler();
      }
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
      ),
      tabBarOnPress: ({navigation, defaultHandler})=> {
        global.authorized=false;
        global.adminModel=true;
        defaultHandler();
      }
    }
  },
  Notification: {
    screen: Notification,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-notifications" color={tintColor} size={24} />
      ),
      tabBarOnPress: ({navigation, defaultHandler})=> {
        fetch(global.HostURL + '/api/notification/' + global.Profile.id+"?type=restaurant")
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("rest noti here");
          global.RestNotification=responseJson;
        })
        .catch((error) => {
          // console.log("Restaurant noti failed");
        });
        global.authorized=false;
        global.adminModel=true;
        defaultHandler();
      }
    }
  },

}, {//router config
    initialRouteName: 'Home',
    order: ['QR','Home','Coins','Notification'],
    //navigation for complete tab navigator
    navigationOptions: {
      tabBarVisible: true
    },
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'grey'
    }
  });
