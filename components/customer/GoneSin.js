import React, { Component } from 'react';
import { View, Image, Modal, AsyncStorage, StyleSheet, AppRegistry } from 'react-native';
import { Container, Badge, H3, Header, Content, Row,Grid, Col, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode';
import {widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor,
  removeOrientationListener as rol} from 'react-native-responsive-screen';
import User from './Userprofile';
export default class GoneSin extends Component {
  componentDidMount() {
    lor(this);
  }
  
  componentWillUnmount() {
    rol();
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  };
  setModalVisibleGoneSin(visible) {
    this.setState({modalVisibleGoneSin: visible});
  };
  state = {
    text: '1000 points',
    modalVisible: false,
    modalVisibleGoneSin: false,
  };
  constructor()
  {
    super();
    this.items = [
      {name:'KFC',
       date:'April 15, 2019' ,
       img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg',
       point:'1,000 Points',
       gonesin: 'GoneSin!',
      },
      {name:'KFC',
      date:'April 15, 2019' ,
      img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg',
      point:'1,000 Points',
      gonesin: 'GoneSin!',
      },
      {name:'KFC',
      date:'April 15, 2019' ,
      img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg',
      point:'1,000 Points',
      gonesin: 'GoneSin!',
      },
      {name:'KFC',
      date:'April 15, 2019' ,
      img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg',
      point:'1,000 Points',
      gonesin: 'GoneSin!',
      },
      {name:'KFC',
      date:'April 15, 2019' ,
      img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg',
      point:'1,000 Points',
      gonesin: 'GoneSin!',
      },
      {name:'KFC',
      date:'April 15, 2019' ,
      img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg',
      point:'1,000 Points',
      gonesin: 'GoneSin!',
      },
    ];
  }
  render() {
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
          <Row style={{height: 50}}>
                <Col style={{ height: 50, paddingTop: 15 }}>
                   <H3 style={{ fontWeight: "bold", paddingTop: 0, paddingLeft: 8 }}>Gone Sin List!</H3>
                </Col>
          </Row>
          <Content style={{ backgroundColor: '#484848'}}>
            {
              this.items.map((item, key)=>
              (
            <Row key={key}>
              <Col style={{ backgroundColor: '#484848', height: 150 }}>
                      <Card style={{flex: 0, marginLeft: 7, width: 192 }}>
                            <CardItem>
                            <Left>
                                <Thumbnail source={{uri : item.img}} />
                                <Body>
                                <Text>{item.name}</Text>
                                <Text note>{item.date}</Text>
                                </Body>
                            </Left>
                            </CardItem>
                            <CardItem>
                            <Left>
                              <Modal
                                animationType="slide"
                                transparent={false}
                                onRequestClose={()=>{this.setModalVisibleGoneSin(!this.state.modalVisibleGoneSin);}}
                                visible={this.state.modalVisibleGoneSin}>
                                <Header style = {{height: 40,backgroundColor: '#a3080c' , color: 'orange', paddingBottom: 0, paddingTop: 0}}>
                                <Right>
                                  <Button transparent onPress={()=>{this.setModalVisibleGoneSin(!this.state.modalVisibleGoneSin);}}>
                                      <Icon name="close"/>
                                  </Button>
                                </Right>
                                </Header>
                                <Container>
                                  <Content>
                                    <Grid>
                                      <Row>
                                        {/* <Col style={{backgroundColor:'red'}}></Col> */}
                                        <Col>
                                          <Card>
                                            <CardItem header>
                                              <View style={styles.container}>
                                                <View style={styles.textWrapper}>
                                                    <QRCode
                                                      value={global.Profile.id+this.state.text}
                                                      size={200}
                                                      bgColor='purple'
                                                      fgColor='white'/>
                                                </View>
                                              </View>
                                            </CardItem>
                                          </Card>
                                        </Col>
                                        {/* <Col style={{backgroundColor:'blue'}}></Col> */}
                                      </Row>
                                    </Grid>
                                  </Content>
                                </Container>


                              </Modal>
                                <Button transparent textStyle={{color: '#87838B'}} onPress={() => {this.setModalVisibleGoneSin(true);}}>
                                {/* <Ionicons name="ios-restaurant" size={30} color="black" />  */}
                                <Badge style={{ backgroundColor: 'black' }}>
                                    <Text style={{ color: 'white', fontSize: 10 }}>{item.point}</Text>
                                </Badge>
                                <Text style={{paddingBottom: 17, color: 'orange',fontWeight: "bold" }}>{item.gonesin}</Text>
                                </Button>
                            </Left>

                            </CardItem>
                      </Card>
              </Col>
              <Col style={{ backgroundColor: '#484848', height: 150 }}>
                      <Card style={{flex: 0, marginLeft: 7, width: 192 }}>
                            <CardItem>
                            <Left>
                                <Thumbnail source={{uri : item.img}} />
                                <Body>
                                <Text>{item.name}</Text>
                                <Text note>{item.date}</Text>
                                </Body>
                            </Left>
                            </CardItem>
                            <CardItem>
                            <Left>
                                <Button transparent textStyle={{color: '#87838B'}}>
                                {/* <Ionicons name="ios-restaurant" size={30} color="black" />  */}
                                <Badge style={{ backgroundColor: 'black' }}>
                                    <Text style={{ color: 'white', fontSize: 10 }}>{item.point}</Text>
                                </Badge>
                                <Text style={{paddingBottom: 17, color: 'orange',fontWeight: "bold" }}>{item.gonesin}</Text>
                                </Button>
                            </Left>

                            </CardItem>
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
const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      // width: wp('70%'),
      // height: hp('80%'),
  },
  textWrapper: {
    height: hp('86.5%'),
    paddingTop: hp('30%'),
  },
});

AppRegistry.registerComponent('HelloWorld', () => GoneSin);

module.exports = GoneSin;