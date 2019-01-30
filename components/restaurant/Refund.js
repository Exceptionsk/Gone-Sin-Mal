import React, { Component } from 'react';
import {View, Image, StyleSheet, ImageBackground, ScrollView, Switch, Alert, Modal,TextInput} from "react-native";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import { Container, Label, Input, Header, H1,H2,H3, H4,Title, Item, Icon, Thumbnail, Content, Button, Footer, FooterTab, Badge, Card, CardItem, Body, Text } from 'native-base';
import { Form, TextValidator } from 'react-native-validator-form';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class Home extends Component{
  state={
    refund:'',
    myan_pay:'',
  };

  RequestRefund(){
    fetch(global.HostURL + '/api/Refund', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        User_id : global.Profile.id,
        Amount : this.state.refund,
        Myan_pay: this.state.myan_pay
      }),
    }).then((response) => response.json())
      .then((responsejson)=>{
        console.log(responsejson);
        if(responsejson=="Not Enough"){
          Alert.alert(
            'Low Balance!',
            'Your balance is lower then amount you entered.',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]
          )
        }else{
          global.Restaurant=responsejson;
          Alert.alert(
            'Request Success!',
            'You will get notification once Amount has been transfered.',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]
          )
        }
    }).catch((error) => {
      console.log(error);
      console.log("Transaction failed");
    });

  }
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange(event) {
    const email = event.nativeEvent.text;
    this.setState({ email });
}

submit() {
    // your submit logic
}

handleSubmit() {
  if(global.authorized){
    this.refs.form.submit();
  }else {
    Alert.alert(
      'Access Deinied',
      'Enter correct key to Refund!',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]
    )
  }

}
  render(){
    const { refund } = this.state;
    const { myan_pay } = this.state;
    return(
      <Container>
          <Form
                ref="form"
                onSubmit={()=> this.RequestRefund()}
            >
            <TextValidator style = {styles.inputRefund}
            name="refund"
            label="refund"
            validators={['required','isNumber']}
            errorMessages={[ 'This field is required','Input value must be number only']}
            errorStyle={{ container: { top: 0, left: 100,width:300, height:300, position: 'absolute' }, text: { color: 'red' }} }
            type="text"
            keyboardType="numeric"
            value={refund}
            onChangeText={(refund) => this.setState({refund:refund})} ref={(ref) => { this.input1 = ref }} placeholder="Enter refund amount"/>
              <TextValidator style = {styles.inputRefund}
              name="myan_pay"
              label="myan_pay"
              validators={['required']}
              errorMessages={[ 'This field is required']}
              errorStyle={{ container: { top: 0, left: 100,width:300, height:300, position: 'absolute' }, text: { color: 'red' }} }
              type="text"
              keyboardType="default"
              value={myan_pay}
              onChangeText={(myan_pay) => this.setState({myan_pay:myan_pay})} ref={(ref) => { this.input2 = ref }} placeholder="Enter Myan Pay User Account"/>
            <Button block success onPress={this.handleSubmit}>
              <Text>Refund Now</Text>
            </Button>
          </Form>
      </Container>
    );
  }
}

const styles= StyleSheet.create({
  inputRefund:{
    borderColor: 'black',
    borderBottomWidth: 1,
  },
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
