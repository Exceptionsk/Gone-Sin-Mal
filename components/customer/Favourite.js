import React, { Component } from 'react';
import {View, Image, StyleSheet, ImageBackground, ScrollView, Switch} from "react-native";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Ionicons } from '@expo/vector-icons';
import { Container, Header, H1,H2,H3, H4,Title, Item, Input, Icon, Thumbnail, Content, Button, Footer, FooterTab, Badge, Card, CardItem, Body, Text } from 'native-base';
import ToggleSwitch from 'toggle-switch-react-native';
export default class Home extends Component{
  constructor()
  {
    super();
    this.items = [
      {name:'KFC', img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {name:'Gong Cha', img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {name:'Fuji', img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {name:'YKKO', img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {name:'Golden Pot', img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
    ];
  }
  render(){
    return(
      
      <Container>
        <Grid>
              <Row style={{height: 50}}>
                <Col style={{ backgroundColor: '#a3080c', height: 50, paddingTop: 20 }}>
                   <H3 style={{ color: 'white', fontWeight: "bold", paddingTop: 7, paddingLeft: 8 }}>Favourite List!</H3>
                </Col>
              </Row>
          <Content style = {{backgroundColor:'#dfdfdf'}}>
              {
                this.items.map((item, key)=>
                  (
                    <Row key={key}>
                      <Col style={{ backgroundColor: 'white', height: 150, width: 170 }}>
                        <View style = {styles.imgcol}>
                          <Button transparent style={{height: '100%', width: '100%'}}>
                            <Thumbnail style={styles.image} square large source={{uri : item.img}} />
                          </Button>
                        </View>
                      </Col>
                      <Col style={{ backgroundColor: 'white', height: 150 }}>
                        <View style = {styles.imgcoltwo}>
                          <Text style={{color: 'black',paddingBottom: 10}}>{item.name}</Text>
                          <Button style={{backgroundColor:'orange'}}>
                          <Text>Get Direction</Text>
                          </Button>
                        </View>
                      </Col>
                      <Col style={{ backgroundColor: 'white', height: 150, width: 70 }}>
                        <View style = {styles.imgcolthree}>
                          <Ionicons name="md-heart" size={30} color="red" /> 
                        </View>
                      </Col>
                  </Row>
                  )
                )
              }

          </Content>
        </Grid>
      </Container>
    );
  }
}
const styles= StyleSheet.create({
  image:{
    height: '100%',
    width: '100%',
    borderColor: '#787878',
    borderWidth: 1
  },
  imagetwo:{
    height: 125,
    width: 120,
    borderColor: '#a3a3a3',
    borderWidth: 0.5,
    padding: 0
  },
  imgcol:{
    padding: 20,
    color: 'white',
  },
  imgcoltwo:{
    paddingTop: 20,
    paddingLeft: 20,
    color: 'white',
  },
  imgcolthree:{
    paddingTop: 20,
    color: 'white',
  },
  imgcolfour:{
    paddingTop: 20,
    paddingLeft:20,
    paddingRight:0,
    color: 'white',
  },
  container:{
    flex:1,
    width:'100%',
    height:'100%',
  }
})
