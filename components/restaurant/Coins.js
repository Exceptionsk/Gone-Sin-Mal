import React, { Component } from 'react';
import {View, Image, StyleSheet, ImageBackground, ScrollView, Switch, Modal, Alert, TextInput} from "react-native";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Header, Tab, Tabs, TabHeading, Left, Right, Item, Input, Icon, Thumbnail, Content, Button, Footer, FooterTab, Badge, Card, CardItem, Body, Text } from 'native-base';
import ToggleSwitch from 'toggle-switch-react-native';
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Buy from './Buy';
import Refund from './Refund';

export default class Coins extends Component{
  componentDidMount() {
    let that = this;
    setInterval(() => {
        that.setState({restaurant: global.Restaurant});
    }, 1000);
  }
  state={
    restaurant:{},
    key:'',
  }

  cancelModal(){
    global.adminModel=false;
    global.authorized=false;
  }

  checkKey(){
    fetch(global.HostURL + '/api/Admin/authenticate?key='+ this.state.key)
     .then((response) => response.json())
     .then((responseJson) => {
       console.log(responseJson);
       if(responseJson=="Yes"){
         global.adminModel=false;
         global.authorized=true;
       }else{
         Alert.alert(
           'Wrong Key',
           'The Key you entered is Incorrect',
           [
             {text: 'OK', onPress: () => console.log('OK Pressed')},
           ]
         )
       }
     })
     .catch((error) => {
       console.log(error);
     });
  }

  render(){
    return(
      <Container>
      <Modal
       animationType="slide"
       transparent={true}
       visible={global.adminModel}>
       <View style={styles.modalcontainer}>
         <View style={styles.responsiveBox}>
             <TextInput style = {styles.input}
             underlineColorAndroid = "transparent"
             placeholder = " Enter Key"
             placeholderTextColor = "#3f3f3f"
             autoCapitalize = "none"
             onChangeText={(text) => this.setState({key:text})}
             />
             <View style={{alignSelf:'center', paddingBottom: 5}}>
               <MaterialCommunityIcons name="close-outline" size={40} color="#4cd58a" onPress={()=>{this.cancelModal()}}/>
             </View>
             <View style={{alignSelf:'center', paddingBottom: 5}}>
               <MaterialCommunityIcons name="check" size={40} color="#4cd58a" onPress={()=>{this.checkKey()}}/>
             </View>
         </View>
       </View>
     </Modal>
      <Header style = {{height: 60,backgroundColor: '#a3080c' , paddingBottom: 0, paddingTop: 0}}>
        <Body style={{width:300}}>
              <Text style = {{color: 'white'}}>Available Coins: {this.state.restaurant.Rest_coin}</Text>
        </Body>
        <Right>
              <Text style = {{color: 'white'}}>Spicial Coins : {this.state.restaurant.Rest_special_coin}</Text>
        </Right>
      </Header>
        <Tabs locked={true}>
          <Tab heading="Buy Coin" tabStyle={{ backgroundColor: "#ffbf00"}} textStyle={{color:'white'}} activeTabStyle={{ backgroundColor: "#ffbf00" }}>
              <Buy />
          </Tab>
          <Tab heading="Refund" tabStyle={{ backgroundColor: "#ffbf00"}} textStyle={{color:'white'}} activeTabStyle={{ backgroundColor: "#ffbf00" }}>
              <Refund />
          </Tab>
        </Tabs>
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
  })
