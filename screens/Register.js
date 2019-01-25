import React, { Component } from 'react';
import {View, Image, StyleSheet, ImageBackground, ScrollView, Switch, AsyncStorage, Modal, Platform} from "react-native";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { ImagePicker,Permissions,Constants, MapView, Location, Marker } from 'expo';
import { Container,Textarea, Left, Right, Form, Label, Input, Header, H1,H2,H3, H4,Title, Item, Icon, Thumbnail, Content, Button, Footer, FooterTab, Badge, Card, CardItem, Body, Text } from 'native-base';
import { MaterialCommunityIcons,Ionicons,MaterialIcons } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class Register extends Component{
  static navigationOptions = {
    header:null
  }
  state={
    name:'',
    password1:'',
    password2:'',
    email:'',
    phone:'',
    township:'',
    lat:'4',
    long:'5',
    profilepic:'',
    location:'',

    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
    locationResult: null,
    location: {coords: { latitude: 37.78825, longitude: -122.4324}},
    currentlocation: null,
    latitude: null,
    longitude: null,

    modalVisible: false,
  }
  _pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ profilepic: result.uri });
    }
  };
  async signup(){
    var item = "";
    try {
      const retrievedItem =  await AsyncStorage.getItem('profile');
      item = JSON.parse(retrievedItem);
    } catch (error) {
      console.log(error.message);
    }
    try {
      var date = new Date();
      fetch(global.HostURL + '/api/Restaurant', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          User_id : item.id,
          Rest_name : this.state.name,
          Rest_Password : this.state.password1,
          Rest_email : this.state.email,
          Rest_phno : this.state.phone,
          Rest_township : this.state.township,
          Rest_lat : this.state.lat,
          Rest_long : this.state.long,
          Rest_created_date : date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear(),
          Rest_coin:0,
          Rest_special_coin:0,
          Rest_coin_purchased:0,
          Rest_location: this.state.location
        }),
      }).then((response) => response.json())
        .then((responsejson)=>{
          const data = new FormData();
          data.append('name', this.state.name); // you can append anyone.
          data.append('photo', {
            uri: this.state.profilepic,
            type: 'image/jpeg', // or photo.type
            name: this.state.name,
          });
          fetch(global.HostURL + '/api/restaurant/pic?id='+ responsejson.Rest_id + "&gallery=0", {
            method: 'post',
            body: data
          }).then((response) => response.json())
            .then((responsejson)=>{
              fetch(global.HostURL + '/api/User', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                  User_id : global.Profile.id,
                  User_type:'owner',
                }),
              }).then((response) => response.json())
                .then((responsejson)=>{
                  console.log(responsejson);
                  this.props.navigation.navigate('RestHome')
                }).catch((error)=>{
                   console.log(error);
                });
              });
        });
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  _getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
       location,
     });
   }

   let location = await Location.getCurrentPositionAsync({});
   this.setState({ locationResult: JSON.stringify(location), location, });
 };

  logAddress(lat, long){
    fetch('https://us1.locationiq.com/v1/reverse.php?key=84302eaf26a66d&lat='+ lat +'&lon='+ long +'&format=json')
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
    })
    .catch((error) => {
      console.log("address failed");
    });
  }

  setMapModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render(){
    return(
      <Container>
        <Header style = {{height: 70,backgroundColor: '#a3080c', paddingBottom: 0, paddingTop: 0}}>
          <Body>
            <Button transparent >
              <Icon style = {{color: 'white', paddingLeft:20}} name='ios-business' />
              <Text style = {{color: 'white', width:'100%'}} >Register</Text>
            </Button>
          </Body>
          <Right>
          </Right>
        </Header>

        <Grid>
        <Content>
          <Card style={{padding:10}}>
          <Form>
            <Row>
              <Col style={{width:100}}>
                <Button onPress={this._pickImage} transparent style={{alignSelf:'center',width:100, height:100, borderWidth: 1, borderColor:'black'}}>
                  
                  <Image style={{ height: 100, width:100, flex: 1 }} source={{uri : this.state.profilepic}} />
                </Button>
              </Col>
              <Col>
                <Item  >
                  <Icon active name='ios-contact' />
                  <Input onChangeText={(value) => this.setState({name:value})} placeholder="Enter Name"/>
                </Item>
                <Item >
                  <Icon active name='ios-compass' />
                  <Input onChangeText={(value) => this.setState({township:value})} placeholder="Enter Township"/>
                </Item>
              </Col>
            </Row>
            <Row>
              <Col>
                <Item>
                  <Icon active name='md-key' />
                  <Input onChangeText={(value) => this.setState({password1:value})} placeholder="Enter password"/>
                </Item>
                <Item>
                  <Icon active name='md-key' />
                  <Input onChangeText={(value) => this.setState({password2:value})} placeholder="Confirm passowrd"/>
                </Item>
                <Item >
                  <Icon active name='ios-mail' />
                  <Input onChangeText={(value) => this.setState({email:value})} placeholder="Enter email address"/>
                </Item>
                <Item >
                  <Icon active name='ios-call' />
                  <Input onChangeText={(value) => this.setState({phone:value})} placeholder="Enter phone number"/>
                </Item>
                <Item>
                  <Textarea rowSpan={3} onChangeText={(value) => this.setState({location:value})} placeholder="Press the icon to choose your address" style={{padding:10}} />
                  <Right>
                    <Button onPress={()=>{this.setMapModalVisible(!this.state.modalVisible);}} transparent style={{height:70}}>
                      <MaterialIcons name="add-location" size={50} color="#4cd58a"/>
                    </Button>
                  </Right>
                </Item>
                <Modal
                animationType="slide"
                transparent={true}
                onRequestClose={()=>{this.setMapModalVisible(!this.state.modalVisible);}}
                visible={this.state.modalVisible}>
                  <View style={styles.Mapmodalcontainer}>
                      <View style={styles.responsiveMapBox}>
                          <Header style = {{height: hp('5%'),backgroundColor: '#4cd58a', paddingBottom: 0, paddingTop: 0, marginBottom: 8, borderBottomWidth:0}}>
                              <Right>
                                <Button transparent onPress={()=>{this.setMapModalVisible(!this.state.modalVisible);}}>
                                  <MaterialCommunityIcons name="window-close" size={20} color="#959595" />
                                </Button>
                              </Right>
                          </Header>
                          <MapView
                              style={{ flex: 1 }}
                              region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
                              zoomEnabled={true}
                          >
                          <MapView.Marker
                          draggable
                          coordinate={this.state.location.coords}
                          title="My Location"
                          description="Location description"
                          onDragEnd={e => this.logAddress(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)}
                          />
                          </MapView>
                      </View>
                  </View>
                </Modal>
              </Col>
            </Row>
            <Row>
              <Col style={{padding:10}}>
                <Button full warning textStyle={{color:'white'}} style={{alignSelf:'center',width: 150}} >
                  <Text> Cancel </Text>
                </Button>
              </Col>
              <Col style={{padding:10}}>
              <Button full danger textStyle={{color:'white'}} style={{alignSelf:'center',width: 150}} onPress={this.signup.bind(this)}>
                  <Text>Sign Up </Text>
                </Button>
              </Col>
            </Row>
          </Form>
          </Card>
          </Content>
        </Grid>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  Mapmodalcontainer:{
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  responsiveMapBox: {
    width: wp('84.5%'),
    height: hp('43%'),
    backgroundColor: '#4cd58a',
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: 'white',
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
});
