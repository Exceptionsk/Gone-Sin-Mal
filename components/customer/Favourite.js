import React, { Component } from 'react';
import {View, Image, StyleSheet, ImageBackground, ScrollView, Switch, Modal, AsyncStorage} from "react-native";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import { Right, Container, Header, H1,H2,H3, H4,Title, Left, Item, Input, Icon, Thumbnail, Content, Button, Footer, FooterTab, Badge, Card, CardItem, Body, Text } from 'native-base';
import ToggleSwitch from 'toggle-switch-react-native';
import User from './Userprofile';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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
    favourites:[],
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

  componentDidMount(){
    let that = this;
    setInterval(() => {
        that.setState({favourites: global.FavList});
    }, 1000);
  }
  refreshFav(){
    fetch(global.HostURL + '/api/Favorite/all?User_id='+ global.Profile.id)
    .then((response) => response.json())
    .then((responseJson) => {
      global.FavList=responseJson;
    })
    .catch((error) => {
      // console.log("Customer noti failed");
    });
  }
  togglefav(rest_id){
      fetch(global.HostURL + '/api/Favorite', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          User_id:global.Profile.id,
          Rest_id:rest_id,
        }),
      }).then((response) => response.json())
      .then((responseJson) => {
        this.refreshFav();
      })
      .catch((error) => {
        console.log("toggle failed");
      });
    }


  render(){
    return(
      <Container>
          <Header style = {{height: 70,backgroundColor: '#a3080c' , paddingBottom: 0, paddingTop: 0}}>
            <Button transparent style={{height:55, width:'100%', backgroundColor: '#a3080c', justifyContent: 'flex-start'}} onPress={() => {this.setModalVisible(true);}}>
              <Thumbnail style = {{  borderColor: 'white', borderWidth: 2}}  source={{uri: 'https://graph.facebook.com/'+ global.Profile.id + '/picture?type=normal'}} />
              <Text >{global.Profile.name}</Text>
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
                this.state.favourites.map((item, key)=>
                  (
                    <Row key={key}>
                      <Col>
                        <Card style={{flex: 1, paddingBottom:10}}>
                          {/* <CardItem>
                            <Left>
                              <Thumbnail source={{uri: 'Image URL'}} />
                              <Body>
                                <Text>NativeBase</Text>
                                <Text note>April 15, 2016</Text>
                              </Body>
                            </Left>
                          </CardItem> */}
                          <View>
                              <Button transparent onPress={() => this.props.navigation.navigate('Restaurantdetail',{Rest_id: item.Rest_id})} style={{height:200}}>
                              <Image source={{uri:global.HostURL + '/api/restaurant/pic?id=' + item.Rest_id}} style={{height: '100%', width: '100%', borderWidth:0.5,borderColor:'#727272', borderRadius:0}}/>
                              </Button>
                              <View style={{flex:1,flexDirection: 'row', paddingLeft:10}}>
                                <View>
                                  <Text style={{paddingTop:15,fontWeight:'bold', fontSize:20}}>
                                    <MaterialCommunityIcons name="heart-multiple" size={25} color="red" style={{paddingTop:54}} onPress={()=> this.togglefav(item.Rest_id)} /> {item.Rest_name}</Text>
                                  <Text style={{color: '#87838B',fontSize:15}}><MaterialCommunityIcons name="heart" size={25} color="white" /> {item.Rest_category}</Text>
                                </View>

                              </View>
                          </View>
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
