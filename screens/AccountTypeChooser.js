import React, {Component} from "react";
import {Image,ImageBackground,StyleSheet,View,Alert,TextInput} from "react-native";
import {Container, Button, Left, Right, Icon, Text} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Ionicons } from '@expo/vector-icons';
import { AsyncStorage } from "react-native"
import Expo, { Permissions, Notifications } from 'expo';

export default class Login extends Component {
  static navigationOptions = {
    header:null
  }

  render(){
    return(
      <Container>
        <ImageBackground source={require('../assets/wallpaper.jpg')} style={{width: '100%', height: '100%'}}>
          <Grid>
            <Row>
              <Col style={{height:'100%',paddingTop:200}}>
                <View style={{alignItems: 'center'}}>
                  <Image source={require('../assets/splash.png')} style={{height:160, width:160}} />
                </View>
                <View style={{alignItems: 'center'}}>
                  <Button iconLeft full primary textStyle={{color:'white', width:'500'}} style={{alignSelf:'center', width: 250}} onPress={() => this.props.navigation.navigate('UserRegister')}>
                    <Icon name='logo-facebook' />
                    <Text> Continue as Custmomer</Text>
                  </Button>
                  <Button iconLeft full success textStyle={{color:'white'}} style={{alignSelf:'center',width: 250}} onPress={() => this.props.navigation.navigate('Register')}>
                    <Icon name='logo-facebook' />
                    <Text> Continue as Resturant Owner </Text>
                  </Button>
                </View>
              </Col>
            </Row>
          </Grid>
        </ImageBackground>
      </Container>
    )
  }
};
