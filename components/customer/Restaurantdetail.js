import React, { Component } from 'react';
import { Image,StyleSheet, Modal, AsyncStorage, View } from 'react-native';
import { Container, Badge, H2, H3, Header, Content, Row,Grid, Col, Card, CardItem, Thumbnail, Text, Button, Icon, Body, Right, DeckSwiper } from 'native-base';
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import { Constants, MapView, Location, Permissions, Marker } from 'expo';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
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
    getcoordinate(){
      return {}
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
              <Header style = {{height: 75,backgroundColor: '#a3080c', paddingBottom: 0, paddingTop: 0}}>
              <Button transparent full success style={{height:70, width:'100%', justifyContent: 'flex-start'}} onPress={() => {this.setModalVisible(true);}} >
                  <Thumbnail style = {{ borderColor: 'white', borderWidth: 2}} source={{uri : global.HostURL + '/api/restaurant/pic?id=' + this.state.restaurant.Rest_id }} />
                  <Text style = {{color: 'white'}}>{this.state.restaurant.Rest_name}</Text>
              </Button>
              <Modal
                animationType="slide"
                transparent={true}
                onRequestClose={()=>{this.setModalVisible(!this.state.modalVisible);}}
                visible={this.state.modalVisible}>
                  <View style={styles.modalcontainer}>
                    <View style={styles.responsiveBox}>
                      <Header style = {{height: 40,backgroundColor: 'white', borderBottomWidth:0,paddingBottom: 0, paddingTop: 0}}>
                        <Right>
                          <Button transparent onPress={()=>{this.setModalVisible(!this.state.modalVisible);}}>
                            <MaterialCommunityIcons name="window-close" size={20} color="#959595" />
                          </Button>
                        </Right>
                      </Header>
                      <User/>
                    </View>
                  </View>
              </Modal>
                </Header>
                <Grid>
                    <Content style={{ backgroundColor: '#dfdfdf'}}>
                        <Card style={{width:'99%'}}>
                            {/* <CardItem>
                            <Row>
                                <Col style={{backgroundColor:'white',width:110}}>
                                    <Thumbnail large style = {{ marginLeft:15, borderColor: '#404040', borderWidth: 2}} source={{uri : global.HostURL + '/api/restaurant/pic?id=' + this.state.restaurant.Rest_id}} />
                                </Col>
                                <Col style={{backgroundColor:'white'}}>

                                </Col>
                            </Row>
                            </CardItem> */}
                            <CardItem header>
                                <Row>
                                    <Col style={{backgroundColor:'white', height: 360}}>
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
                                      <View style={{flex: 1, flexDirection: 'row',justifyContent: 'space-between', paddingBottom:10}}>
                                        <H2 style={{color:'#404040'}}>{this.state.restaurant.Rest_name}</H2>
                                        <MaterialCommunityIcons name="heart-multiple" size={35} color={this.state.fav_status} onPress={()=> this.togglefav()} />
                                      </View>
                                      <View style={{flex: 1, flexDirection: 'column',justifyContent: 'space-between',height: hp('25%'),paddingBottom:10}}>
                                        <H3 style={{color:'#404040'}}>Catagory: {this.state.restaurant.Rest_category}</H3>
                                        <Text style={{paddingBottom:5}}>Detail Address: {this.state.restaurant.Rest_location}</Text>
                                        <Text style={{paddingBottom:5}}>Phone Number: {this.state.restaurant.Rest_phno}</Text>
                                        <Text style={{paddingBottom:5}}>Email: {this.state.restaurant.Rest_email}</Text>
                                      </View>
                                    </Col>
                                </Row>
                            </CardItem>
                            <CardItem footer>
                                <Row>
                                    <Col style={{backgroundColor:'white'}}>
                                      <View style={{flex: 1, flexDirection: 'row', alignSelf:'center' ,paddingBottom:10}}>
                                        <Button iconLeft full warning textStyle={{color:'white'}} style={{alignSelf:'center',width: wp('70.5%')}} onPress={() => {this.setmapModalVisible(true);}}>
                                            <Ionicons name="md-map" size={30} color="white" />
                                            <Text> View Restaurant Location </Text>
                                        </Button>
                                      </View>
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
  const styles = StyleSheet.create({
    modalcontainer:{
      flex: 1,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
    },
    responsiveBox: {
      width: wp('84.5%'),
      height: hp('73%'),
      backgroundColor: 'white',
      borderWidth: 1,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
      borderColor: 'grey',
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 0
      },
      shadowRadius: 3,
      shadowOpacity: 0.5,
      flexDirection: 'column',
      justifyContent: 'space-around'
    },
  });
