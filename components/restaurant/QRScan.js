import React from 'react';
import { StyleSheet, Text, View,Alert,TouchableOpacity,Switch} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { Container, Badge, H2, H3, Header, Content, Row,Grid, Col, Card, CardItem, Thumbnail, Button, Icon, Body, Right } from 'native-base';

export default class BarcodeScannerExample extends React.Component {
  state = {
    hasCameraPermission: null,
    isSwitchOn: false
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
          onValueChange={isSwitchOn => this.setState({isSwitchOn})}
          value={this.state.isSwitchOn} 
        />
        <Text>{String(this.state.isSwitchOn)}</Text>
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