import React, { Component } from 'react';
import {View, Image, StyleSheet, ImageBackground, ScrollView, Switch, AsyncStorage, Modal, Platform, TouchableOpacity} from "react-native";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { ImagePicker,Permissions,Constants, MapView, Location, Marker } from 'expo';
import { Container,Textarea, Left, Right, Label, Input, Header, H1,H2,H3, H4,Title, Item, Icon, Thumbnail, Content, Button, Footer, FooterTab, Badge, Card, CardItem, Body, Text } from 'native-base';
import { MaterialCommunityIcons,Ionicons,MaterialIcons } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Form, TextValidator } from 'react-native-validator-form';

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
    category:'',
    lat:'4',
    long:'5',
    profilepic:'',
    display_name:'',
    state:'',
    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
    locationResult: null,
    location: {coords: { latitude: 37.78825, longitude: -122.4324}},
    currentlocation: null,
    latitude: null,
    longitude: null,

    modalmapVisible: false,
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
      console.log(date);
      var restdate=date.getFullYear()+ '/'+ (date.getMonth()+1) + '/' + date.getDate();
      console.log("gg" + restdate);
      fetch(global.HostURL + '/api/Restaurant', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          User_id : item.id,
          Rest_name : this.state.name,
          Rest_category: this.state.category,
          Rest_Password : this.state.user.password,
          Rest_email : this.state.email,
          Rest_phno : this.state.phone,
          Rest_state: this.state.state,
          Rest_lat : this.state.lat,
          Rest_long : this.state.long,
          Rest_created_date : restdate,
          Rest_coin:0,
          Rest_special_coin:0,
          Rest_coin_purchased:0,
          Rest_location: this.state.display_name
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
      this.setState({state:responseJson.address.state});
      this.setState({display_name:responseJson.display_name});
      this.setState({lat:responseJson.lat});
      this.setState({long:responseJson.lon});
    })
    .catch((error) => {
      console.log("address failed");
    });
  }

  setMapmapModalVisible(visible) {
    this.setState({modalmapVisible: visible});
  }

  constructor(props) {
    super(props);

    this.state = {
        user: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleRepeatPassword = this.handleRepeatPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

componentWillMount() {
    // custom rule will have name 'isPasswordMatch'
    Form.addValidationRule('isPasswordMatch', (value) => {
        if (value !== this.state.user.password) {
            return false;
        }
        return true;
    });
}
handleChange(event) {
  const name = event.nativeEvent.text;
  this.setState({ name });
}
handleChange(event) {
  const email = event.nativeEvent.text;
  this.setState({ email });
}

handlePassword(event) {
    const { user } = this.state;
    user.password = event.nativeEvent.text;
    this.setState({ user });
    // alert('${user.password}`);
}

handleRepeatPassword(event) {
    const { user } = this.state;
    user.repeatPassword = event.nativeEvent.text;
    this.setState({ user });
}

submit() {
  alert(`Registered!`);
}

handleSubmit() {
    this.refs.form.submit();
}


  render(){
    const { name } = this.state;
    const { category } = this.state;
    const { user } = this.state;
    const { email } = this.state;
    const { phone } = this.state;
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
          <Form ref="form" onSubmit={()=>this.signup()}>
            <Row>
              <Col style={{width:100}}>
                <Button onPress={this._pickImage} transparent style={{alignSelf:'center',width:100, height:100, borderWidth: 1, borderColor:'black'}}>
                  <Image style={{ height: 100, width:100, flex: 1 }} source={{uri : this.state.profilepic}} />
                </Button>
              </Col>
              <Col>
                <Item  >
                  <MaterialCommunityIcons size={30} name='account' />
                  <TextValidator
                    name="name"
                    label="name"
                    validators={['required']}
                    errorMessages={[ 'This field is required']}
                    errorStyle={{ container: { top: 0, left: 100,width:300, height:300, position: 'absolute' }, text: { color: 'red' }} }
                    placeholder="Enter the restaurant name"
                    type="text"
                    keyboardType="email-address"
                    value={name}
                    onChangeText={(value) => this.setState({name:value})}
                />
                  {/* <Input onChangeText={(value) => this.setState({name:value})} placeholder="Enter Name"/> */}
                </Item>
                <Item >
                  <MaterialCommunityIcons size={30} name='food' />
                  <TextValidator
                    name="category"
                    label="category"
                    validators={['required']}
                    errorMessages={[ 'This field is required']}
                    errorStyle={{ container: { top: 0, left: 100,width:300, height:300, position: 'absolute' }, text: { color: 'red' }} }
                    placeholder="Enter the restaurant catagory"
                    type="text"
                    keyboardType="email-address"
                    value={category}
                    onChangeText={(value) => this.setState({category:value})}
                />
                  {/* <Input onChangeText={(value) => this.setState({category:value})} placeholder="Enter Food Category"/> */}
                </Item>
              </Col>
            </Row>
            <Row>
              <Col>
                <Item>
                  <MaterialCommunityIcons size={25}name='key-variant' />
                  <TextValidator
                    name="password"
                    label="text"
                    validators={['required']}
                    errorMessages={['This field is required']}
                    errorStyle={{ container: { top: 0, left: 200,width:300, height:300, position: 'absolute' }, text: { color: 'red' }} }
                    type="text"
                    placeholder="Enter your password"
                    value={user.password}
                    onChange={this.handlePassword}
                    // onChangeText={(value) => this.setState({user:value})}
                    style={{width:200}}
                />
                  {/* <Input onChangeText={(value) => this.setState({password1:value})} placeholder="Enter password"/> */}
                </Item>
                <Item>
                  <MaterialCommunityIcons size={25} name='key-variant' />
                  <TextValidator
                    name="repeatPassword"
                    label="text"
                    validators={['isPasswordMatch','required']}
                    errorMessages={['Password mismatch','This field is required']}
                    errorStyle={{ container: { top: 0, left: 200,width:300, height:300, position: 'absolute' }, text: { color: 'red' }} }
                    type="text"
                    placeholder="Confirm your password"
                    value={user.repeatPassword}
                    onChange={this.handleRepeatPassword}
                    style={{width:200}}
                />
                  {/* <Input onChangeText={(value) => this.setState({password2:value})} placeholder="Confirm passowrd"/> */}
                </Item>
                <Item >
                  <MaterialCommunityIcons size={30} name='email-outline' />
                  <TextValidator
                    name="email"
                    label="email"
                    validators={['required', 'isEmail']}
                    errorMessages={["This field is required", "Email invalid"]}
                    errorStyle={{ container: { top: 0, left: 200,width:300, height:300, position: 'absolute' }, text: { color: 'red' }} }
                    placeholder="Enter restaurant's email"
                    type="text"
                    keyboardType="email-address"
                    value={email}
                    onChange={this.handleChange}
                    style={{width:200}}
                />
                  {/* <Input onChangeText={(value) => this.setState({email:value})} placeholder="Enter email address"/> */}
                </Item>
                <Item >
                  <MaterialCommunityIcons size={30} name='phone-in-talk' />
                  <TextValidator
                    name="phone"
                    label="phone"
                    validators={['required','minNumber:25555555', 'maxNumber:255555555','isNumber']}
                    errorMessages={[ 'This field is required','min num exceeded', 'max num exceeded','Input value must be number only']}
                    errorStyle={{ container: { top: 0, left: 200,width:300, height:300, position: 'absolute' }, text: { color: 'red' }} }
                    placeholder="Enter the ph number"
                    type="text"
                    keyboardType="numeric"
                    value={phone}
                    onChangeText={(value) => this.setState({phone:value})}
                    style={{width:200}}
                />
                  {/* <Input onChangeText={(value) => this.setState({phone:value})} placeholder="Enter phone number" /> */}
                </Item>
                <Item>
                  <TouchableOpacity style={{width:'100%'}} onPress={() => this.setMapmapModalVisible(!this.state.modalmapVisible)}>
                    <Textarea pointerEvents="none" rowSpan={3} value={this.state.display_name} disabled style={{width:'100%', borderWidth:1, borderColor:'grey', marginTop:10, marginBottom:10}} onChangeText={(value) => this.setState({location:value})}  placeholder="Address"  />
                  </TouchableOpacity>
                </Item>
                <Item>
                <View style={{width:'100%'}}>
                    <Button iconLeft block success onPress={this.handleSubmit}>
                        <Text>Next</Text>
                        <Icon name="ios-arrow-forward" size={30} color="#4cd58a" />
                    </Button>
                </View>
                </Item>
                <Modal
                animationType="slide"
                transparent={true}
                onRequestClose={()=>{this.setMapmapModalVisible(!this.state.modalmapVisible);}}
                visible={this.state.modalmapVisible}>
                  <View style={styles.Mapmodalcontainer}>
                      <View style={styles.responsiveMapBox}>
                          <Header style = {{height: hp('5%'),backgroundColor: '#4cd58a', paddingBottom: 0, paddingTop: 0, marginBottom: 8, borderBottomWidth:0}}>
                              <Right>
                                <Button transparent onPress={()=>{this.setMapmapModalVisible(!this.state.modalmapVisible);}}>
                                  <MaterialCommunityIcons name="window-close" size={20} color="#959595" />
                                </Button>
                              </Right>
                          </Header>
                          {/* <MapView
          style={{ flex: 1 }}
          region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
          zoomEnabled={true}
        >
    <MapView.Marker
      draggable
      coordinate={this.state.location.coords}
      title="My Marker"
      description="Some description"
      onDragEnd={e => this.logAddress(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)}
    />
        </MapView> */}
                      </View>
                  </View>
                </Modal>
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
    height: hp('70%'),
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
