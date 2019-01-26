import React, { Component } from 'react';
import { Image,StyleSheet, Modal, AsyncStorage } from 'react-native';
import { Container, Badge, H2, H3, Header, Content, Row,Grid, Col, Card, CardItem, Thumbnail, Text, Button, Icon, Body, Right, DeckSwiper } from 'native-base';
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import { Constants, MapView, Location, Permissions, Marker } from 'expo';
import User from './Userprofile';

const cards = [
  {
    name: 'Gallery 1',
    gallery:1,
    image: 'https://myanimelist.cdn-dena.com/images/anime/3/51045.jpg',
  },
  {
    name: 'Gallery 2',
    gallery:2,
    image: 'https://myanimelist.cdn-dena.com/images/anime/3/51045.jpg',
  },
  {
    name: 'Gallery 3',
    gallery:3,
    image: 'https://myanimelist.cdn-dena.com/images/anime/3/51045.jpg',
  },
  {
    name: 'Gallery 4',
    gallery:4,
    image: 'https://myanimelist.cdn-dena.com/images/anime/3/51045.jpg',
  },
];

export default class Login extends Component {

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  };
  setmapModalVisible(visible) {
    this.setState({mapmodalVisible: visible});
  };
  state = {
    modalVisible: false,
    mapmodalVisible: false,
    restaurant:'',
    fav_status:'',
  };
  static navigationOptions = {
        header:null
  }

  getinfo(){
    const { navigation } = this.props;
    return fetch(global.HostURL + '/api/Restaurant?id=' + navigation.getParam('Rest_id', '1') + "&profile=false")
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      this.setState({
         restaurant: responseJson,
       }, function(){

       });
    })
    .catch((error) => {
      console.error(error);
      console.log("restaurant info failed");
    });
  }

  togglefav(){
      fetch(global.HostURL + '/api/Favorite', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          User_id:global.Profile.id,
          Rest_id:this.state.restaurant.Rest_id,
        }),
      }).then((response) => response.json())
      .then((responseJson) => {
        if(responseJson){
          this.setState({
             fav_status: "red",
          });
        }else{
          this.setState({
             fav_status: "grey",
          });
        }

      })
      .catch((error) => {
        this.setState({
           fav_status: "grey",
         }, function(){

         });
        console.log("toggle failed");
      });
    }

  getfav(){
    const { navigation } = this.props;
    return fetch(global.HostURL + '/api/Favorite/?User_id='+ global.Profile.id+ '&Rest_id=' + navigation.getParam('Rest_id', '1'))
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson){
        this.setState({
           fav_status: "red",
        });
      }else{
        this.setState({
           fav_status: "grey",
        });
      }

    })
    .catch((error) => {
      this.setState({
         fav_status: "grey",
       }, function(){

       });
      console.log("fav failed");
    });
  }

  componentDidMount(){
    this.getinfo();
    this.getfav();
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
                    <Content style={{ backgroundColor: '#dfdfdf'}}>
                        <Card style={{width:'99%'}}>
                            <CardItem header>
                            <Row>
                                <Col style={{backgroundColor:'white',width:110}}>
                                    <Thumbnail large style = {{ marginLeft:15, borderColor: '#404040', borderWidth: 2}} source={{uri : global.HostURL + '/api/restaurant/pic?id=' + this.state.restaurant.Rest_id}} />
                                </Col>
                                <Col style={{backgroundColor:'white'}}>
                                    <H2>{this.state.restaurant.Rest_name}</H2>
                                    <H2 style={{color:'#404040'}}>Catagory: {this.state.restaurant.Rest_id}</H2>
                                    <H2>{this.state.restaurant.Rest_long}</H2>
                                </Col>
                            </Row>
                            </CardItem>
                            <CardItem>
                                <Row>
                                    <Col style={{backgroundColor:'white', height:400}}>
                                    <DeckSwiper
                                      dataSource={cards}
                                      renderItem={item =>
                                        <Card style={{ elevation: 3 }}>
                                          <CardItem cardBody>
                                            <Image style={{ height: 300, width:'100%', flex: 1 }} source={{uri : global.HostURL + '/api/restaurant/pic?id=' + this.state.restaurant.Rest_id+ "&gallery=" +item.gallery}} />
                                          </CardItem>
                                          <CardItem>
                                            <Icon name="md-images" style={{ color: '#ED4A6A' }} />
                                            <Text>{item.name}</Text>
                                            <Body>

                                            </Body>
                                            <Right>
                                             <Icon name="md-create" style={{ color: '#ED4A6A' }} onPress={()=>this._pickImage(item.gallery)} />
                                            </Right>
                                          </CardItem>
                                        </Card>
                                      }
                                    />
                                    </Col>
                                </Row>
                            </CardItem>
                            <CardItem>
                                <Row>
                                    <Col style={{backgroundColor:'white'}}>
                                        <MaterialCommunityIcons name="tag-heart" size={35} color={this.state.fav_status} onPress={()=> this.togglefav()} />
                                        <Button iconLeft full warning textStyle={{color:'white'}} style={{alignSelf:'center',width: 250}} onPress={() => {this.setmapModalVisible(true);}}>
                                            <Ionicons name="md-map" size={30} color="white" />
                                            <Text> View Restaurant Location </Text>
                                        </Button>
                                    </Col>
                                </Row>
                            </CardItem>
                            <CardItem footer>
                                <Row>
                                    <Col style={{backgroundColor:'white'}}>
                                        <Text style={{paddingBottom:5}}>Detail Address: {this.state.restaurant.Rest_location}</Text>
                                        <Text style={{paddingBottom:5}}>Phone Number: {this.state.restaurant.Rest_phno}</Text>
                                        <Text style={{paddingBottom:5}}>Email: {this.state.restaurant.Rest_email}</Text>
                                    </Col>
                                </Row>
                            </CardItem>
                        </Card>
                        <Modal
                          animationType="slide"
                          transparent={false}
                          onRequestClose={()=>{this.mapsetModalVisible(!this.state.mapmodalVisible);}}
                          visible={this.state.mapmodalVisible}>
                          <Header style = {{height: 40,backgroundColor: '#a3080c', paddingBottom: 0, paddingTop: 0}}>
                          <Right>
                            <Button transparent onPress={()=>{this.setmapModalVisible(!this.state.mapmodalVisible);}}>
                                <Icon name="close"/>
                            </Button>
                            </Right>
                          </Header>
                          <MapView
                            style={{ flex: 1 }}
                            region={{ latitude: this.state.restaurant.Rest_lat, longitude: this.state.restaurant.Rest_long, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
                            zoomEnabled={true}
                          >
                          <MapView.Marker
                            coordinate={{latitude: this.state.restaurant.Rest_lat,
                              longitude: this.state.restaurant.Rest_long}}
                            title={this.state.restaurant.Rest_name}
                            description="Location"
                          />
                          </MapView>
                        </Modal>
                    </Content>
                </Grid>
            </Container>
        )
    }
  };
