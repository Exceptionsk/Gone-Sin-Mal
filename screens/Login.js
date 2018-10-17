import React, {Component} from "react";
import {Image,ImageBackground,StyleSheet,View} from "react-native";
import {Container, Button, Left, Right, Icon, Text} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Ionicons } from '@expo/vector-icons';
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
            </Row>
            <Row>
              <Col>
                <View style={{alignItems: 'center'}}>
                  <Image source={require('../assets/splash.png')} style={{height:160, width:160}} />
                </View>
                <View style={{alignItems: 'center'}}>
                  <Button iconLeft full primary textStyle={{color:'white', width:'500'}} style={{alignSelf:'center', width: 250}} onPress={() => this.props.navigation.navigate('CustHome')}>
                    <Icon name='logo-facebook' />
                    <Text> Login with Facebook </Text>
                  </Button>
                  <Button iconLeft full success textStyle={{color:'white'}} style={{alignSelf:'center',width: 250}} onPress={() => this.props.navigation.navigate('RestHome')}>
                    <Icon name='logo-facebook' />
                    <Text> Sign Up for Restaurant </Text>
                  </Button>
                  <Button iconLeft full primary textStyle={{color:'white'}} style={{alignSelf:'center',width: 250}} onPress={() => this.props.navigation.navigate('RestHome')}>
                    <Icon name='logo-facebook' />
                    <Text> Restaurant Login </Text>
                  </Button>
                </View>
              </Col>
            </Row>
            <Row>
            </Row>
          </Grid>
        </ImageBackground>
      </Container>

    )
  }
};
