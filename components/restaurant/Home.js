import React, { Component } from 'react';
import {View, Image, StyleSheet, ImageBackground, ScrollView, Switch} from "react-native";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Left, Right, Header, Icon, DeckSwiper, Thumbnail,Button, Content, Card, CardItem, Body, Text } from 'native-base';
import ToggleSwitch from 'toggle-switch-react-native';
import { ImagePicker,Permissions } from 'expo';

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
    resturant: [],
    image: null,
    clicked:"",
  };
  uploadImage(click){
    this.setState({ clicked: click });
    this._pickImage;
  }
  getInfo(){
    return fetch(global.HostURL + '/api/restaurant?id=' + global.Profile.id + "&profile=true")
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      this.setState({
         resturant: responseJson,
       }, function(){

       });
    })
    .catch((error) => {
      console.error(error);
      console.log("search failed");
    });
  }

  render(){
    let { image } = this.state;
    return(
      <Container>
      <Header style = {{height: 80,backgroundColor: '#a3080c', paddingBottom: 0, paddingTop: 0}}>
      <Left>
      <Button transparent full success style={{height:70}} onPress={()=>this._pickImage("profile")}>
          <Thumbnail style = {{ borderColor: 'white', borderWidth: 2}} source={{uri : global.HostURL + '/api/resturant/pic?id=' + this.state.resturant.Rest_id}} />
      </Button>
      </Left>
      <Body>
        <Text style = {{color: 'white'}}>{this.state.resturant.Rest_name}</Text>
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
                        <Image style={{ height: 300, width:'100%', flex: 1 }} source={{uri : global.HostURL + '/api/resturant/pic?id=' + this.state.resturant.Rest_id+ "&gallery=" +item.gallery}} />
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
                      <Text>{this.state.resturant.Rest_location}</Text>
                     </Left>
                     <Right>
                      <Icon name="md-create" style={{ color: '#ED4A6A' }} />
                     </Right>
                 </CardItem>
                 <CardItem>
                   <Left>
                    <Icon name="ios-call"/>
                    <Text>{this.state.resturant.Rest_phno}</Text>
                   </Left>
                   <Right>
                    <Icon name="md-create" style={{ color: '#ED4A6A' }} />
                   </Right>
                 </CardItem>
                 <CardItem>
                   <Left>
                    <Icon name="md-mail"/>
                    <Text>{this.state.resturant.Rest_email}</Text>
                   </Left>
                   <Right>
                    <Icon name="md-create" style={{ color: '#ED4A6A' }} />
                   </Right>
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
      const data = new FormData();
      data.append('name', result.uri); // you can append anyone.
      data.append('photo', {
        uri: result.uri,
        type: 'image/jpeg', // or photo.type
        name: "img",
      });
      fetch(global.HostURL + '/api/resturant/pic?id='+ this.state.resturant.Rest_id+"&gallery="+click, {
        method: 'post',
        body: data
      });
    }

  };

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
