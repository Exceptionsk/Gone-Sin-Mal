import React, { Component } from 'react';
import { View, StyleSheet, Platform, Modal, TouchableOpacity } from 'react-native';
import { Container,Textarea, Left, Right, Form, Label, Input, Header, H1,H2,H3, H4,Title, Item, Icon, Thumbnail, Content, Button, Footer, FooterTab, Badge, Card, CardItem, Body, Text } from 'native-base';
import { Constants, MapView, Location, Permissions, Marker } from 'expo';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { MaterialCommunityIcons,Ionicons,MaterialIcons } from '@expo/vector-icons';

export default class App extends Component {
  state = {
    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
    locationResult: null,
    location: {coords: { latitude: 37.78825, longitude: -122.4324}},
    currentlocation: null,
    latitude: null,
    longitude: null,
    modalVisible: true,
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
    console.log(responseJson);
  })
  .catch((error) => {
    console.log("address failed");
  });
}

setMapModalVisible(visible) {
    this.setState({modalVisible: visible});
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
            <View style={styles.responsiveBox}>
                <Item style={{alignSelf:'center'}}>
                    <Input disabled placeholder='Press the icon to choose your township'/>
                    <Button onPress={()=>{this.setMapModalVisible(!this.state.modalVisible);}} transparent style={{height:70}}>
                        <MaterialIcons name="add-location" size={40} color="#4cd58a"/>
                    </Button>
                </Item>
                <View style={{alignSelf:'center'}}>
                    <Button iconLeft bordered success>
                        <Text>Choose</Text>
                        <MaterialCommunityIcons name="check" size={30} color="#4cd58a" onPress={()=>{this.setphnumberModalVisible(!this.state.phmodalVisible);}}/>
                    </Button>
                </View>
            </View>
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
        width: wp('84.5%'),
        height: hp('23%'),
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
