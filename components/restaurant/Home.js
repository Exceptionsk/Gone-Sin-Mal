import React, { Component } from 'react';
import {View, Image, StyleSheet, ImageBackground, ScrollView, Switch} from "react-native";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Left, Right, Header, Icon, DeckSwiper, Thumbnail,Button, Content, Card, CardItem, Body, Text } from 'native-base';
import ToggleSwitch from 'toggle-switch-react-native';
import { ImagePicker,Permissions } from 'expo';

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
  componentDidMount(){
    this.getInfo();
  }
  state = {
    resturant: [],
    image: null,
  };
  getInfo(){
    return fetch(global.HostURL + '/api/restaurant?id=' + global.Profile.id)
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
    let { image } = this.state;
    return(
      <Container>
      <Header style = {{height: 80,backgroundColor: '#a3080c', color: 'orange', paddingBottom: 0, paddingTop: 0}}>
      <Left>
      <Button transparent full success style={{height:70}} onPress={this._pickImage}>
          <Thumbnail style = {{ borderColor: 'white', borderWidth: 2}} source={{uri : global.HostURL + '/api/resturant/profile_pic/' + this.state.resturant.Rest_id}} />
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
  _pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
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
