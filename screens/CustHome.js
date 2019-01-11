import React, { Component } from "react";
import Icon from 'react-native-vector-icons/Ionicons'
import Home from "../components/customer/Home";
import Favourite from "../components/customer/Favourite";
import GoneSin from "../components/customer/GoneSin";
import Notification from "../components/customer/Notification";
import { createBottomTabNavigator,Header, createStackNavigator,View } from 'react-navigation';
import Search from '../components/customer/Search';
import Restaurantdetail from '../components/customer/Restaurantdetail';
import Login from "./Login";
const User = createStackNavigator({
  AppHome : {
    screen:Home,
  },
  Search:{
    screen:Search
  },
  Restaurantdetail:{
    screen:Restaurantdetail
  },

}, {
   headerMode: 'none'
});
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
    screen: User,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-home" color={tintColor} size={24} />
      )
    }
  },
  Favourite: {
    screen: Favourite,
    tabBarLabel: '',
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="md-heart" color={tintColor} size={24} />
      ),
      tabBarOnPress: ({navigation, defaultHandler})=> {
        fetch(global.HostURL + '/api/Favorite/all?User_id='+ global.Profile.id)
        .then((response) => response.json())
        .then((responseJson) => {
          global.FavList=responseJson;
        })
        .catch((error) => {
          // console.log("Customer noti failed");
        });
        defaultHandler();
      }
    }
  },
  GoneSin: {
    screen: GoneSin,
    tabBarLabel: '',
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-restaurant" color={tintColor} size={24} />
      ),
      tabBarOnPress: ({navigation, defaultHandler})=> {
        fetch(global.HostURL + '/api/Promotion/' + global.Profile.id)
        .then((response) => response.json())
        .then((responseJson) => {
          global.GoneSinList=responseJson;
        })
        .catch((error) => {
          // console.log("Customer noti failed");
        });
        defaultHandler();
      }
    }
  },
  Notification: {
    screen: Notification,
    tabBarLabel: '',
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-notifications" color={tintColor} size={24} />
      ),
      tabBarOnPress: ({navigation, defaultHandler})=> {
        fetch(global.HostURL + '/api/notification/' + global.Profile.id+"?type=customer")
        .then((response) => response.json())
        .then((responseJson) => {
          global.CustNotification=responseJson;
        })
        .catch((error) => {
          // console.log("Customer noti failed");
        });
        defaultHandler();
      }
    }
  }

}, {//router config
    initialRouteName: 'Home',
    order: ['Home','Favourite','GoneSin', 'Notification'],
    //navigation for complete tab navigator
    navigationOptions: {
      tabBarVisible: true
    },
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'grey',
    }
  });
