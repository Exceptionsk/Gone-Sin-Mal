import React, { Component } from 'react';
import { View, Image, StyleSheet, ImageBackground, ScrollView  } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Badge, H3, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import {Actions} from 'react-native-router-flux';

export default class NNoti extends Component {
  constructor()
  {
    super();
    this.items = [
      {name:'Lotteria',
      description:'Lotteria has bought 300 special coins for 10 users.',
      img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {name:'Lotteria',
      description:'Lotteria has bought 300 special coins for 10 users.',
      img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {name:'Lotteria',
      description:'Lotteria has bought 300 special coins for 10 users.',
      img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {name:'Lotteria',
      description:'Lotteria has bought 300 special coins for 10 users.',
      img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {name:'Lotteria',
      description:'Lotteria has bought 300 special coins for 10 users.',
      img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {name:'Lotteria',
      description:'Lotteria has bought 300 special coins for 10 users.',
      img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {name:'Lotteria',
      description:'Lotteria has bought 300 special coins for 10 users.',
      img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {name:'Lotteria',
      description:'Lotteria has bought 300 special coins for 10 users.',
      img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
    ];
  }
  render() {
    return(
    <Container>
          <Header style = {{height: 110,backgroundColor: '#a3080c' , color: 'orange', paddingBottom: 0, paddingTop: 0}}>
            <Button transparent style={{height:70}}>
                <Thumbnail style = {{ marginLeft:15, borderColor: 'white', borderWidth: 2}}  source={require('../../assets/saitama.jpg')} />
                <Text style = {{color: 'white'}}>Saitama</Text>
            </Button>
          </Header>
        <Grid>
            <Row style={{height: 50}}>
                  <Col style={{ height: 50, paddingTop: 15 }}>
                    <H3 style={{ fontWeight: "bold", paddingTop: 0, paddingLeft: 8 }}>Normal Notification</H3>
                  </Col>
            </Row>
            <Content style = {{backgroundColor:'#dfdfdf'}}>
            {
                this.items.map((item, key)=>
                  (
                <Row key={key}>
                  <Col style={{ backgroundColor: '#dfdfdf', height: '100%', width: '100%'}}>
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
