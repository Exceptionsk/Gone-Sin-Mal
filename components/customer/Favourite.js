import React, { Component } from 'react';
import {View, Image, StyleSheet, ImageBackground, ScrollView, Switch, Modal, AsyncStorage} from "react-native";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import { Right, Container, Header, H1,H2,H3, H4,Title, Left, Item, Input, Icon, Thumbnail, Content, Button, Footer, FooterTab, Badge, Card, CardItem, Body, Text } from 'native-base';
import ToggleSwitch from 'toggle-switch-react-native';
import User from './Userprofile';
export default class Home extends Component{
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  };
  async retrieveItem(key) {
    try {
      const retrievedItem =  await AsyncStorage.getItem(key);
      const item = JSON.parse(retrievedItem);
      this.setState({
         Profile: item,
       });
      return item;

    } catch (error) {
      console.log(error.message);
    }
    return
  };
  state = {
    modalVisible: false,
  };
  constructor()
  {
    super();
    this.items = [
      {name:'KFC', img:'https://cdn.myanimelist.net/images/anime/1722/93191l.jpg',catagory:'Fast Food'},
      {name:'Gong Cha', img:'https://cdn.myanimelist.net/images/anime/1882/94989l.jpg',catagory:'Taiwan Cafe'},
      {name:'Fuji', img:'https://myanimelist.cdn-dena.com/images/anime/1815/96562l.jpg',catagory:'Japanese Restaurant'},
      {name:'YKKO', img:'https://cdn.myanimelist.net/images/anime/1949/93415l.jpg',catagory:'Chinese Restaurant'},
      {name:'Golden Pot', img:'https://cdn.myanimelist.net/images/anime/1973/95616l.jpg',catagory:'Shabu Shabu'},
    ];
  }
  render(){
    return(
      <Container>
          <Header style = {{height: 90,backgroundColor: '#a3080c' , paddingBottom: 0, paddingTop: 0}}>
            <Button transparent style={{height:70}} onPress={() => {this.setModalVisible(true);}}>
                <Thumbnail style = {{ marginLeft:15, borderColor: 'white', borderWidth: 2}}  source={{uri: 'https://graph.facebook.com/'+ global.Profile.id + '/picture?type=normal'}} />
                <Text style = {{color: 'white'}}>{global.Profile.name}</Text>
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
        <Grid>
              <Row style={{height: 30}}>
                <Col style={{ height: 30, paddingTop: 0 }}>
                   <H3 style={{ fontWeight: "bold", paddingTop: 7, paddingLeft: 8 }}>Favourite List!</H3>
                </Col>
              </Row>
          <Content style = {{backgroundColor:'#dfdfdf'}}>
              {
                this.items.map((item, key)=>
                  (
                    <Row key={key}>
                      <Col>
                        <Card style={{flex: 0, paddingTop:0}}>
                          {/* <CardItem>
                            <Left>
                              <Thumbnail source={{uri: 'Image URL'}} />
                              <Body>
                                <Text>NativeBase</Text>
                                <Text note>April 15, 2016</Text>
                              </Body>
                            </Left>
                          </CardItem> */}
                          <CardItem>
                            <Body>
                              <Image source={{uri:item.img}} style={{height: 200, width: '100%', flex: 1, borderWidth:0.5,borderColor:'#727272', borderRadius:4}}/>
                              <Text style={{paddingTop:15,fontWeight:'bold', fontSize:20}}>
                                {item.name}
                              </Text>
                            </Body>
                          </CardItem>
                          <CardItem>
                            <Left>
                              <Button transparent>
                                <MaterialCommunityIcons name="tag-heart" size={35} color="red" />
                                <Text style={{color: '#87838B',fontSize:15}}>{item.catagory}</Text>
                              </Button>
                            </Left>
                          </CardItem>
                        </Card>
                      </Col>
                      {/* <Col style={{ backgroundColor: 'white', height: 150, width: 170 }}>
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
                      </Col> */}
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
