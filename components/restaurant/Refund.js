import React, { Component } from 'react';
import {View, Image, StyleSheet, ImageBackground, ScrollView, Switch} from "react-native";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Ionicons } from '@expo/vector-icons';
import { Container, Form, Label, Input, Header, H1,H2,H3, H4,Title, Item, Icon, Thumbnail, Content, Button, Footer, FooterTab, Badge, Card, CardItem, Body, Text } from 'native-base';
export default class Home extends Component{

  Request(amount){
    fetch(global.HostURL + '/api/Refund', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        User_id : global.Profile.id,
        Amount : amount
      }),
    }).then((response) => response.json())
      .then((responsejson)=>{
        console.log(responsejson);
    }).catch((error) => {
      console.log(error);
      console.log("Transaction failed");
    });

  }

  render(){
    return(
      <Container>
        <Form>
            <Item>
              <Input placeholder="Enter refund amount"/>
            </Item>
            <Button block success onPress={()=> this.Request(1000)}>
              <Text>Refund Now</Text>
            </Button>
          </Form>
      </Container>
    );
  }
}
