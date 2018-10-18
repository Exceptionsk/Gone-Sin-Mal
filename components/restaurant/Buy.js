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
      {name:'100 coins', img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {name:'200 coins', img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {name:'500 coins', img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {name:'1000 coins', img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {name:'10000 coins', img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
    ];
    this.items1 = [
      {name:'5000 coins', img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {name:'10000 coins', img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {name:'30000 coins', img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {name:'5000 coins', img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {name:'100000 coins', img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
    ];
  }
  render(){
    return(
      <Container>
        <Grid>
          <Content style = {{backgroundColor:'#dfdfdf'}}>
          <Row>
            <Col style={{ backgroundColor: 'white', height: 40 }}>
              <H3 style={{ color: 'black',fontWeight: "bold", paddingLeft: 10, paddingTop: 10 }}>
                Buy Normal coins
              </H3>
            </Col>
          </Row>
          <View style={{backgroundColor: "white"}}>
            <ScrollView horizontal={true}>
              <Row>
              {
                this.items.map((item, key)=>
                  (
                    <Col style={{ backgroundColor: 'white', height: 180, width: 140,marginRight:0 }} key={key}>
                        <View style = {styles.imgcolfour}>
                          <Button transparent style={{height: 120 , width: '100%'}} >
                            <Thumbnail style={styles.imagetwo} source={{uri : item.img}} />
                          </Button>
                          <Button transparent textStyle={{color: '#87838B'}}>
                            <Text style={{paddingTop:14,paddingBottom: 23, color: 'black', paddingLeft:3 }}>{item.name}</Text>
                          </Button>
                        </View>
                    </Col>
                  )
                )
              }
              </Row>
            </ScrollView>
          </View>
          <Row>
            <Col style={{ backgroundColor: 'white', height: 40 }}>
              <H3 style={{ color: 'black',fontWeight: "bold", paddingLeft: 10, paddingTop: 10 }}>
                Buy Special coins
              </H3>
            </Col>
          </Row>
          <View style={{backgroundColor: "white"}}>
            <ScrollView horizontal={true}>
              <Row>
              {
                this.items1.map((item, key)=>
                  (
                    <Col style={{ backgroundColor: 'white', height: 180, width: 140,marginRight:0 }} key={key}>
                        <View style = {styles.imgcolfour}>
                          <Button transparent style={{height: 120 , width: '100%'}} >
                            <Thumbnail style={styles.imagetwo} source={{uri : item.img}} />
                          </Button>
                          <Button transparent textStyle={{color: '#87838B'}}>
                            <Text style={{paddingTop:14,paddingBottom: 23, color: 'black', paddingLeft:3 }}>{item.name}</Text>
                          </Button>
                        </View>
                    </Col>
                  )
                )
              }
              </Row>
            </ScrollView>
          </View>
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
