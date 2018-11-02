import React from 'react';
import { StyleSheet, Text, View,Alert} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import Switch from 'react-native-switch-pro'
// import { Switch } from 'react-native-switch';
import { Container, Badge, H2, H3, Header, Content, Row,Grid, Col, Card, CardItem, Thumbnail, Button, Icon, Body, Right } from 'native-base';

export default class BarcodeScannerExample extends React.Component {
  state = {
     hasCameraPermission: null,
  }
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
    }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <Grid>
      <Header style = {{height: 110,backgroundColor: '#a3080c' , color: 'orange', paddingBottom: 0, paddingTop: 0}}>
        <Right>
        <View>
        <Switch
        activeText={'On'}
        inActiveText={'Off'}
          onAsyncPress={(callback) => {
            callback( true,value => this.setState(Alert.alert("Hello")))
        }}
        />
       </View>
        </Right>
      </Header>
      <Row>
        <Col>

        </Col>
      </Row>
      <Row>
        <Col>
            <View style={{ flex: 1 }}>
              <BarCodeScanner
                onBarCodeScanned={this.handleBarCodeScanned}
                style={StyleSheet.absoluteFill}
              />
            </View>
        </Col>
      </Row>
      </Grid>

    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  }
}