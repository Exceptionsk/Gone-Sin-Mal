import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';

export default class App extends Component {
  state = {
    location: null,
    latitude: null,
    longitude: null,
    errorMessage: null,
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ 
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
     });
    console.log(location);
    console.log(this.state.latitude);
    console.log(this.state.longitude);
  };

  render() {
    let latdata = 'Waiting..';
    let longdata = 'Waiting..';
    if (this.state.errorMessage) {
        latdata = this.state.errorMessage;
        longdata = this.state.errorMessage;
    } else if (this.state.latitude && this.state.longitude) {
        latdata = JSON.stringify(this.state.latitude);
         longdata = JSON.stringify(this.state.longitude);
    }

    return (
        <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude:  latdata,
          longitude: longdata,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      // <View>
      //   <Text>{latdata}</Text>
      // </View>
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
    textAlign: 'center',
  },
});