import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet, View, TextInput,TouchableWithoutFeedback
  } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container,Card,CardItem,Body, Header, H1,H2,H3, H4,Left, Item, Input, Icon, Thumbnail, Content, Button, Footer, FooterTab, Badge, Text } from 'native-base';
import {Actions} from 'react-native-router-flux';
import QRCode from 'react-native-qrcode';
import { Ionicons } from '@expo/vector-icons';
import NavigationService from '../../NavigationService'
import { AsyncStorage } from "react-native";
  export default class HelloWorld extends Component {
    state={
      UserInfo:[],
    }
    async logout(){
      const retrievedItem =  await AsyncStorage.getItem('token');
      NavigationService.navigate('Login');
      fetch('https://graph.facebook.com/'+ global.Profile.id+'/permissions', {
        method: '‘DELETE’',

      }).then((response) => response.json())
        .then((responsejson)=>{

        }).catch((error)=>{
           console.log(error);
        });

    }
    componentDidMount(){
      fetch(global.HostURL + '/api/User/' + global.Profile.id)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({UserInfo:responseJson});
        console.log(responseJson);
      })
      .catch((error) => {
        console.log("user failed");
      });
    }

    render() {
      return (
        <Container>
          <Content>
          <Grid>
          <Card style={{width:'99%',height:'98%'}}>
            <CardItem header>
            <Row>
                <Col style={{height:230}}>
                        <View style={styles.container}>
                          <QRCode
                            value={global.Profile.id}
                            size={200}
                            bgColor='purple'
                            fgColor='white'/>
                        </View>
                </Col>
            </Row>
            </CardItem>
            <CardItem>
                <Row>
                  <Col style={{alignItems:'center', backgroundColor:'white'}}>
                  <Button transparent>
                    <Text style={{ paddingBottom:5}}>User Location: {this.state.UserInfo.State}  </Text>
                      <Icon name='ios-create' />
                  </Button>
                    <Text style={{paddingBottom:5}}>Avaliable Coin: {this.state.UserInfo.Coin}</Text>
                    <Text style={{paddingBottom:5}}>Coin Capacity: {this.state.UserInfo.Capacity}</Text>
                    <Text style={{paddingBottom:5}}>Gone Sin Restaurant: {this.state.UserInfo.Visited}</Text>
                    <Text style={{paddingBottom:5}}>Exceeded Coin: {this.state.UserInfo.Exceed} (expire in: {this.state.UserInfo.ExpireIn}) days</Text>
                  </Col>
                </Row>
            </CardItem>
            <CardItem footer>
            </CardItem>
          </Card>
          </Grid>
        </Content>
        </Container>
      );
    };
  }

  const styles = StyleSheet.create({
      container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
      },

      input: {
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          margin: 10,
          borderRadius: 5,
          padding: 5,
      }
  });

  AppRegistry.registerComponent('HelloWorld', () => HelloWorld);

  module.exports = HelloWorld;
