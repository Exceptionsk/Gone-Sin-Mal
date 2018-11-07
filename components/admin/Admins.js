import React, { Component } from 'react';
import {View, Image, StyleSheet, ImageBackground, ScrollView, Switch, Modal, AsyncStorage } from "react-native";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container,List, Left, Header, ListItem, H1,H2,H3, H4,Title,Right, Item, Input, Icon, Thumbnail, Content, Button, Footer, FooterTab, Badge, Card, CardItem, Body, Text } from 'native-base';

export default class Admins extends Component {
  state = {
    value:'bleach',
    Users:[],
  };
  handleChange(e) {
       this.setState({
         value: e.nativeEvent.text,
       });
     }

  handleSearch(){
    return fetch(global.HostURL + '/api/User')
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      this.setState({
         Users: responseJson,
       }, function(){

       });
    })
    .catch((error) => {
      console.error(error);
    });
  }
  render() {
    return (
      <Container>
      <Header style = {{height: 50,backgroundColor: '#a3080c', color: 'orange', paddingBottom: 0, paddingTop: 0}}>
      <Body>
        <Text style = {{color: 'white'}}>Add or remove Admin</Text>
      </Body>
      </Header>
      <Header onSubmitEditing={this.handleSearch.bind(this)} onChange={this.handleChange.bind(this)} searchBar rounded style = {{backgroundColor:'white', height: 60, paddingBottom: 10, paddingTop: 10}}>
          <Item style = {{borderColor: 'orange', borderTopWidth: 1, borderRightWidth: 1, borderLeftWidth: 1}}>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
          </Item>
        </Header>
        <Content>
        {
          this.state.Users.map((item, key)=>
            (
              <List>
                <ListItem avatar>
                  <Left>
                    <Thumbnail source={{ uri: 'https://graph.facebook.com/'+ item.User_id + '/picture?type=normal' }} />
                  </Left>
                  <Body>
                    <Text>{item.User_Name}</Text>
                    <Text note>Doing what you like will always keep you happy . .</Text>
                  </Body>
                  <Right>
                    <Text note>3:43 pm</Text>
                  </Right>
                </ListItem>
              </List>
            )
          )
        }

        </Content>
      </Container>
    );
  }
}
