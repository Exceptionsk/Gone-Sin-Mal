import React, { Component } from 'react';
import {View, Image, StyleSheet, ImageBackground, ScrollView, Switch} from "react-native";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Left, Right, Header, Icon, DeckSwiper, Thumbnail, Content, Button, Card, CardItem, Body, Text } from 'native-base';
import ToggleSwitch from 'toggle-switch-react-native';

const cards = [
  {
    name: 'Kitchen View',
    image: 'https://myanimelist.cdn-dena.com/images/anime/8/41125.jpg',
  },
  {
    name: 'Something View 1',
    image: 'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg',
  },
  {
    name: 'Something View 2',
    image: 'https://myanimelist.cdn-dena.com/images/anime/3/51045.jpg',
  },
];

export default class Home extends Component{

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
      <Header style = {{height: 80,backgroundColor: '#a3080c', color: 'orange', paddingBottom: 0, paddingTop: 0}}>
      <Left>
        <Button transparent full success style={{height:70}} onPress={() => this.props.navigation.navigate('Userprofile')}>
            <Thumbnail style = {{borderColor: 'white', borderWidth: 2}}  source={require('../../assets/usothree.jpg')} />
        </Button>
      </Left>
      <Body>
        <Text style = {{color: 'white'}}>  KFC something....</Text>
      </Body>
      </Header>
      <Content contentContainerStyle={{ flex: 1 }}>
        <ScrollView>
        <Grid>
          <Row >
            <Col style={{height:350}}>
            <View>
                <DeckSwiper
                  dataSource={cards}
                  renderItem={item =>
                    <Card style={{ elevation: 3 }}>
                      <CardItem cardBody>
                        <Image style={{ height: 300, width:'100%', flex: 1 }} source={{uri : item.image}} />
                      </CardItem>
                      <CardItem>
                        <Icon name="md-images" style={{ color: '#ED4A6A' }} />
                        <Text>{item.name}</Text>
                        <Body>

                        </Body>
                        <Right>
                         <Icon name="md-create" style={{ color: '#ED4A6A' }} />
                        </Right>
                      </CardItem>
                    </Card>
                  }
                />
              </View>
            </Col>
          </Row>
          <Row>
          <Col>
          <View>
             <Card>
                 <CardItem>
                     <Left>
                      <Icon name="ios-compass"/>
                      <Text> afassdf asdf dsfsasdfdsfsdsdfasdfsdfdasf sdfasdfasdf</Text>
                     </Left>
                     <Right>
                      <Icon name="md-create" style={{ color: '#ED4A6A' }} />
                     </Right>
                 </CardItem>
                 <CardItem>
                   <Left>
                    <Icon name="ios-call"/>
                    <Text>+959656423812</Text>
                   </Left>
                   <Right>
                    <Icon name="md-create" style={{ color: '#ED4A6A' }} />
                   </Right>
                 </CardItem>
                 <CardItem>
                   <Left>
                    <Icon name="md-mail"/>
                    <Text>minthukhant.it@gmail.com</Text>
                   </Left>
                   <Right>
                    <Icon name="md-create" style={{ color: '#ED4A6A' }} />
                   </Right>
                 </CardItem>
             </Card>
          </View>
          </Col>
          </Row>
        </Grid>
        </ScrollView>
      </Content>
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
