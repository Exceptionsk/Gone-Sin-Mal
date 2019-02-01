import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet, View, TextInput,TouchableWithoutFeedback,Modal,Platform
  } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container,Card,CardItem,Body, Header, H1,H2,H3, H4,Left, Item, Input, Icon, Thumbnail, Content, Button, Footer, FooterTab, Badge, Text,Right } from 'native-base';
import {Actions} from 'react-native-router-flux';
import QRCode from 'react-native-qrcode';
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import NavigationService from '../../NavigationService'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Constants, MapView, Location, Permissions, Marker } from 'expo';
import { AsyncStorage } from "react-native";

  export default class HelloWorld extends Component {
    async logout(){
      const retrievedItem =  await AsyncStorage.getItem('token');
      NavigationService.navigate('Login');
      fetch('https://graph.facebook.com/'+ global.Profile.id+'/permissions', {
        method: 'DELETE',

      }).then((response) => response.json())
        .then((responsejson)=>{

        }).catch((error)=>{
           console.log(error);
        });

    }

    updateState(state){
      fetch(global.HostURL+ '/api/user/state?user_id='+ global.Profile.id+'&state='+ state, {
        method: 'POST',

      }).then((response) => response.json())
        .then((responsejson)=>{

      }).catch((error)=>{
          console.log(error);
      });
    }

    state = {
      profilemapmodalVisible: false,
      mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
      locationResult: null,
      location: {coords: { latitude: 37.78825, longitude: -122.4324}},
      currentlocation: null,
      latitude: null,
      longitude: null,

      UserInfo:[],
    };
    componentDidMount() {
      fetch(global.HostURL + '/api/User/' + global.Profile.id)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({UserInfo:responseJson});
        console.log(responseJson);
      })
      .catch((error) => {
        console.log("user failed");
      });
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

  //  _getcurrentlocation () {
  //   e => console.log(e.nativeEvent);
  //   let currentlocation = e;
  //   this.setState({
  //       latitude: currentlocation.coordinate.latitude,
  //       longitude: currentlocation.coordinate.longitude,
  //    });
  // };

  logAddress(lat, long){
    fetch('https://us1.locationiq.com/v1/reverse.php?key=84302eaf26a66d&lat='+ lat +'&lon='+ long +'&format=json')
    .then((response) => response.json())
    .then((responseJson) => {
      let newinfo = this.state.UserInfo;
      newinfo.State=responseJson.address.state;
      this.setState({UserInfo:newinfo});
      console.log(this.state.UserInfo);
      this.updateState(responseJson.address.state);
    })
    .catch((error) => {
      console.log("address failed");
    });
  }

    setprofilemapModalVisible(visible) {
      this.setState({profilemapmodalVisible: visible});
    };


    render() {
      return (
        <Container>
          <Content>
          <Grid>
          <View style={{width:'99%',height:'98%'}}>
            <CardItem header>
            <Row>
                <Col style={{height:230}}>
                        <View style={styles.container}>
                          <QRCode
                            value={global.Profile.id+";false;0;0"}
                            size={200}
                            bgColor='purple'
                            fgColor='white'/>
                        </View>
                </Col>
            </Row>
            </CardItem>
            <CardItem>
                <Row>
                  <Col style={{alignItems:'center', backgroundColor:'white'}}>
                    <View style={{flex: 1, flexDirection: 'row',justifyContent: 'space-between', width: wp('67.5%'),paddingBottom:10}}>
                      <Text style={{ paddingBottom:5}}>User's State:{this.state.UserInfo.State}</Text>
                      <Right>
                        <Icon name="md-create" style={{ color: '#ED4A6A' }} onPress={() => {this.setprofilemapModalVisible(true);}}/>
                      </Right>

                      {/* <Icon name='ios-create' onPress={() => {this.setprofilemapModalVisible(true);}}/>          */}
                    </View>
                    <View style={{flex: 1, flexDirection: 'row',justifyContent: 'space-between', width: wp('67.5%'),paddingBottom:10}}>
                      <Text style={{paddingBottom:5}}>Avaliable Coin:</Text>
                      <Text style={{paddingBottom:5}}>{this.state.UserInfo.Coin}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row',justifyContent: 'space-between', width: wp('67.5%'),paddingBottom:10}}>
                      <Text style={{paddingBottom:5}}>Coin Capacity:</Text>
                      <Text style={{paddingBottom:5}}>{this.state.UserInfo.Capacity}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row',justifyContent: 'space-between', width: wp('67.5%'),paddingBottom:10}}>
                      <Text style={{paddingBottom:5}}>Gone Sin Restaurant:</Text>
                      <Text style={{paddingBottom:5}}>{this.state.UserInfo.Visited}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row',justifyContent: 'space-between', width: wp('67.5%'),paddingBottom:10}}>
                      <Text style={{paddingBottom:5}}>Exceeded Coin:</Text>
                      <Text style={{paddingBottom:5}}>{this.state.UserInfo.Exceed}(expire in: {this.state.UserInfo.ExpireIn}) days</Text>
                    </View>
                    {/* <Text style={{paddingBottom:5}}>Avaliable Coin: {this.state.UserInfo.Coin}</Text> */}
                    {/* <Text style={{paddingBottom:5}}>Coin Capacity: {this.state.UserInfo.Capacity}</Text> */}
                    {/* <Text style={{paddingBottom:5}}>Gone Sin Restaurant: {this.state.UserInfo.Visited}</Text> */}
                    {/* <Text style={{paddingBottom:5}}>Exceeded Coin: {this.state.UserInfo.Exceed} (expire in: {this.state.UserInfo.ExpireIn}) days</Text> */}
                  </Col>
                </Row>
            </CardItem>
            <CardItem footer>
            </CardItem>
          </View>
          </Grid>
          <Modal
                          animationType="slide"
                          transparent={false}
                          onRequestClose={()=>{this.setprofilemapModalVisible(!this.state.profilemapmodalVisible);}}
                          visible={this.state.profilemapmodalVisible}>
                          <View style={{alignSelf:'flex-end'}}>
                            <Button transparent onPress={()=>{this.setprofilemapModalVisible(!this.state.profilemapmodalVisible);}}>
                                <Icon name="close"/>
                            </Button>
                          </View>
                          <MapView
                            style={{ flex: 1 }}
                            region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, longitudeDelta: 0.0421 }}
                            zoomEnabled={true}
                          >
                          <MapView.Marker
                            draggable
                            coordinate={this.state.location.coords}
                            title="Location"
                            description="Location"
                            onDragEnd={e => this.logAddress(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)}
                          />
                          </MapView>
            </Modal>
        </Content>
        </Container>
      );
    };
  }

  const styles = StyleSheet.create({
      container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
      },

      input: {
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          margin: 10,
          borderRadius: 5,
          padding: 5,
      }
  });
