import React, { Component } from 'react';
import {View, Image, StyleSheet, ImageBackground, ScrollView, Switch} from "react-native";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Header, Tab, Tabs, TabHeading, Left, Right, Item, Input, Icon, Thumbnail, Content, Button, Footer, FooterTab, Badge, Card, CardItem, Body, Text } from 'native-base';
import ToggleSwitch from 'toggle-switch-react-native';
import Buy from './Buy';
import Refund from './Refund';

export default class Coins extends Component{

  constructor()
  {
    super();
    this.items = [
      {name:'KFC', img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {name:'Sar Mal', img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {name:'Gone Sin', img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {name:'YKKO', img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {name:'Golden Pot', img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
    ];
  }
  render(){
    return(
      <Container>
      <Header style = {{height: 60,backgroundColor: '#a3080c' , color: 'orange', paddingBottom: 0, paddingTop: 0}}>
        <Body style={{width:300}}>
              <Text style = {{color: 'white'}}>Available Coins: 1023</Text>
        </Body>
        <Right>
              <Text style = {{color: 'white'}}>Spicial Coins : 414</Text>
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
