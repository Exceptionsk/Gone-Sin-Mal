import React, { Component } from 'react';
import { View, Image, StyleSheet, ImageBackground, ScrollView, Modal, AsyncStorage,TextInput  } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, List,Badge, H3, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
export default class Notification extends Component {
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  };
  handlePassword = (text) => {
    this.setState({ password: text })
 }
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
    Profile:{},
  };
  componentWillMount(){
    this.retrieveItem('profile')
  }
  constructor()
  {
    super();
    this.items = [
      {id: '1',
      type: 'transaction id',
      name:'KFC',
      description:'You have gained 500 points from KFC. Please Keep in mind that these points are only valid before the expire date.',
      img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {id: '2',
      type: 'normal',
      name:'KFC',
      description:'You have gained 500 points from KFC. Please Keep in mind that these points are only valid before the expire date.',
      img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {id: '3',
      type: 'transaction id',
      name:'KFC',
      description:'You have gained 500 points from KFC. Please Keep in mind that these points are only valid before the expire date.',
      img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {id: '4',
      type: 'normal',
      name:'KFC',
      description:'You have gained 500 points from KFC. Please Keep in mind that these points are only valid before the expire date.',
      img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {id: '5',
      type: 'normal',
      name:'KFC',
      description:'You have gained 500 points from KFC. Please Keep in mind that these points are only valid before the expire date.',
      img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {id: '6',
      type: 'normal',
      name:'KFC',
      description:'You have gained 500 points from KFC. Please Keep in mind that these points are only valid before the expire date.',
      img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {id: '7',
      type: 'normal',
      name:'KFC',
      description:'You have gained 500 points from KFC. Please Keep in mind that these points are only valid before the expire date.',
      img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {id: '8',
      type: 'normal',
      name:'KFC',
      description:'You have gained 500 points from KFC. Please Keep in mind that these points are only valid before the expire date.',
      img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
    ];
  }

  Userbar(type){
    if(type=='transaction id'){
      return <TextInput style = {styles.input}
      underlineColorAndroid = "transparent"
      placeholder = " Transaction Id"
      placeholderTextColor = "#3f3f3f"
      autoCapitalize = "none"
      onChangeText = {this.handlePassword}/>
    }
    else{

    }

  }

  render() {
    let { image } = this.state;
    return(
    <Container>
      <Header style = {{ height: 60,backgroundColor: '#a3080c', color: 'orange', paddingBottom: 0, paddingTop: 0}}>
      <Body>
        <H3 style={{ color: 'white', fontWeight: "bold", paddingTop: 0, paddingLeft: 8 }}>Notification</H3>
      </Body>
      </Header>
        <Grid>
            <Content style = {{backgroundColor:'#dfdfdf'}}>
            {
                this.items.map((item, key)=>
                  (
                <Row key={key}>
                  <Col style={{ backgroundColor: '#dfdfdf', height: '100%', width: '100%'}}>
                    <Card style={{flex: 0, marginLeft: 0, width: '100%' }}>
                        <Col>
                            <CardItem>
                            <Left>
                                <Thumbnail source={{uri : item.img}} />
                                <Body>
                                <Text style={{fontWeight:'bold',fontSize:20,color:'#484848' }}>{item.name}</Text>
                                <Text style={{textAlign:'justify',color:'#5d5d5d'}}>{item.description}</Text>
                                </Body>
                            </Left>
                            </CardItem>
                        </Col>
                        <Col>
                            <CardItem>
                            {this.Userbar(item.type)}
                            </CardItem>
                        </Col>
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
    input: {
        height: 40,
        borderColor: '#ff7d21',
        borderWidth: 1,
        width:'100%',
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
