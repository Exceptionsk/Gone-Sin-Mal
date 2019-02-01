import React, { Component } from 'react';
import { View, Image, StyleSheet, ImageBackground, ScrollView, Modal, AsyncStorage  } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Badge, H3, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import {Actions} from 'react-native-router-flux';
import User from './Userprofile';
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class Notification extends Component {
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  };
  componentDidMount() {
    let that = this;
    setInterval(() => {
        that.setState({Notification: global.CustNotification});
    }, 1000);
  }
  state = {
    modalVisible: false,
    Notification:[],
  };
  Component
  render() {
    return(
    <Container>
        <Header style = {{height: 75,backgroundColor: '#a3080c' , paddingBottom: 0, paddingTop: 0}}>
        <Button transparent style={{height:70, width:'100%', justifyContent: 'flex-start'}} onPress={() => {this.setModalVisible(true);}}>
          <Thumbnail style = {{  borderColor: 'white', borderWidth: 2}}  source={{uri: 'https://graph.facebook.com/'+ global.Profile.id + '/picture?type=normal'}} />
          <Text >{global.Profile.name}</Text>
        </Button>
        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={()=>{this.setModalVisible(!this.state.modalVisible);}}
          visible={this.state.modalVisible}>
            <View style={styles.modalcontainer}>
              <View style={styles.responsiveBox}>
                <Header style = {{height: 40,backgroundColor: 'white', borderBottomWidth:0,paddingBottom: 0, paddingTop: 0}}>
                  <Right>
                    <Button transparent onPress={()=>{this.setModalVisible(!this.state.modalVisible);}}>
                      <MaterialCommunityIcons name="window-close" size={20} color="#959595" />
                    </Button>
                  </Right>
                </Header>
                <User/>
              </View>
            </View>
        </Modal>
        </Header>
        <Grid>
          <Row style={{height: 50}}>
                  <Col style={{ height: 50, paddingTop: 15 }}>
                    <H3 style={{ fontWeight: "bold", paddingTop: 0, paddingLeft: 8 }}>Notification</H3>
                  </Col>
            </Row>
            <Content style = {{backgroundColor:'#dfdfdf'}}>
            {
                this.state.Notification.map((item, key)=>
                  (
                <Row key={key} style={{ paddingBottom:0, marginBottom:0}}>
                  <Col style={{ backgroundColor: '#dfdfdf', height: '100%', width: '100%', paddingBottom:0, marginBottom:0}}>
                    <Card style={{flex: 0, marginLeft: 0, width: '100%'}}>
                            <CardItem>
                            <Left>
                            <Thumbnail style = {{ borderColor: 'grey', borderWidth: 1}}  source={require('../../assets/icon.png')} />
                                <Body>
                                <Text style={{fontWeight:'bold',fontSize:20,color:'#484848'}}>{item.Noti_text}</Text>
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
const styles= StyleSheet.create({
  modalcontainer:{
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  responsiveBox: {
    width: wp('84.5%'),
    height: hp('73%'),
    backgroundColor: 'white',
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: 'grey',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 3,
    shadowOpacity: 0.5,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
    image:{
      height: '100%',
      width: '100%',
      borderColor: '#787878',
      borderWidth: 1
    },
    imagetwo:{
      height: 125,
      width: 120,
      borderColor: '#a3a3a3',
      borderWidth: 0.5,
      padding: 0
    },
    imgcol:{
      padding: 20,
      color: 'white',
    },
    imgcoltwo:{
      paddingTop: 20,
      paddingLeft: 20,
      color: 'white',
    },
    imgcolthree:{
      paddingTop: 20,
      color: 'white',
    },
    imgcolfour:{
      paddingTop: 20,
      paddingLeft:20,
      paddingRight:0,
      color: 'white',
    },
    container:{
      flex:1,
      width:'100%',
      height:'100%',
    }
  })
