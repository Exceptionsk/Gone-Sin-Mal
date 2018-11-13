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
                    <Text style={{ paddingBottom:5}}>User Location: San Chaung Township  </Text>
                      <Icon name='ios-create' />
                  </Button>
                    <Text style={{paddingBottom:5}}>Avaliable Coin: 1,866</Text>
                    <Text style={{paddingBottom:5}}>Coin Capacity: 1000</Text>
                    <Text style={{paddingBottom:5}}>Exceeded Coin: 50 (expire in: 23:34:07)</Text>
                  </Col>
                </Row>
            </CardItem>
            <CardItem>
                <Row>
                  <Col style={{alignItems: 'center',backgroundColor:'white',paddingBottom:10}}>
                    <Button iconLeft full danger textStyle={{color:'white'}} style={{alignSelf:'center',width: 250}} onPress={()=>{NavigationService.navigate('Login')}}>
                      <Ionicons name="ios-log-out" size={30} color="white" />
                      <Text> Log Out! </Text>
                    </Button>
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
