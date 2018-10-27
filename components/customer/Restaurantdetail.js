import React, { Component } from 'react';
import { Image,StyleSheet } from 'react-native';
import { Container, Badge, H2, H3, Header, Content, Row,Grid, Col, Card, CardItem, Thumbnail, Text, Button, Icon, Body, Right } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export default class Login extends Component {
    static navigationOptions = {
        header:null
      }
    render(){
        return(
            <Container>
                <Header style = {{height: 110,backgroundColor: '#a3080c' , color: 'orange', paddingBottom: 0, paddingTop: 0}}>
                    <Button transparent style={{height:70}} onPress={() => this.props.navigation.navigate('Userprofile')}>
                        <Thumbnail style = {{ marginLeft:15, borderColor: 'white', borderWidth: 2}}  source={require('../../assets/usothree.jpg')} />
                        <Text style = {{color: 'white'}}>BitGeeks</Text>
                    </Button>
                    <Button transparent>
                        <Text style = {{color: 'white'}}>Available Coin : 1,866P</Text>
                    </Button>
                </Header>
                <Grid>
                    <Content style={{ backgroundColor: '#dfdfdf'}}>
                        <Card style={{width:'99%'}}>
                            <CardItem header>
                            <Row>
                                <Col style={{backgroundColor:'white',width:110}}>
                                    <Thumbnail large style = {{ marginLeft:15, borderColor: '#404040', borderWidth: 2}}  source={require('../../assets/kfclogo.png')} />
                                </Col>
                                <Col style={{backgroundColor:'white'}}>
                                    <H2>KFC</H2>
                                    <H2 style={{color:'#404040'}}>Catagory: Fast Food</H2>
                                </Col>
                            </Row>
                            </CardItem>
                            <CardItem>
                                <Row>
                                    <Col style={{backgroundColor:'white'}}>
                                        <Thumbnail square style = {{ width:'100%',height: 300, marginLeft:0, borderColor: '#404040', borderWidth: 0.5}}  source={require('../../assets/kfcphoto.jpg')} />
                                    </Col>
                                </Row>
                            </CardItem>
                            <CardItem>
                                <Row>
                                    <Col style={{backgroundColor:'white'}}>
                                        <Button iconLeft full warning textStyle={{color:'white'}} style={{alignSelf:'center',width: 250}} onPress={() => this.props.navigation.navigate('RestHome')}>
                                            <Ionicons name="md-map" size={30} color="white" /> 
                                            <Text> Get Direction </Text>
                                        </Button>
                                    </Col>
                                </Row>
                            </CardItem>
                            <CardItem footer>
                                <Row>
                                    <Col style={{backgroundColor:'white'}}>
                                        <Text style={{paddingBottom:5}}>Detail Address: Building Number 102, Orchid Street San Chaung Township</Text>
                                        <Text style={{paddingBottom:5}}>Phone Number: 0933245667</Text>
                                        <Text style={{paddingBottom:5}}>Email: kfcsogood@gmail.com</Text>
                                    </Col>
                                </Row>
                            </CardItem>
                        </Card>
                    </Content>
                </Grid>
            </Container>
        )
    }
  };