// import React, { Component } from 'react';
// import { Platform, Text, View, StyleSheet } from 'react-native';
// import { Constants, Location, Permissions, MapView } from 'expo';

// export default class App extends Component {
//   state = {
//     location: null,
//     latitude: null,
//     longitude: null,
//     errorMessage: null,
//   };

//   componentWillMount() {
//     if (Platform.OS === 'android' && !Constants.isDevice) {
//       this.setState({
//         errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
//       });
//     } else {
//       this._getLocationAsync();
//     }
//   }

//   _getLocationAsync = async () => {
//     let { status } = await Permissions.askAsync(Permissions.LOCATION);
//     if (status !== 'granted') {
//       this.setState({
//         errorMessage: 'Permission to access location was denied',
//       });
//     }

//     let location = await Location.getCurrentPositionAsync({});
//     this.setState({
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//      });
//     console.log(location);
//     console.log(this.state.latitude);
//     console.log(this.state.longitude);
//   };

//   render() {
//     var latdata = 0;
//     var longdata = 0;
//     if (this.state.errorMessage) {
//         latdata = this.state.errorMessage;
//         longdata = this.state.errorMessage;
//     } else if (this.state.latitude && this.state.longitude) {
//         latdata = parseFloat(this.state.latitude);
//          longdata = parseFloat(this.state.longitude);
//     }

//     return (
//         <MapView
//         style={{ flex: 1 }}
//         initialRegion={{
//           latitude:  latdata,
//           longitude: longdata,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}

//       />

//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop: Constants.statusBarHeight,
//     backgroundColor: '#ecf0f1',
//   },
//   paragraph: {
//     margin: 24,
//     fontSize: 18,
//     textAlign: 'center',
//   },
// });


import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { Constants, MapView, Location, Permissions, Marker } from 'expo';

export default class App extends Component {
  state = {
    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
    locationResult: null,
    location: {coords: { latitude: 37.78825, longitude: -122.4324}},
    currentlocation: null,
    latitude: null,
    longitude: null,
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

  render() {
    return (

        <MapView
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
        </MapView>



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
});
