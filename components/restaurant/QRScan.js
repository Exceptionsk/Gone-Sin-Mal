import React from 'react';
import { StyleSheet, Text, View,Alert,TouchableOpacity,Switch,TextInput} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { Container, Footer, FooterTab, Badge, H2, H3, Header, Content, Row,Grid, Col, Card, CardItem, Thumbnail, Button, Icon, Body, Left, Right,Item,Label,Input } from 'native-base';
import { Form, TextValidator } from 'react-native-validator-form';

export default class BarcodeScannerExample extends React.Component {
  state = {
    hasCameraPermission: null,
    isSwitchOn: false,
    amount:'',
    CurrentState:'Give Coins to Customer',
    data:'',
  }
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
    }

BeginTransaction(){
  console.log(this.state.data);
  if(this.state.data!=""){
    var data=this.state.data.split(';')[0].trim();
    var special=this.state.data.split(';')[1].trim();
    var promo= this.state.data.split(';')[2].trim();
    var restaurant_id =this.state.data.split(';')[3].trim();
    console.log(special);
    if(special=="true"){
      if(restaurant_id!=global.Restaurant.Rest_id){
        Alert.alert(
          'Wrong Restaurant!',
          'Please choose correct restaurant.',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]
        )
      }else{
        console.log("this is special 11");
        fetch(global.HostURL + '/api/restaurant/qr', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            Rest_id : global.Restaurant.Rest_id,
            User_id: data,
            Amount: this.state.amount,
            Take: this.state.isSwitchOn,
            Special: special,
            PromoId:promo,
          }),
        })
        .then((response)=>response.json())
        .then((responsejson) => {
          console.log("this is special");
          console.log(responsejson);
            Alert.alert(
              'Success',
              'Gone Sin Coin Used!',
              [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]
            )
            if(responsejson.Text=="OK"){
              console.log("I am text");
            }
        }).catch((error) => {
          console.log(error);
          Alert.alert(
            'Success',
            'Gone Sin Coin Used!',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]
          )
        });
      }
    }else{
      fetch(global.HostURL + '/api/restaurant/qr', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          Rest_id : global.Restaurant.Rest_id,
          User_id: data,
          Amount: this.state.amount,
          Take: this.state.isSwitchOn,
          Special: special,
          PromoId:promo,
        }),
      })
      .then((response)=>response.json())
      .then((responsejson) => {
        console.log(responsejson);
        if(responsejson=="Not Enough"){
          Alert.alert(
            'Error',
            'Low Coin Amount in balance.',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]
          )
        }else{
          Alert.alert(
            'Success',
            'Coin transfer Complete!',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]
          )
        }
      }).catch((error) => {
        Alert.alert(
          'Success',
          'Coin transfer Complete!',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]
        )
      });
    }

  }else{
    Alert.alert(
      'Gone Sin Mal Qr code isnt scanned',
    )
  }

}
changeText(value){
  this.setState({isSwitchOn: value});
  if(value){
    this.setState({CurrentState:'Get Coin from Customer'});
  }else{
    this.setState({CurrentState:'Give Coins to Customer'})
  }
}
handleAmount(e){
  this.setState({amount:e.nativeEvent.text})
}

constructor(props) {
  super(props);

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}
handleChange(event) {
  const email = event.nativeEvent.text;
  this.setState({ email });
}

submit() {
  // your submit logic
}

handleSubmit() {
  this.refs.form.submit();
}


  render() {
    const { hasCameraPermission } = this.state;

    const { amount } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <Container>
        <Header style = {{alignItems:'center',height: 70,backgroundColor: '#a3080c' , paddingBottom: 0, paddingTop: 0}}>
            <Left>
              <Text style={{color:'white', width:'100%', fontWeight:'bold'}}>{this.state.CurrentState}</Text>
            </Left>
            <Right>
              <View style={{justifyContent: 'center'}}>
                <Switch
                  onValueChange={isSwitchOn => this.changeText(isSwitchOn)}
                  value={this.state.isSwitchOn}
                />
              </View>
            </Right>

        </Header>
        <Content contentContainerStyle={{ flex: 1 }}>
          <Grid>
            <Row>
              <Col>
                  <View style={{ flex: 1}}>
                    <BarCodeScanner
                      onBarCodeScanned={this.handleBarCodeScanned}
                      style={StyleSheet.absoluteFill}
                    />
                  </View>
              </Col>
            </Row>
          </Grid>
          </Content>
          <Footer style={{height:110}}>
            <FooterTab>
              <Grid style={{backgroundColor:'white'}}>
                <Row style={{padding:10}}>
                    <Col>
                    <Form
                        ref="form"
                        onSubmit={this.BeginTransaction.bind(this)}
                    >
                      <TextValidator style = {styles.input}
                      name="amount"
                      label="amount"
                      validators={['required']}
                      errorMessages={['This field is required']}
                      errorStyle={{ container: { top: 0, left: 150,width:300, height:300, position: 'absolute' }, text: { color: 'red' }} }
                      placeholder="Enter coin amount"
                      type="text"
                      keyboardType="number-pad"
                      value={amount}
                      onChangeText={(text) => this.setState({amount:text})}
                      />
                      {/* <TextInput style = {styles.input}
                      underlineColorAndroid = "transparent"
                      placeholder = " Enter coin amount"
                      placeholderTextColor = "#3f3f3f"
                      autoCapitalize = "none"
                      keyboardType="numeric"
                      onChangeText={(text) => this.setState({amount:text})}
                    /> */}
                    </Form>
                   </Col>
                </Row>
                <Row>
                  <Col style={{height:60}}>
                    <Button full warning onPress={this.handleSubmit}>
                      <Text style={{paddingBottom:10, color:'white', fontWeight:'bold'}}>Scan Now!</Text>
                    </Button>
                  </Col>
                </Row>
              </Grid>
            </FooterTab>
        </Footer>
      </Container>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({type});
    this.setState({data});
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  }
}
const styles= StyleSheet.create({
  input: {
      borderColor: '#ff7d21',
      borderRadius: 5,
      borderWidth: 1,
      width:'100%',
      height:40
   },
})
