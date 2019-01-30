import React, {Component} from "react";
import {Image,ImageBackground,StyleSheet,View,Alert,TextInput, Modal} from "react-native";
import {Header} from "native-base";
import {Container, Button, Left, Right, Icon, Text} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import { AsyncStorage } from "react-native"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Expo, { Permissions, Notifications } from 'expo';

export default class Login extends Component {
  static navigationOptions = {
    header:null
  }
  state={
    key:'',
    modalVisible:false,
  }

  checkKey(){
    fetch(global.HostURL + '/api/Admin/authenticate?key='+ this.state.key)
     .then((response) => response.json())
     .then((responseJson) => {
       console.log(responseJson);
       if(responseJson=="Yes"){
         this.setState({modalVisible:false});
         fetch(global.HostURL + '/api/user/promote', {
           method: 'POST',
           headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           },
           body:JSON.stringify({
             User_id : global.Profile.id,
           }),
         }).then((response) => response.json())
           .then((responsejson)=>{
             this.props.navigation.navigate('AdminHome');
           });
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
           onRequestClose={()=>{this.setState({modalVisible:false});}}
           visible={this.state.modalVisible}>
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
                   <MaterialCommunityIcons name="check" size={40} color="#4cd58a" onPress={()=>{this.checkKey()}}/>
                 </View>
                 <View style={{alignSelf:'center', paddingBottom: 5}}>
                   <MaterialCommunityIcons name="close-outline" size={40} color="#4cd58a" onPress={()=>{this.setState({modalVisible:false})}}/>
                 </View>
             </View>
           </View>
         </Modal>
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
                  <Button iconLeft full orange textStyle={{color:'white'}} style={{alignSelf:'center',width: 250}} onPress={() => this.setState({modalVisible:true})}>
                    <Icon name='logo-facebook' />
                    <Text> Continue as Admin</Text>
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
  container:{
    flex:1,
    width:'100%',
    height:'100%',
  }
})
