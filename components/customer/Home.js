import React, { Component } from 'react';
import {View, Image, StyleSheet, ImageBackground, ScrollView, Switch, Modal, AsyncStorage } from "react-native";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Header, H1,H2,H3, H4,Title,Right, Item, Input, Icon, Thumbnail, Content, Button, Footer, FooterTab, Badge, Card, CardItem, Body, Text, Left } from 'native-base';
import User from './Userprofile';


export default class Home extends Component{
  state = {
    modalVisible: false,
    Recommended : [],
    New:[],
    Restaurant:[],
    value:'',
  };


   getNew(){
    return fetch(global.HostURL + '/api/restaurant/new')
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      this.setState({
         New: responseJson,
       }, function(){

       });
    })
    .catch((error) => {
      // console.error(error);
      console.log("new failed");
    });
  }

   getRecommended(){
    return fetch(global.HostURL + '/api/restaurant/recommended')
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      this.setState({
         Recommended: responseJson,
       }, function(){

       });
    })
    .catch((error) => {
      // console.error(error);
      console.log("recommend failed");
    });
  }

  componentDidMount(){
    this.getRecommended();
    this.getNew();
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  handleChange(e) {
       this.setState({
         value: e.nativeEvent.text
       });
     }

  handleSearch(){
    return fetch(global.HostURL + '/api/restaurant')
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);

      this.setState({
         Restaurant: responseJson,
       }, function(){

       });
    })
    .catch((error) => {
      // console.error(error);
      console.log("recommend failed");
    });
  }

  render(){
    return(
      <Container>
      <Header style = {{height: 70,backgroundColor: '#a3080c'}}>
          <Button transparent style={{height:55, width:'100%', backgroundColor: '#a3080c', justifyContent: 'flex-start'}} onPress={() => {this.setModalVisible(true);}}>
            <Thumbnail style = {{  borderColor: 'white', borderWidth: 2}}  source={{uri: 'https://graph.facebook.com/'+ global.Profile.id + '/picture?type=normal'}} />
            <Text >{global.Profile.name}</Text>
          </Button>
      </Header>
        <Modal
          animationType="slide"
          transparent={false}
          onRequestClose={()=>{this.setModalVisible(!this.state.modalVisible);}}
          visible={this.state.modalVisible}>
          <Header style = {{height: 40,backgroundColor: '#a3080c' , color: 'orange', paddingBottom: 0, paddingTop: 0}}>
          <Right>
            <Button transparent onPress={()=>{this.setModalVisible(!this.state.modalVisible);}}>
              <Icon name="md-close-circle-outline" size={24} />
            </Button>
            </Right>
          </Header>
          <User/>
        </Modal>
      <Header onSubmitEditing={this.handleSearch.bind(this)} onChange={this.handleChange.bind(this)} searchBar rounded style = {{backgroundColor:'white', height: 60, paddingBottom: 10, paddingTop: 10}}>
          <Item style = {{backgroundColor: 'white' ,borderColor: 'orange', borderTopWidth: 1, borderRightWidth: 1, borderLeftWidth: 1}}>
            <Icon name="ios-search" />
            <Input placeholder="Search"  onFocus={() => this.props.navigation.navigate('Search')}/>
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
                            this.state.Recommended.map((item, key)=>
                              (
                                <Col style={{ backgroundColor: 'white', height: 180, width: 140,marginRight:0 }} key={key}>
                                    <View style = {styles.imgcolfour}>
                                      <Button transparent style={{height: 120 , width: '100%'}} onPress={() => this.props.navigation.navigate('Restaurantdetail',{Rest_id: item.Rest_id})}>
                                        <Thumbnail style={styles.imagetwo} square source={{uri : global.HostURL + '/api/resturant/pic?id=' + item.Rest_id}} />
                                      </Button>
                                      <Button transparent textStyle={{color: '#87838B'}}>
                                        <Text style={{paddingTop:14,paddingBottom: 23, color: 'black', paddingLeft:3 }}>{item.Rest_name}</Text>
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
                                this.state.New.map((item, key)=>
                                  (
                                    <Col style={{ backgroundColor: 'white', height: 180, width: 140,marginRight:0 }} key={key}>
                                        <View style = {styles.imgcolfour}>
                                          <Button transparent style={{height: 120 , width: '100%'}} onPress={() => this.props.navigation.navigate('Restaurantdetail',{Rest_id: item.Rest_id})}>
                                            <Thumbnail style={styles.imagetwo} square source={{uri : global.HostURL + '/api/resturant/pic?id=' + item.Rest_id}} />
                                          </Button>
                                          <Button transparent textStyle={{color: '#87838B'}}>
                                            <Text style={{paddingTop:14,paddingBottom: 23, color: 'black', paddingLeft:3 }}>{item.Rest_Name}</Text>
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
              </Row>
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
