import React, { Component } from 'react';
import {View, Image, StyleSheet, ImageBackground, ScrollView, Switch, WebView, Modal,Alert, TextInput} from "react-native";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Header,Right, H1,H2,H3, H4,Title, Item, Input, Icon, Thumbnail, Content, Button, Footer, FooterTab, Badge, Card, CardItem, Body, Text } from 'native-base';
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default class Home extends Component{
  state = {
    modalVisible: false,
    Normal:[],
    Special:[],
    Payment_Link:'',
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  newTransaction(type, package_id, url){
    if(global.authorized){
      this.setModalVisible(true);
      this.setState({Payment_Link:url});
      fetch(global.HostURL + '/api/transaction/request', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          User_id : global.Profile.id,
          Tran_type: type,
          Pending: true,
          Package_id: package_id,
        }),
      }).then((response) => response.json())
        .then((responsejson)=>{
          console.log(responsejson);
      }).catch((error) => {
        console.log(error);
        console.log("Transaction failed");
      });
    }else{
      Alert.alert(
        'Access Denied',
        'Enter correct key to Buy Coins!',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]
      )
    }

  }
  getPackage(){
    return fetch(global.HostURL + '/api/package')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
         Normal: responseJson.filter(function (item) {return item.Package_type === "normal";}),
         Special:responseJson.filter(function (item) {return item.Package_type === "special";}),
       }, function(){

       });
    })
    .catch((error) => {
      console.log("Package failed");
    });
  }
  componentWillMount(){
    this.getPackage();
  }

  render(){
    return(
      <Container>
      <Modal
          animationType="slide"
          transparent={false}
          onRequestClose={()=>{this.setModalVisible(!this.state.modalVisible);}}
          visible={this.state.modalVisible}>
          <Header style = {{height: 40,backgroundColor: '#a3080c', paddingBottom: 0, paddingTop: 0}}>
          <Right>
            <Button transparent onPress={()=>{this.setModalVisible(!this.state.modalVisible);}}>
                <Icon name="close"/>
            </Button>
          </Right>
          </Header>
          <WebView
            source={{
              uri: this.state.Payment_Link
            }}
            onNavigationStateChange={this.onNavigationStateChange}
            startInLoadingState
            scalesPageToFit
            javaScriptEnabled
            style={{ flex: 1 }}
            />
        </Modal>
        <Grid>
          <Content style = {{backgroundColor:'#dfdfdf'}}>
          <Row>
            <Col style={{ backgroundColor: 'white', height: 40 }}>
              <H3 style={{ color: 'black',fontWeight: "bold", paddingLeft: 10, paddingTop: 10 }}>
                Buy Normal coins
              </H3>
            </Col>
          </Row>
          <View style={{backgroundColor: "white"}}>
            <ScrollView horizontal={true}>
              <Row>
              {
                this.state.Normal.map((item, key)=>
                  (
                    <Col style={{ backgroundColor: 'white', height: 180, width: 140,marginRight:0 }} key={key}>
                        <View style = {styles.imgcolfour}>
                          <Button transparent style={{height: 120 , width: '100%'}} onPress={this.newTransaction.bind(this,'normal',item.Package_id, item.Myanpay_button_link)} >
                            <Thumbnail style={styles.imagetwo} source={{uri : global.HostURL + "/api/package/image/" + item.Package_id}} />
                          </Button>
                          <Button transparent textStyle={{color: '#87838B'}} style={{alignSelf:'center'}}>
                            <Text style={{paddingTop:14,paddingBottom: 23, color: 'black' }}>{item.Package_coin_amount}</Text>
                          </Button>
                        </View>
                    </Col>
                  )
                )
              }
              </Row>
            </ScrollView>
          </View>
          <Row>
            <Col style={{ backgroundColor: 'white', height: 40 }}>
              <H3 style={{ color: 'black',fontWeight: "bold", paddingLeft: 10, paddingTop: 10 }}>
                Buy Special coins
              </H3>
            </Col>
          </Row>
          <View style={{backgroundColor: "white"}}>
            <ScrollView horizontal={true}>
              <Row>
              {
                this.state.Special.map((item, key)=>
                  (
                    <Col style={{ backgroundColor: 'white', height: 180, width: 140,marginRight:0 }} key={key}>
                        <View style = {styles.imgcolfour}>
                          <Button transparent style={{height: 120 , width: '100%'}} onPress={this.newTransaction.bind(this,'special',item.Package_id, item.Myanpay_button_link)}>
                            <Thumbnail style={styles.imagetwo} source={{uri : global.HostURL + "/api/package/image/" + item.Package_id}} />
                          </Button>
                          <Button transparent textStyle={{color: '#87838B'}}  style={{alignSelf:'center'}}>
                            <Text style={{paddingTop:14,paddingBottom: 23, color: 'black' }}>{item.Package_coin_amount}</Text>
                          </Button>
                        </View>
                    </Col>
                  )
                )
              }
              </Row>
            </ScrollView>
          </View>
          </Content>
        </Grid>
      </Container>
    );
  }
}
const styles= StyleSheet.create({
  input: {
      borderColor: '#ff7d21',
      borderRadius: 5,
      borderWidth: 1,
      width:'100%',
      height:40
   },
  modalcontainer:{
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  responsiveBox: {
    width: wp('84.5%'),
    height: hp('23%'),
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
      height: 3
    },
    shadowRadius: 3,
    shadowOpacity: 0.5,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  responsiveBoxphnumber: {
    width: wp('84.5%'),
    height: hp('22%'),
    paddingBottom: 8,
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
      height: 3
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
  },
  container:{
    flex:1,
    width:'100%',
    height:'100%',
  }
})
