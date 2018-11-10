import React, {Component} from "react";
import {Image,ImageBackground,StyleSheet,View,Alert} from "react-native";
import {Container, Button, Left, Right, Icon, Text} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Ionicons } from '@expo/vector-icons';
import { AsyncStorage } from "react-native"

export default class Login extends Component {
  static navigationOptions = {
    header:null
  }
 constructor(props){
   super(props);
   this.state={userInfo:null};
 }

  async logInFB() {

    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      "2071732326473547",
      {
        permissions: ["public_profile"]
      }
    );
    if (type === 'success') {
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large)` );
        const json = await response.json()
        try {
            var jsonOfItem = await AsyncStorage.setItem('profile', JSON.stringify(json));
            console.log(json);
        } catch (error) {
          console.log(error.message);
        }
        try {
          fetch(global.HostURL + '/api/User', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
              User_id : json.id,
              User_Name : json.name,
            }),
          }).then((response) => response.json())
            .then((responsejson)=>{
              console.log(responsejson.User_Type);
              if(responsejson.User_Type=="normal"){
                this.props.navigation.navigate('CustHome')
              }else if (responsejson.User_Type=="admin") {
                this.props.navigation.navigate('AdminHome')
              }else if (responsejson.User_Type=="owner"){
                this.props.navigation.navigate('RestHome')
              };
              this.props.navigation.navigate('CustHome')
            }).catch((error)=>{
               this.props.navigation.navigate('CustHome')
            });
        } catch (e) {
          console.log('failed');

        }
    }
    else {
      // Handle errors here.
    }
  }

  // _renderUserInfo = () => {
  //   return (
  //     <View style={{alignItems:'center'}}>
  //       <Image source={{uri:this.state.userInfo.picture.data.url}} style={{width:100,height:100,borderRadius:50}}/>
  //       <Text style={{fontSize:20}}>{this.state.userInfo.name}</Text>
  //       <Text>ID:{this.state.userInfo.id}</Text>
  //     </View>
  //   )
  // };
//   updateState (data) {
//     this.setState(data);
// }

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
                  <Button iconLeft full primary textStyle={{color:'white', width:'500'}} style={{alignSelf:'center', width: 250}} onPress={this.logInFB.bind(this)}>
                    <Icon name='logo-facebook' />
                    <Text> Login with Facebook </Text>
                  </Button>
                  <Button iconLeft full success textStyle={{color:'white'}} style={{alignSelf:'center',width: 250}} onPress={() => this.props.navigation.navigate('RestHome')}>
                    <Icon name='logo-facebook' />
                    <Text> Sign Up for Restaurant </Text>
                  </Button>
                  <Button iconLeft full warning textStyle={{color:'white'}} style={{alignSelf:'center',width: 250}} onPress={() => this.props.navigation.navigate('AdminHome')}>
                    <Icon name='logo-facebook' />
                    <Text> Admin Login </Text>
                  </Button>
                  <Button iconLeft full danger textStyle={{color:'white'}} style={{alignSelf:'center',width: 250}} onPress={() => this.props.navigation.navigate('Register')}>
                    <Icon name='logo-facebook' />
                    <Text> Register </Text>
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
