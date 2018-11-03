import React, { Component } from 'react';
import {View, Image, StyleSheet, ImageBackground, ScrollView, Switch} from "react-native";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Ionicons } from '@expo/vector-icons';
import { Container,Textarea, Left, Right, Form, Label, Input, Header, H1,H2,H3, H4,Title, Item, Icon, Thumbnail, Content, Button, Footer, FooterTab, Badge, Card, CardItem, Body, Text } from 'native-base';
export default class Register extends Component{
  static navigationOptions = {
    header:null
  }
  render(){
    return(
      <Container>
        <Header style = {{height: 70,backgroundColor: '#a3080c', color: 'orange', paddingBottom: 0, paddingTop: 0}}>
          <Body>
            <Button transparent >
              <Icon style = {{color: 'white', paddingLeft:20}} name='ios-business' />
              <Text style = {{color: 'white', width:'100%'}}>Register restaurant</Text>
            </Button>
          </Body>
          <Right>
          </Right>
        </Header>

        <Grid>
        <Content>
          <Card style={{padding:10}}>
          <Form>
            <Row>
              <Col style={{width:100}}>
                <Image style={{ height: 100, width:100, flex: 1 }} source={{uri : 'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'}} />
              </Col>
              <Col>
                <Item >
                  <Icon active name='ios-contact' />
                  <Input placeholder="Enter Name"/>
                </Item>
                <Item >
                  <Icon active name='ios-contacts' />
                  <Input placeholder="Enter Myanpay username"/>
                </Item>
              </Col>
            </Row>
            <Row>
              <Col>
                <Item>
                  <Icon active name='md-key' />
                  <Input placeholder="Enter password"/>
                </Item>
                <Item>
                  <Icon active name='md-key' />
                  <Input placeholder="Confirm passowrd"/>
                </Item>
                <Item >
                  <Icon active name='ios-mail' />
                  <Input placeholder="Enter email address"/>
                </Item>
                <Item >
                  <Icon active name='ios-call' />
                  <Input placeholder="Enter phone number"/>
                </Item>
                <Item >
                  <Icon active name='ios-compass' />
                  <Input placeholder="Enter township"/>
                </Item>
                  <Textarea rowSpan={5} bordered placeholder="Enter Address" style={{padding:10}} />
              </Col>
            </Row>
            <Row>
              <Col style={{padding:10}}>
                <Button full warning textStyle={{color:'white'}} style={{alignSelf:'center',width: 150}} >
                  <Text> Cancel </Text>
                </Button>
              </Col>
              <Col style={{padding:10}}>
              <Button full danger textStyle={{color:'white'}} style={{alignSelf:'center',width: 150}} >
                  <Text>Sign Up </Text>
                </Button>
              </Col>
            </Row>
          </Form>
          </Card>
          </Content>
        </Grid>
      </Container>
    );
  }
}
