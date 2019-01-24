import React, { Component } from 'react';
import {View, Image, StyleSheet, ImageBackground, ScrollView, Switch, Modal} from "react-native";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Left, Right, Header, Icon, DeckSwiper, Thumbnail,Button, Content, Card, CardItem, Body, Text, Textarea, Input } from 'native-base';
import ToggleSwitch from 'toggle-switch-react-native';
import { ImagePicker,Permissions } from 'expo';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';

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

export default class Home extends Component{
  componentDidMount(){
    this.getInfo();
  }
  state = {
    modalVisible: false,
    phmodalVisible: false,
    emailmodalVisible: false,
    tempPh:'',
    tempEmail:'',
    restaurant: [],
    image: null,
    clicked:"",
  };
  uploadImage(click){
    this.setState({ clicked: click });
    this._pickImage;
  }

  updatephone(){
    fetch(global.HostURL + '/api/updatephone?id='+ this.state.restaurant.Rest_id + "&phone="+ this.state.tempPh, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    });
    let newrest = this.state.restaurant;
    newrest.Rest_phno=this.state.tempPh;
    this.setState({restaurant:newrest});
 }
 updateemail(){
   fetch(global.HostURL + '/api/updateemail?id='+ this.state.restaurant.Rest_id + "&email="+ this.state.tempEmail, {
     method: 'PUT',
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
     }
   });
   let newrest = this.state.restaurant;
   newrest.Rest_email=this.state.tempEmail;
   this.setState({restaurant:newrest});
}
  getInfo(){
    fetch(global.HostURL + '/api/restaurant?id=' + global.Profile.id + "&profile=true")
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      this.setState({
         restaurant: responseJson,
      });
      for (var i = 0; i < cards.length; i++) {
        cards[i].image= global.HostURL + '/api/restaurant/pic?id=' + responseJson.Rest_id+ "&gallery=" +(i+1);
      }
    })
    .catch((error) => {
      console.error(error);
      console.log("search failed");
    });

  }
  setaddressModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  setphnumberModalVisible(visible) {
    this.setState({phmodalVisible: visible});
  }
  setemailModalVisible(visible) {
    this.setState({emailmodalVisible: visible});
  }
  render(){
    let { image } = this.state;
    return(
      <Container>
      <Header style = {{height: 75,backgroundColor: '#a3080c', paddingBottom: 0, paddingTop: 0}}>
      <Button transparent full success style={{height:70, width:'100%', justifyContent: 'flex-start'}} onPress={()=>this._pickImage("profile")}>
          <Thumbnail style = {{ borderColor: 'white', borderWidth: 2}} source={{uri : global.HostURL + '/api/restaurant/pic?id=' + this.state.restaurant.Rest_id}} />
          <Text style = {{color: 'white'}}>{this.state.restaurant.Rest_name}</Text>
      </Button>
      </Header>
      <Content contentContainerStyle={{ flex: 1 }}>
        <ScrollView>
        <Grid>
          <Row >
            <Col style={{height:350}}>
            <View>
                <DeckSwiper
                  ref={(c) => this._deckSwiper = c}
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
                         <Icon name="md-create" style={{ color: '#ED4A6A' }} onPress={()=>this._pickImage(item.gallery)} />
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
                      <Text>{this.state.restaurant.Rest_location}</Text>
                     </Left>
                     <Right>
                      <Icon name="md-create" style={{ color: '#ED4A6A' }} onPress={()=>{this.setaddressModalVisible(!this.state.modalVisible);}}/>
                     </Right>
                     <Modal
                      animationType="slide"
                      transparent={true}
                      onRequestClose={()=>{this.setaddressModalVisible(!this.state.modalVisible);}}
                      visible={this.state.modalVisible}>
                      <View style={styles.modalcontainer}>
                        <View style={styles.responsiveBox}>
                            <Header style = {{height: 40,backgroundColor: '#a3080c' , color: 'orange', paddingBottom: 0, paddingTop: 0, marginBottom: 8}}>
                            <Right>
                              <Button transparent onPress={()=>{this.setaddressModalVisible(!this.state.modalVisible);}}>
                                <MaterialCommunityIcons name="window-close" size={20} color="#959595" />
                              </Button>
                              </Right>
                            </Header>
                            <Textarea rowSpan={3} placeholder="Enter Address" style={{padding:10}} />
                            <View style={{alignSelf:'center', paddingBottom: 5}}>
                              <MaterialCommunityIcons name="check" size={40} color="#4cd58a" onPress={()=>{this.setaddressModalVisible(!this.state.modalVisible);}}/>
                            </View>
                        </View>
                      </View>
                    </Modal>
                 </CardItem>
                 <CardItem>
                   <Left>
                    <Icon name="ios-call"/>
                    <Text>{this.state.restaurant.Rest_phno}</Text>
                   </Left>
                   <Right>
                    <Icon name="md-create" style={{ color: '#ED4A6A' }} onPress={()=>{this.setphnumberModalVisible(!this.state.phmodalVisible);}}/>
                   </Right>
                   <Modal
                      animationType="slide"
                      transparent={true}
                      onRequestClose={()=>{this.setphnumberModalVisible(!this.state.phmodalVisible);}}
                      visible={this.state.phmodalVisible}>
                      <View style={styles.modalcontainer}>
                        <View style={styles.responsiveBoxphnumber}>
                            <Header style = {{height: 40,backgroundColor: '#a3080c' , color: 'orange', paddingBottom: 0, paddingTop: 0, marginBottom: 8}}>
                            <Right>
                              <Button transparent onPress={()=>{this.setphnumberModalVisible(!this.state.phmodalVisible);}}>
                                <MaterialCommunityIcons name="window-close" size={20} color="#959595" />
                              </Button>
                              </Right>
                            </Header>
                            <Input onChangeText={(ph) => this.setState({tempPh:ph})} keyboardType='number-pad' placeholder="Enter phone number"/>
                            <View style={{alignSelf:'center'}}>
                                <MaterialCommunityIcons name="check" size={40} color="#4cd58a" onPress={()=>{this.setphnumberModalVisible(!this.state.phmodalVisible);this.updatephone()}}/>
                            </View>
                        </View>
                      </View>
                    </Modal>
                 </CardItem>
                 <CardItem>
                   <Left>
                    <Icon name="md-mail"/>
                    <Text>{this.state.restaurant.Rest_email}</Text>
                   </Left>
                   <Right>
                    <Icon name="md-create" style={{ color: '#ED4A6A' }} onPress={()=>{this.setemailModalVisible(!this.state.emailmodalVisible);}} />
                   </Right>
                   <Modal
                      animationType="slide"
                      transparent={true}
                      onRequestClose={()=>{this.setemailModalVisible(!this.state.emailmodalVisible);}}
                      visible={this.state.emailmodalVisible}>
                      <View style={styles.modalcontainer}>
                        <View style={styles.responsiveBoxphnumber}>
                            <Header style = {{height: 40,backgroundColor: '#a3080c' , color: 'orange', paddingBottom: 0, paddingTop: 0, marginBottom: 8}}>
                            <Right>
                              <Button transparent onPress={()=>{this.setemailModalVisible(!this.state.emailmodalVisible);}}>
                                <MaterialCommunityIcons name="window-close" size={20} color="#959595" />
                              </Button>
                              </Right>
                            </Header>
                            <Input onChangeText={(email)=>this.setState({tempEmail:email})} keyboardType='email-address' placeholder="Enter email address"/>
                            <View style={{alignSelf:'center'}}>
                                <MaterialCommunityIcons name="check" size={40} color="#4cd58a" onPress={()=>{this.setemailModalVisible(!this.state.emailmodalVisible);this.updateemail()}}/>
                            </View>
                        </View>
                      </View>
                    </Modal>
                 </CardItem>
             </Card>
          </View>
          </Col>
          </Row>
          <Row>
            <Col>

            </Col>
          </Row>
        </Grid>
        </ScrollView>
      </Content>
      </Container>
    );
  }
  _pickImage = async (click) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let result =null
    console.log(click);
    if(click=="profile"){
        result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });
      console.log("i am profile");
    }else{
      result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 9],
      });
      console.log("i am gallery");
    }
    if (!result.cancelled) {
      cards[click-1].image=result.uri;
      this._deckSwiper._root.swipeRight();
      const data = new FormData();
      data.append('name', result.uri); // you can append anyone.
      data.append('photo', {
        uri: result.uri,
        type: 'image/jpeg', // or photo.type
        name: "img",
      });
      fetch(global.HostURL + '/api/restaurant/pic?id='+ this.state.restaurant.Rest_id+"&gallery="+click, {
        method: 'post',
        body: data
      });
    }

  };

}

const styles= StyleSheet.create({
  modalcontainer:{
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  responsiveBox: {
    width: wp('84.5%'),
    height: hp('23%'),
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
      height: 3
    },
    shadowRadius: 3,
    shadowOpacity: 0.5,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  responsiveBoxphnumber: {
    width: wp('84.5%'),
    height: hp('22%'),
    paddingBottom: 8,
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
      height: 3
    },
    shadowRadius: 3,
    shadowOpacity: 0.5,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
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
