import React, { Component } from 'react';
import {View, Image, StyleSheet, ImageBackground, ScrollView, Switch} from "react-native";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Header, Tab, Tabs, TabHeading, Left, Right, Item, Input, Icon, Thumbnail, Content, Button, Footer, FooterTab, Badge, Card, CardItem, Body, Text } from 'native-base';
import ToggleSwitch from 'toggle-switch-react-native';
import Buy from './Buy';
import Refund from './Refund';

export default class Coins extends Component{
  componentDidMount() {
    let that = this;
    setInterval(() => {
        that.setState({restaurant: global.Restaurant});
    }, 1000);
  }
  state={
    restaurant:{},
  }
  render(){
    return(
      <Container>
      <Header style = {{height: 60,backgroundColor: '#a3080c' , paddingBottom: 0, paddingTop: 0}}>
        <Body style={{width:300}}>
              <Text style = {{color: 'white'}}>Available Coins: {this.state.restaurant.Rest_coin}</Text>
        </Body>
        <Right>
              <Text style = {{color: 'white'}}>Spicial Coins : {this.state.restaurant.Rest_special_coin}</Text>
        </Right>
      </Header>
        <Tabs locked={true}>
          <Tab heading="Buy Coin" tabStyle={{ backgroundColor: "#ffbf00"}} textStyle={{color:'white'}} activeTabStyle={{ backgroundColor: "#ffbf00" }}>
              <Buy />
          </Tab>
          <Tab heading="Refund" tabStyle={{ backgroundColor: "#ffbf00"}} textStyle={{color:'white'}} activeTabStyle={{ backgroundColor: "#ffbf00" }}>
              <Refund />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
