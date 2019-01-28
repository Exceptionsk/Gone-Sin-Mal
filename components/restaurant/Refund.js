import React, { Component } from 'react';
import {View, Image, StyleSheet, ImageBackground, ScrollView, Switch, Alert} from "react-native";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Ionicons } from '@expo/vector-icons';
import { Container, Label, Input, Header, H1,H2,H3, H4,Title, Item, Icon, Thumbnail, Content, Button, Footer, FooterTab, Badge, Card, CardItem, Body, Text } from 'native-base';
import { Form, TextValidator } from 'react-native-validator-form';


export default class Home extends Component{
  state={
    refund:'',
    myan_pay:''
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
        }else if(responsejson!=null){
          global.Restaurant=responsejson;
          this.input1._root.clear();
          this.input2._root.clear();
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
    this.refs.form.submit();
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
            <TextValidator style = {styles.input}
            name="refund"
            label="refund"
            validators={['required','isNumber']}
            errorMessages={[ 'This field is required','Input value must be number only']}
            errorStyle={{ container: { top: 0, left: 100,width:300, height:300, position: 'absolute' }, text: { color: 'red' }} }
            type="text"
            keyboardType="numeric"
            value={refund}
            onChangeText={(refund) => this.setState({refund:refund})} ref={(ref) => { this.input1 = ref }} placeholder="Enter refund amount"/>
              <TextValidator style = {styles.input}
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
  input: {
      borderColor: 'black',
      // borderRadius: 5,
      borderBottomWidth: 1,
      width:'100%',
      height:40
   },
})
