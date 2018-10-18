import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet, TextInput,TouchableWithoutFeedback
  } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container,Card,CardItem,Body, Header, H1,H2,H3, H4,Left, Item, Input, Icon, Thumbnail, Content, Button, Footer, FooterTab, Badge, Text } from 'native-base';
import {Actions} from 'react-native-router-flux';
import QRCode from 'react-native-qrcode';
import { Ionicons } from '@expo/vector-icons';

export default class Home extends Component {
  render() {
    return (
      <Container>
          <Header style = {{height: 110,backgroundColor: '#a3080c' , color: 'orange', paddingBottom: 0, paddingTop: 0}}>
          <Button transparent style={{height:70}}>
              <Thumbnail style = {{ marginLeft:15, borderColor: 'white', borderWidth: 2}}  source={require('../../assets/saitama.jpg')} />
              <Text style = {{color: 'white'}}>Saitama</Text>
          </Button>
        </Header>
        <Grid>
        <Card style={{width:'99%',height:'98%'}}>
          <CardItem header>
          <Row>
            <Col style={{height:30, alignItems:'center'}}>
              <H2>System Status</H2>
            </Col>
          </Row>
          </CardItem>
          <CardItem>
              <Row>
                <Col style={{backgroundColor:'white'}}>
                  <Text style={{paddingBottom:5}}>Total Coin: 10,000</Text>
                  <Text style={{paddingBottom:5}}>Special Coin: 1,000</Text>
                  <Text style={{paddingBottom:5}}>Expired Coin: 1,000</Text>
                </Col>
              </Row>
          </CardItem>
          <CardItem footer>
          <Row>
            <Col style={{backgroundColor:'white'}}>
              <Text style={{paddingBottom:5}}>Total Restaurants: 57</Text>
              <Text style={{paddingBottom:5}}>Total Customers: 275</Text>
            </Col>
          </Row>
          </CardItem>
        </Card>
        </Grid>
      </Container>
    );
  };
}
