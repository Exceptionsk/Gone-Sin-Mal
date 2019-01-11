import React, { Component } from 'react';
import {View, Image, StyleSheet, ImageBackground, ScrollView, Switch, AsyncStorage} from "react-native";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Ionicons } from '@expo/vector-icons';
import { ImagePicker,Permissions } from 'expo';
import { Container,Textarea, Left, Right, Form, Label, Input, Header, H1,H2,H3, H4,Title, Item, Icon, Thumbnail, Content, Button, Footer, FooterTab, Badge, Card, CardItem, Body, Text } from 'native-base';
export default class Register extends Component{
  static navigationOptions = {
    header:null
  }
  state={
    name:'',
    password1:'',
    password2:'',
    email:'',
    phone:'',
    township:'',
    lat:'4',
    long:'5',
    profilepic:'',
    location:'',
  }
  _pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ profilepic: result.uri });
    }
  };
  async signup(){
    var item = "";
    try {
      const retrievedItem =  await AsyncStorage.getItem('profile');
      item = JSON.parse(retrievedItem);
    } catch (error) {
      console.log(error.message);
    }
    try {
      var date = new Date();
      fetch(global.HostURL + '/api/Restaurant', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          User_id : item.id,
          Rest_name : this.state.name,
          Rest_Password : this.state.password1,
          Rest_email : this.state.email,
          Rest_phno : this.state.phone,
          Rest_township : this.state.township,
          Rest_lat : this.state.lat,
          Rest_long : this.state.long,
          Rest_created_date : date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear(),
          Rest_coin:0,
          Rest_special_coin:0,
          Rest_coin_purchased:0,
          Rest_location: this.state.location
        }),
      }).then((response) => response.json())
        .then((responsejson)=>{
          const data = new FormData();
          data.append('name', this.state.name); // you can append anyone.
          data.append('photo', {
            uri: this.state.profilepic,
            type: 'image/jpeg', // or photo.type
            name: this.state.name,
          });
          fetch(global.HostURL + '/api/resturant/pic?id='+ responsejson.Rest_id + "&gallery=0", {
            method: 'post',
            body: data
          }).then(res => {
            console.log(res)
          });
          // if(responsejson.User_Type=="normal"){
          //   this.props.navigation.navigate('CustHome')
          // }else if (responsejson.User_Type=="admin") {
          //   this.props.navigation.navigate('AdminHome')
          // }else if (responsejson.User_Type=="owner"){
          //   this.props.navigation.navigate('RestHome')
          // };
          // this.props.navigation.navigate('CustHome')
        });
    } catch (e) {
      console.log(e);
    }
  }
  render(){
    return(
      <Container>
        <Header style = {{height: 70,backgroundColor: '#a3080c', color: 'orange', paddingBottom: 0, paddingTop: 0}}>
          <Body>
            <Button transparent >
              <Icon style = {{color: 'white', paddingLeft:20}} name='ios-business' />
              <Text style = {{color: 'white', width:'100%'}} >Register</Text>
            </Button>
          </Body>
          <Right>
          </Right>
        </Header>

        <Grid>
        <Content>
          <Card style={{padding:10}}>
          <Form>
            <Row>
              <Col style={{width:100}}>
                <Button onPress={this._pickImage} transparent style={{width:100, height:100}}>
                  <Image style={{ height: 100, width:100, flex: 1 }} source={{uri : this.state.profilepic}} />
                </Button>
              </Col>
              <Col>
                <Item  >
                  <Icon active name='ios-contact' />
                  <Input onChangeText={(value) => this.setState({name:value})} placeholder="Enter Name"/>
                </Item>
                <Item >
                  <Icon active name='ios-compass' />
                  <Input onChangeText={(value) => this.setState({township:value})} placeholder="Enter Township"/>
                </Item>
              </Col>
            </Row>
            <Row>
              <Col>
                <Item>
                  <Icon active name='md-key' />
                  <Input onChangeText={(value) => this.setState({password1:value})} placeholder="Enter password"/>
                </Item>
                <Item>
                  <Icon active name='md-key' />
                  <Input onChangeText={(value) => this.setState({password2:value})} placeholder="Confirm passowrd"/>
                </Item>
                <Item >
                  <Icon active name='ios-mail' />
                  <Input onChangeText={(value) => this.setState({email:value})} placeholder="Enter email address"/>
                </Item>
                <Item >
                  <Icon active name='ios-call' />
                  <Input onChangeText={(value) => this.setState({phone:value})} placeholder="Enter phone number"/>
                </Item>
                  <Textarea rowSpan={3} onChangeText={(value) => this.setState({location:value})} bordered placeholder="Enter Address" style={{padding:10}} />
              </Col>
            </Row>
            <Row>
              <Col style={{padding:10}}>
                <Button full warning textStyle={{color:'white'}} style={{alignSelf:'center',width: 150}} >
                  <Text> Cancel </Text>
                </Button>
              </Col>
              <Col style={{padding:10}}>
              <Button full danger textStyle={{color:'white'}} style={{alignSelf:'center',width: 150}} onPress={this.signup.bind(this)}>
                  <Text>Sign Up </Text>
                </Button>
              </Col>
            </Row>
          </Form>
          </Card>
          </Content>
        </Grid>
      </Container>
    );
  }
}
