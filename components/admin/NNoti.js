import React, { Component } from 'react';
import { View, Image, StyleSheet, ImageBackground, ScrollView  } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Badge, H3, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import {Actions} from 'react-native-router-flux';

export default class NNoti extends Component {
  componentDidMount() {
    let that = this;
    setInterval(() => {
        that.setState({Notification: global.AdminNotification});
    }, 1000);
  }
  state = {
    Notification:[],
  };
  render() {
    return(
    <Container>
    <Header style = {{ height: 60,backgroundColor: '#a3080c', paddingBottom: 0, paddingTop: 0}}>
    <Body>
      <H3 style={{ color: 'white', fontWeight: "bold", paddingTop: 0, paddingLeft: 8 }}>Notification</H3>
    </Body>
    </Header>
        <Grid>
            <Content style = {{backgroundColor:'#dfdfdf'}}>
            {
                this.state.Notification.map((item, key)=>
                  (
                <Row key={key}>
                  <Col style={{ backgroundColor: '#dfdfdf', height: '100%', width: '100%'}}>
                    <Card style={{flex: 0, marginLeft: 0, width: '100%' }}>
                            <CardItem>
                            <Left>
                                <Thumbnail source={{uri : item.img}} />
                                <Body>
                                <Text style={{fontWeight:'bold',fontSize:20,color:'#484848' }}>{item.Noti_text}</Text>
                                <Text style={{textAlign:'justify',color:'#5d5d5d'}}>{item.Notification}</Text>
                                </Body>
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
