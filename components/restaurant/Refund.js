import React, { Component } from 'react';
import {View, Image, StyleSheet, ImageBackground, ScrollView, Switch, Alert} from "react-native";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Ionicons } from '@expo/vector-icons';
import { Container, Form, Label, Input, Header, H1,H2,H3, H4,Title, Item, Icon, Thumbnail, Content, Button, Footer, FooterTab, Badge, Card, CardItem, Body, Text } from 'native-base';
export default class Home extends Component{
  state={
    refund:'',
    myan_pay:''
  };
  RequestRefund(){
    fetch(global.HostURL + '/api/Refund', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        User_id : global.Profile.id,
        Amount : this.state.refund,
        Myan_pay: this.state.myan_pay
      }),
    }).then((response) => response.json())
      .then((responsejson)=>{
        console.log(responsejson);
        if(responsejson=="Not Enough"){
          Alert.alert(
            'Low Balance!',
            'Your balance is lower then amount you entered.',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]
          )
        }else if(responsejson!=null){
          global.Restaurant=responsejson;
          this.input1._root.clear();
          this.input2._root.clear();
          Alert.alert(
            'Request Success!',
            'You will get notification once Amount has been transfered.',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]
          )
        }
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
              <Input onChangeText={(refund) => this.setState({refund:refund})} ref={(ref) => { this.input1 = ref }} placeholder="Enter refund amount"/>
            </Item>
            <Item>
              <Input onChangeText={(myan_pay) => this.setState({myan_pay:myan_pay})} ref={(ref) => { this.input2 = ref }} placeholder="Enter Myan Pay User Account"/>
            </Item>
            <Button block success onPress={()=> this.RequestRefund()}>
              <Text>Refund Now</Text>
            </Button>
          </Form>
      </Container>
    );
  }
}
