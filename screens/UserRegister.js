import React, { Component } from 'react';
import { View, StyleSheet, Platform, Modal, TouchableOpacity } from 'react-native';
import { Container,Textarea, Left, Right, Form, Label, Input, Header, H1,H2,H3, H4,Title, Item, Icon, Thumbnail, Content, Button, Footer, FooterTab, Badge, Card, CardItem, Body, Text } from 'native-base';
import { Constants, MapView, Location, Permissions, Marker } from 'expo';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { MaterialCommunityIcons,Ionicons,MaterialIcons } from '@expo/vector-icons';

export default class App extends Component {
  static navigationOptions = {
    header:null
  }
  state = {
    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
    locationResult: null,
    location: {coords: { latitude: 37.78825, longitude: -122.4324}},
    currentlocation: null,
    latitude: null,
    longitude: null,
    modalVisible: true,
    apilocation:'',
  };

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
    this.setState({apilocation:responseJson});
    console.log(responseJson);
  })
  .catch((error) => {
    console.log("address failed");
  });
}

UpdateUserInfo(){
  fetch(global.HostURL + '/api/User', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
      User_id : global.Profile.id,
      User_type:'customer',
    }),
  }).then((response) => response.json())
    .then((responsejson)=>{
      console.log(responsejson);
      this.props.navigation.navigate('CustHome')
    }).catch((error)=>{
       console.log(error);
    });
}

  render() {
    return (
    <Container>
        <Header style = {{height: 70,backgroundColor: '#a3080c', paddingBottom: 0, paddingTop: 0}}>
            <View style={{flex:1, alignItems: 'flex-start', justifyContent: 'center'}}>
                <View>
                    <Text style = {{color: 'white', width:'100%', fontWeight:'bold'}} >User Township Registeration</Text>
                </View>
            </View>
        </Header>
        <View style={styles.modalcontainer}>
        <View style={styles.Mapmodalcontainer}>
            <View style={styles.responsiveMapBox}>
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
            <View style={styles.responsiveBox}>
                    <Text style = {{width:'100%', fontWeight:'bold'}} >{this.state.apilocation.display_name}</Text>
                <View>
                    <Button iconLeft block success onPress={()=>this.UpdateUserInfo()}>
                        <Text>Next</Text>
                        <MaterialCommunityIcons name="check" size={30} color="#4cd58a" />
                    </Button>
                </View>
            </View>
         </View>

    </Container>
    );
  }
}

const styles = StyleSheet.create({

    modalcontainer:{
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      responsiveBox: {
        width: wp('95.5%'),
        height: hp('30%'),
        backgroundColor: 'white',
        // borderWidth: 1,
        // borderTopLeftRadius: 5,
        // borderTopRightRadius: 5,
        // borderBottomLeftRadius: 5,
        // borderBottomRightRadius: 5,
        // borderColor: 'grey',
        // shadowColor: '#000000',
        // shadowOffset: {
        //   width: 0,
        //   height: 3
        // },
        // shadowRadius: 3,
        // shadowOpacity: 0.5,
        // flexDirection: 'column',
        justifyContent: 'space-around'
      },
      Mapmodalcontainer:{
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      },
      responsiveMapBox: {
        width: wp('95.5%'),
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
});
