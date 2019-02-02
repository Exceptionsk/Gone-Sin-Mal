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
 constructor(props){
   super(props);
   this.state={
     userInfo:null,
     token:null,
   };
 }

 async registerForPushNotifications() {
   const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

   if (status !== 'granted') {
     const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
     if (status !== 'granted') {
       return;
     }
   }

   const token = await Notifications.getExpoPushTokenAsync();
   console.log(status,token);
   this.subscription = Notifications.addListener(this.handleNotification);

   this.setState({
     token:token,
   });
 }

 handleNotification = notification => {
   console.log(notification);
   fetch(global.HostURL + '/api/notification/' + global.Profile.id+"?type=customer")
   .then((response) => response.json())
   .then((responseJson) => {
     global.CustNotification=responseJson;
   })
   .catch((error) => {
     // console.log("Customer noti failed");
   });

   fetch(global.HostURL + '/api/notification/' + global.Profile.id+"?type=admin")
   .then((response) => response.json())
   .then((responseJson) => {
     global.AdminNotification=responseJson;
   })
   .catch((error) => {
     // console.log("Admin noti failed");
   });

   fetch(global.HostURL + '/api/notification/' + global.Profile.id+"?type=restaurant")
   .then((response) => response.json())
   .then((responseJson) => {
     console.log("rest noti here");
     console.log(responseJson);
     global.RestNotification=responseJson;
   })
   .catch((error) => {
     // console.log("Restaurant noti failed");
   });

 };

 componentDidMount() {
   (async () => {
     await this.registerForPushNotifications();
 })();
 }

 LogInApp(json){
   fetch(global.HostURL + '/api/User', {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     },
     body:JSON.stringify({
       User_id : json.id,
       User_name : json.name,
       User_available_coin:0,
       User_noti_token: this.state.token,
       User_visited_restaurant:0,
       User_type:'new',
     }),
   }).then((response) => response.json())
     .then((responsejson)=>{
       console.log(responsejson.User_type);
       if(responsejson.User_type=="customer"){
         this.props.navigation.navigate('CustHome')
       }else if (responsejson.User_type=="admin") {
         this.props.navigation.navigate('AdminHome')
       }else if (responsejson.User_type=="owner"){
         this.props.navigation.navigate('RestHome')
       }else if(responsejson.User_type=="new"){
         this.props.navigation.navigate('AccountType')
       }
     }).catch((error)=>{
        console.log(error);
     });
 }

  async logInFB() {
    var item = null;
    try {
      const retrievedItem =  await AsyncStorage.getItem('profile');
      item = JSON.parse(retrievedItem);
    } catch (error) {
      console.log(error.message);
    }
    if(item==null){
      const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
        "2071732326473547",
        {
          permissions: ["public_profile"]
        }
      );
      if (type === 'success') {
        console.log(type+"gg");
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name` );
          const json = await response.json()
          try {
              var jsonOfItem = await AsyncStorage.setItem('profile', JSON.stringify(json));
              global.Profile = json;
          } catch (error) {
            console.log(error.message);
          }
          this.LogInApp(json);
      }
      else {
        // Handle errors here.
      }
    }else{
      global.Profile = item;
      this.LogInApp(item);
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



handleType(e){
  global.HostURL='http://'+e.nativeEvent.text+':2940';
  console.log(global.HostURL);
}

  render(){
    return(
      <Container>
        <ImageBackground source={require('../assets/wallpaper2.jpg')} style={{width: '100%', height: '100%'}}>
          <Grid>
            <Row>
              <Col style={{height:'100%',column:'100%',paddingTop:200}}>
                <View style={{alignItems: 'center'}}>
                  <Image source={require('../assets/Gonesinlogo2.png')} style={{height:170, width:250}} />
                </View>
                <View style={{alignItems: 'center',paddingTop:10}}>
                  <TextInput style={{flex:1}}
                  underlineColorAndroid = "transparent"
                  placeholder = " Search "
                  placeholderTextColor = "#3f3f3f"
                  autoCapitalize = "none"
                  returnKeyType="done"
                  onSubmitEditing={this.handleType.bind(this)}
                  value={this.state.value}
                  style={{alignSelf:'center', width: 250, backgroundColor:'white'}}
                  />
                  <Button iconLeft full primary textStyle={{color:'white'}} style={{alignSelf:'center',width: 250, borderRadius:8}} onPress={this.logInFB.bind(this)}>
                    <Icon name='logo-facebook' />
                    <Text>Facebook Login</Text>
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

// <Button iconLeft full primary textStyle={{color:'white', width:'500'}} style={{alignSelf:'center', width: 250}} onPress={()=>this.DummyLogin('CustHome')}>
//   <Icon name='logo-facebook' />
//   <Text> Login with Facebook </Text>
// </Button>
// <Button iconLeft full success textStyle={{color:'white'}} style={{alignSelf:'center',width: 250}} onPress={() => this.DummyLogin('RestHome')}>
//   <Icon name='logo-facebook' />
//   <Text> Sign Up for Restaurant </Text>
// </Button>
// <Button iconLeft full warning textStyle={{color:'white'}} style={{alignSelf:'center',width: 250}} onPress={() => this.DummyLogin('AdminHome')}>
//   <Icon name='logo-facebook' />
//   <Text> Admin Login </Text>
// </Button>
// <Button iconLeft full danger textStyle={{color:'white'}} style={{alignSelf:'center',width: 250}} onPress={() => this.props.navigation.navigate('Register')}>
//   <Icon name='logo-facebook' />
//   <Text> Register </Text>
// </Button>
