import React, { Component } from 'react';
import { View, Image, StyleSheet, ImageBackground, ScrollView  } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Badge, H3, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import {Actions} from 'react-native-router-flux';

export default class Notification extends Component {
  constructor()
  {
    super();
    this.items = [
      {name:'KFC',
      description:'You have gained 500 points from KFC. Please Keep in mind that these points are only valid before the expire date.',
      img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {name:'KFC',
      description:'You have gained 500 points from KFC. Please Keep in mind that these points are only valid before the expire date.',
      img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {name:'KFC',
      description:'You have gained 500 points from KFC. Please Keep in mind that these points are only valid before the expire date.',
      img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {name:'KFC',
      description:'You have gained 500 points from KFC. Please Keep in mind that these points are only valid before the expire date.',
      img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {name:'KFC',
      description:'You have gained 500 points from KFC. Please Keep in mind that these points are only valid before the expire date.',
      img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {name:'KFC',
      description:'You have gained 500 points from KFC. Please Keep in mind that these points are only valid before the expire date.',
      img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {name:'KFC',
      description:'You have gained 500 points from KFC. Please Keep in mind that these points are only valid before the expire date.',
      img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {name:'KFC',
      description:'You have gained 500 points from KFC. Please Keep in mind that these points are only valid before the expire date.',
      img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
    ];
  }
  render() {
    return(
    <Container>
          <Header style = {{height: 110,backgroundColor: '#a3080c' , color: 'orange', paddingBottom: 0, paddingTop: 0}}>
            <Button transparent style={{height:70}} onPress={() => this.props.navigation.navigate('Userprofile')}>
                <Thumbnail style = {{ marginLeft:15, borderColor: 'white', borderWidth: 2}}  source={require('../../assets/usothree.jpg')} />
                <Text style = {{color: 'white'}}>BitGeeks</Text>
            </Button>
            <Button transparent>
                <Text style = {{color: 'white'}}>Available Coin : 1,866P</Text>
            </Button>
          </Header>
        <Grid>
          <Row style={{height: 50}}>
                  <Col style={{ height: 50, paddingTop: 15 }}>
                    <H3 style={{ fontWeight: "bold", paddingTop: 0, paddingLeft: 8 }}>Notification</H3>
                  </Col>
            </Row>
            <Content style = {{backgroundColor:'#dfdfdf'}}>
            {
                this.items.map((item, key)=>
                  (
                <Row key={key}>
                  <Col style={{ backgroundColor: '#dfdfdf', height: 105, width: '100%'}}>
                    <Card style={{flex: 0, marginLeft: 0, width: '100%' }}>
                            <CardItem>
                            <Left>
                                <Thumbnail source={{uri : item.img}} />
                                <Body>
                                <Text style={{fontWeight:'bold',fontSize:20,color:'#484848' }}>{item.name}</Text>
                                <Text style={{textAlign:'justify',color:'#5d5d5d'}}>{item.description}</Text>
                                </Body>
                            </Left>
                            </CardItem>
                    </Card>
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