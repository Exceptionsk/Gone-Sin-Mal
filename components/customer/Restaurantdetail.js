import React, { Component } from 'react';
import { Image,StyleSheet, Modal, AsyncStorage } from 'react-native';
import { Container, Badge, H2, H3, Header, Content, Row,Grid, Col, Card, CardItem, Thumbnail, Text, Button, Icon, Body, Right } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import User from './Userprofile';
export default class Login extends Component {
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  };
  state = {
    modalVisible: false,
    resturant:'',
  };
  static navigationOptions = {
        header:null
  }

  getinfo(){
    const { navigation } = this.props;
    return fetch(global.HostURL + '/api/Restaurant?id=' + navigation.getParam('Rest_id', '1'))
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
      console.log("resturant info failed");
    });
  }

  componentDidMount(){
    this.getinfo();
  }
    render(){
        return(
            <Container>
                <Header style = {{height: 90,backgroundColor: '#a3080c' , color: 'orange', paddingBottom: 0, paddingTop: 0}}>
                  <Button transparent style={{height:70}} onPress={() => {this.setModalVisible(true);}}>
                      <Thumbnail style = {{ marginLeft:15, borderColor: 'white', borderWidth: 2}}  source={{uri: 'https://graph.facebook.com/'+ global.Profile.id + '/picture?type=normal'}} />
                      <Text style = {{color: 'white'}}>{global.Profile.name}</Text>
                  </Button>
                  <Button transparent>
                      <Text style = {{color: 'white'}}>Available Coin : 1,866P</Text>
                  </Button>
                  <Modal
                    animationType="slide"
                    transparent={false}
                    onRequestClose={()=>{this.setModalVisible(!this.state.modalVisible);}}
                    visible={this.state.modalVisible}>
                    <Header style = {{height: 40,backgroundColor: '#a3080c' , color: 'orange', paddingBottom: 0, paddingTop: 0}}>
                    <Right>
                      <Button transparent onPress={()=>{this.setModalVisible(!this.state.modalVisible);}}>
                          <Icon name="close"/>
                      </Button>
                      </Right>
                    </Header>
                    <User/>
                  </Modal>
                </Header>
                <Grid>
                    <Content style={{ backgroundColor: '#dfdfdf'}}>
                        <Card style={{width:'99%'}}>
                            <CardItem header>
                            <Row>
                                <Col style={{backgroundColor:'white',width:110}}>
                                    <Thumbnail large style = {{ marginLeft:15, borderColor: '#404040', borderWidth: 2}} source={{uri : global.HostURL + '/api/resturant/profile_pic/' + this.state.resturant.Rest_id}} />
                                </Col>
                                <Col style={{backgroundColor:'white'}}>
                                    <H2>{this.state.resturant.Rest_name}</H2>
                                    <H2 style={{color:'#404040'}}>Catagory: {this.state.resturant.Rest_id}</H2>
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
                                        <Text style={{paddingBottom:5}}>Detail Address: {this.state.resturant.Rest_location}</Text>
                                        <Text style={{paddingBottom:5}}>Phone Number: {this.state.resturant.Rest_phno}</Text>
                                        <Text style={{paddingBottom:5}}>Email: {this.state.resturant.Rest_email}</Text>
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
