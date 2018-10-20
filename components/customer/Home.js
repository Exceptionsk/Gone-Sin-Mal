import React, { Component } from 'react';
import {View, Image, StyleSheet, ImageBackground, ScrollView, Switch, Modal} from "react-native";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Header, H1,H2,H3, H4,Title,Right, Item, Input, Icon, Thumbnail, Content, Button, Footer, FooterTab, Badge, Card, CardItem, Body, Text } from 'native-base';
import ToggleSwitch from 'toggle-switch-react-native';
import User from './Userprofile';

export default class Home extends Component{
  state = {
    modalVisible: false,
  };
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
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
      <Header style = {{height: 110,backgroundColor: '#a3080c' , color: 'orange', paddingBottom: 0, paddingTop: 0}}>
        <Button transparent style={{height:70}} onPress={() => {this.setModalVisible(true);}}>
            <Thumbnail style = {{ marginLeft:15, borderColor: 'white', borderWidth: 2}}  source={require('../../assets/usothree.jpg')} />
            <Text style = {{color: 'white'}}>BitGeeks</Text>
        </Button>
        <Button transparent>
            <Text style = {{color: 'white'}}>Available Coin : 1,866P</Text>
        </Button>
        <Modal
          animationType="slide"
          transparent={false}
          onRequestClose={()=>{this.setModalVisible(!this.state.modalVisible);}}
          visible={this.state.modalVisible}>
          <Header style = {{height: 40,backgroundColor: '#a3080c' , color: 'orange', paddingBottom: 0, paddingTop: 0}}>
          <Right>
            <Button transparent onPress={()=>{this.setModalVisible(!this.state.modalVisible);}}>
                <Icon name="close"/>
            </Button>
            </Right>
          </Header>
          <User/>
        </Modal>
      </Header>
      <Header searchBar rounded style = {{backgroundColor:'white', height: 60, paddingBottom: 10, paddingTop: 10}}>
          <Item style = {{backgroundColor: 'white' ,borderColor: 'orange', borderTopWidth: 1, borderRightWidth: 1, borderLeftWidth: 1}}>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
          </Item>
        </Header>
        <Grid>
          <Content style = {{backgroundColor:'#dfdfdf'}}>
            <Row>
              <Col style={{ backgroundColor: 'white', height: 40 }}>
                <H2 style={{ color: 'black',fontWeight: "bold", paddingLeft: 10, paddingTop: 10 }}>
                  Recommendation
                </H2>
              </Col>
            </Row>
            <Card style = {{height: 190,width: '100%',paddingLeft:0,marginLeft:0, marginBottom: 10,marginTop: 0}}>
                <CardItem style = {{width: '100%'}}>
                  <Body>
                    <View>
                      <ScrollView horizontal={true}>
                        <Row>
                        {
                          this.items.map((item, key)=>
                            (
                              <Col style={{ backgroundColor: 'white', height: 180, width: 140,marginRight:0 }} key={key}>
                                  <View style = {styles.imgcolfour}>
                                    <Button transparent style={{height: 120 , width: '100%'}} onPress={() => this.props.navigation.navigate('Restaurantdetail')}>
                                      <Thumbnail style={styles.imagetwo} square source={{uri : item.img}} />
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
                  </Body>
                </CardItem>
              </Card>
              <Row>
                <Col style={{ backgroundColor: 'white', height: 40 }}>
                  <H2 style={{ color: 'black',fontWeight: "bold", paddingLeft: 10, paddingTop: 10 }}>
                    New Restaurants
                  </H2>
                </Col>
              </Row>
              <Card style = {{height: 190,width: '100%',paddingLeft:0,marginLeft:0, marginBottom: 10,marginTop: 0}}>
                  <CardItem style = {{width: '100%'}}>
                    <Body>
                      <View>
                        <ScrollView horizontal={true}>
                          <Row>
                          {
                            this.items.map((item, key)=>
                              (
                                <Col style={{ backgroundColor: 'white', height: 180, width: 140,marginRight:0 }} key={key}>
                                    <View style = {styles.imgcolfour}>
                                      <Button transparent style={{height: 120 , width: '100%'}} >
                                        <Thumbnail style={styles.imagetwo} square source={{uri : item.img}} />
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
                    </Body>
                  </CardItem>
                </Card>
              <Row>
                  <Col style={{ backgroundColor: 'white', height: 40 }}>
                    <H3 style={{ color: 'black',fontWeight: "bold", paddingLeft: 10, paddingTop: 10 }}>
                      Popular Restaurants!
                    </H3>
                  </Col>
              </Row>
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
                          <Button style={{backgroundColor:'orange'}} >
                          <Text>Get Direction</Text>
                          </Button>
                        </View>
                      </Col>
                      <Col style={{ backgroundColor: 'white', height: 150, width: 70 }}>
                        <View style = {styles.imgcolthree}>
                          <Icon name="md-heart" color={'grey'} size={30} />
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
  },
  imgcoltwo:{
    paddingTop: 20,
    paddingLeft: 20,
  },
  imgcolthree:{
    paddingTop: 20,
  },
  imgcolfour:{
    paddingTop: 20,
    paddingLeft:20,
    paddingRight:0,
  },
  container:{
    flex:1,
    width:'100%',
    height:'100%',
  }
})
