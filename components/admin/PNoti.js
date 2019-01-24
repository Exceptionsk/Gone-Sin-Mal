import React, { Component } from 'react';
import { View, Image, StyleSheet, ImageBackground, ScrollView  } from 'react-native';
import { Container, Badge, H3, Header, Content, Card, CardItem,Grid,Row,Col, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

export default class PNoti extends Component {
  componentDidMount() {
    let that = this;
    setInterval(() => {
        that.setState({Notification: global.RefundNotification});
    }, 1000);
  }
  state = {
    Notification:[],
  };
  DoRefund(id){
    fetch(global.HostURL + '/api/Refund/' + id,{
      method:'DELETE',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        global.AdminNotification=responseJson;
    }).catch((error) => {
        // console.log("admin noti failed");
    });
  }

  render() {
    return(
    <Container>
    <Header style = {{ height: 60,backgroundColor: '#a3080c', paddingBottom: 0, paddingTop: 0}}>
    <Body>
      <H3 style={{ color: 'white', fontWeight: "bold", paddingTop: 0, paddingLeft: 8 }}>Refund Request</H3>
    </Body>
    </Header>
        <Grid>
            <Content style = {{backgroundColor:'#dfdfdf'}}>
            {
                this.state.Notification.map((item, key)=>
                  (
                    <View key={key}>
                      <Card style={{flex: 0, marginLeft: 0, width: '100%' }}>
                      <Row >
                        <Col style={{ backgroundColor: '#dfdfdf', height: '100%', width: '100%'}}>
                            <CardItem>
                              <Left>
                                  <Thumbnail source={{uri : item.img}} />
                                  <Body>
                                  <Text style={{fontWeight:'bold',fontSize:20,color:'#484848' }}>Refund Request</Text>
                                  <Text style={{textAlign:'justify',color:'#5d5d5d'}}>{item.Rest_name} has requested you to refund {item.Amount} Coins. Transfer amount to this Myan Pay Account : {item.Myan_pay}.</Text>
                                  </Body>
                              </Left>
                              <Button warning  style={{alignSelf:'center', width: 90,height:35,marginLeft:8}} onPress={() => this.DoRefund(item.ID)}>
                                  <Text style={{fontWeight:'bold',fontSize:13 }}>Complete</Text>
                                </Button>
                            </CardItem>
                        </Col>
                      </Row>
                      </Card>
                    </View>
                  )
                )
              }
            </Content>
        </Grid>
    </Container>
);
}
}
