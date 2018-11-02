import React from 'react';
import { StyleSheet, Text, View,Alert,TouchableOpacity,Switch} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { Container, Badge, H2, H3, Header, Content, Row,Grid, Col, Card, CardItem, Thumbnail, Button, Icon, Body, Left, Right,Item,Form,Label,Input } from 'native-base';

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
      <Container>
        <Header style = {{height: 110,backgroundColor: '#a3080c' , color: 'orange', paddingBottom: 0, paddingTop: 0}}>
            <Right>
              <View style={{justifyContent: 'center'}}>
                <Switch 
                  onValueChange={isSwitchOn => this.setState({isSwitchOn})}
                  value={this.state.isSwitchOn} 
                />
                <Badge style={{ backgroundColor: 'black' }}>
                  <Text style={{ color: 'white' }}>{String(this.state.isSwitchOn)}</Text>
                </Badge>
              </View>
            </Right>
        </Header>
        <Content contentContainerStyle={{ flex: 1 }}>
          <Grid>
            <Row style={{paddingTop:30}}>
              <Col>
              </Col>
              <Col style={{width:250}}>
                  <View style={{ flex: 1}}>
                    <BarCodeScanner
                      onBarCodeScanned={this.handleBarCodeScanned}
                      style={StyleSheet.absoluteFill}
                    />
                  </View>
              </Col>
              <Col>
              </Col>
            </Row>
            <Row>
              <Col>
              </Col>
              <Col style={{width:250}}>
                <Form>
                  {/* <Item stackedLabel>
                    <Label>Code Type</Label>
                    <Input>
                    {this.state.type}
                    </Input>
                  </Item> */}
                  <Item stackedLabel last>
                    <Label>Amount</Label>
                    <Input>
                    {this.state.data}
                    </Input>
                  </Item>
                </Form>
                <Button full warning>
                  <Text>Scan Now!</Text>
                </Button>
              </Col>
              <Col>
              </Col>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({type});
    this.setState({data});
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  }
}