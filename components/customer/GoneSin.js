import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Container, Badge, H3, Header, Content, Row,Grid, Col, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export default class GoneSin extends Component {
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