import React, { Component } from 'react';
import { View, Image, StyleSheet, ImageBackground, ScrollView, Modal, AsyncStorage,TextInput,Alert } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, List,Badge, H3, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { BlurView } from 'expo';
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import { Form, TextValidator } from 'react-native-validator-form';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class Notification extends Component {


  handleCode(e){
    this.setState({
      Code: e.nativeEvent.text
    })
  }

  handleCount(e){
    this.setState({
      Count: e.nativeEvent.text
    })
  }

  async retrieveItem(key) {
    try {
      const retrievedItem =  await AsyncStorage.getItem(key);
      const item = JSON.parse(retrievedItem);
      this.setState({
         Profile: item,
       });
      return item;

    } catch (error) {
      console.log(error.message);
    }
    return
  };
  state = {
    transactionmodalVisible: false,
    transactionmodalVisibleSpecialCoin: false,
    Notification:[],
    Code:'',
    ID:'',
    Count:'',
    key:'',
  };
  componentWillMount(){
    this.retrieveItem('profile')
  }
  sendTransactionID(){
      fetch(global.HostURL + '/api/transaction/comfirm', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          Rest_id : global.Profile.id,
          Tran_id : this.state.Code,
          ID: this.state.ID,
          Count: this.state.Count
        }),
      }).then((response) => response.json())
        .then((responsejson)=>{
          console.log("gg");
          console.log(responsejson);
          if(responsejson=="Failed"){
            Alert.alert(
              'Wrong Transaction ID',
              'Please make sure you entered correct ID',
              [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]
            )
          }else{
            this.setState({transactionmodalVisibleSpecialCoin:false});
            this.setState({ Code: '' });
            this.setState({ Count: '' });
          }
        }).catch((error)=>{
          console.log(error);
          this.setState({transactionmodalVisibleSpecialCoin:false})
          this.setState({transactionmodalVisible:false})
          this.setState({ Code: '' });
          this.setState({ Count: '' });
        });
  }
  componentDidMount() {
    let that = this;
    setInterval(() => {
        that.setState({Notification: global.RestNotification});
    }, 1000);
  }

  cancelModal(){
    global.authorized=false;
    global.adminModel=false;
  }

  checkKey(){
    fetch(global.HostURL + '/api/Admin/authenticate?key='+ this.state.key)
     .then((response) => response.json())
     .then((responseJson) => {
       console.log(responseJson);
       this.setState({key:''});
       if(responseJson=="Yes"){
         global.adminModel=false;
         global.authorized=true;
       }else{
         Alert.alert(
           'Wrong Key',
           'The Key you entered is Incorrect',
           [
             {text: 'OK', onPress: () => console.log('OK Pressed')},
           ]
         )
       }
     })
     .catch((error) => {
       console.log(error);
     });
  }

  TransactionBar(type){
    if(type=='transaction id'){
      return <TextValidator style = {{borderWidth:1, bordercolor:'black'}}
      name="Cout"
      label="Cout"
      validators={['required','isNumber']}
      errorMessages={[ 'This field is required','Input value must be number only']}
      errorStyle={{ container: { top: 0, left: 0,width:300, height:300, position: 'absolute' }, text: { color: 'red' }} }
      type="text"
      keyboardType="numeric"
      value={Cout}
      underlineColorAndroid = "transparent"
      placeholder = " Enter transation ID"
      placeholderTextColor = "#3f3f3f"
      autoCapitalize = "none"
      onChangeText = {this.handleCode}/>
    }

  }

  specialclick(id){
    console.log(global.authorized);
    if(global.authorized){
      this.setState({transactionmodalVisibleSpecialCoin: true});
      this.setState({ID: id});
    }else{
      Alert.alert(
        'Access Denied',
        'Enter correct key to do transation!',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]
      )
    }
  }
  normalclick(id){
    console.log(global.authorized);
    if(global.authorized){
      this.setState({transactionmodalVisible: true});
      this.setState({ID: id});
    }else{
      Alert.alert(
        'Access Denied',
        'Enter correct key to do transation!',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]
      )
    }
  }
  TransactionModelTest(id,type,text){
      if(text!="Comfirmation completed!"){
        if(type=="special"){
          return <Button full danger style={{height:40, borderWidth:1, bordercolor:'white',borderRadius:4}} onPress={() => {this.specialclick(id)}}><Text>{type}</Text></Button>
      }else{
          return <Button full danger style={{height:40,borderWidth:1, bordercolor:'white',borderRadius:4}} onPress={() => {this.normalclick(id)}}><Text>normal Coin</Text></Button>
      }
     }
  }

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
      const Cout = event.nativeEvent.text;
      this.setState({ Cout });
  }

  submit() {
      // your submit logic
  }

  handleSubmit() {
      this.refs.form.submit();
  }

  render() {
    let { image } = this.state;

    const { Code } = this.state;
    const { Count } = this.state;
    return(
    <Container>
      <Header style = {{ height: 60,backgroundColor: '#a3080c', paddingBottom: 0, paddingTop: 0}}>
      <Body>
        <H3 style={{ color: 'white', fontWeight: "bold", paddingTop: 0, paddingLeft: 8 }}>Notification</H3>
      </Body>
      </Header>
      <Modal
        animationType="slide"
        transparent={true}
        onRequestClose={()=>{this.setState({transactionmodalVisible: false});}}
        visible={this.state.transactionmodalVisible}>
        <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000000',
                shadowOffset: {
                  width: 0,
                  height: 3
                },
                shadowRadius: 5,
                shadowOpacity: 1.0
                }}>
          <View style={{
                  width: '80%',
                  height: 40, borderColor: 'white', borderWidth: 1, borderTopLeftRadius: 5, borderTopRightRadius: 5}}>
          <Header style = {{height: 40,backgroundColor: 'white' , color: 'orange', paddingBottom: 0, paddingTop: 0}}>
          <Right>
            <Button transparent onPress={()=>{this.setState({transactionmodalVisible: false});}}>
              <MaterialCommunityIcons name="window-close" size={20} color="#959595" />
            </Button>
            </Right>
          </Header>
          </View>
          <View style={{width: '80%', height: 150, backgroundColor: 'white', borderColor: 'white' ,borderWidth: 1, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderTopWidth:0, padding: 10 }}>
          <Form
                ref="form"
                onSubmit={this.sendTransactionID.bind(this)}
            >
            <TextValidator style = {styles.input}

            name="Code"
            label="Code"
            validators={['required','isNumber']}
            errorMessages={[ 'This field is required','Input value must be number only']}
            errorStyle={{ container: { top: 0, left: 80,width:300, height:300, position: 'absolute' }, text: { color: 'red' }} }
            type="text"
            keyboardType="number-pad"
            value={Code}

            underlineColorAndroid = "transparent"
            placeholder = " Enter transation ID"
            placeholderTextColor = "#3f3f3f"
            autoCapitalize = "none"
            onChange = {this.handleCode.bind(this)}/>
            <View  style={{flex:1,flexDirection: 'column',justifyContent: 'center', alignItems: 'stretch',paddingTop:40}}>
            <Button full danger style={{height:40, borderWidth:1, bordercolor:'transparent',borderRadius:4}} onPress={this.handleSubmit} ><Text>Send</Text></Button>
            </View>
             {/* <Right style={{paddingTop:20}}>
             <Button danger style={{height:40}} onPress={this.handleSubmit} ><Text>Send</Text></Button>
             </Right> */}
          </Form>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        onRequestClose={()=>{  this.setState({transactionmodalVisibleSpecialCoin: false});}}
        visible={this.state.transactionmodalVisibleSpecialCoin}>

        <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000000',
                shadowOffset: {
                  width: 0,
                  height: 0
                },
                shadowRadius: 3,
                shadowOpacity: 1.0
                }}>
          <View style={{
                  width: '80%',
                  height: 40, borderColor: 'white', borderWidth: 1, borderTopLeftRadius: 5, borderTopRightRadius: 5}}>
          <Header style = {{height: 40,backgroundColor: 'white' , color: 'orange', paddingBottom: 0, paddingTop: 0}}>
          <Right>
            <Button transparent onPress={()=>{ this.setState({transactionmodalVisibleSpecialCoin: false});}}>
              <MaterialCommunityIcons name="window-close" size={20} color="#959595" />
            </Button>
            </Right>
          </Header>
          </View>
          <View style={{width: '80%', height: 250, backgroundColor: 'white', borderColor: 'white' ,borderWidth: 1, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderTopWidth:0, padding: 10 }}>
          <Form
                ref="form"
                onSubmit={this.sendTransactionID.bind(this)}
            >
            <TextValidator style = {styles.input}
            name="Count"
            label="Count"
            validators={['required','isNumber']}
            errorMessages={[ 'This field is required','Input value must be number only']}
            errorStyle={{ container: { top: 0, left: 80,width:300, height:300, position: 'absolute' }, text: { color: 'red' }} }
            type="text"
            keyboardType="number-pad"
            value={Count}

            underlineColorAndroid = "transparent"
            placeholder = " Enter number of users"
            placeholderTextColor = "#3f3f3f"
            autoCapitalize = "none"
            onChange = {this.handleCount.bind(this)}
            />
            <TextValidator style = {styles.input}
            name="Code"
            label="Code"
            validators={['required','isNumber']}
            errorMessages={[ 'This field is required','Input value must be number only']}
            errorStyle={{ container: { top: 0, left: 80,width:300, height:300, position: 'absolute' }, text: { color: 'red' }} }
            type="text"
            keyboardType="number-pad"
            value={Code}

            underlineColorAndroid = "transparent"
            placeholder = " Enter transation ID"
            placeholderTextColor = "#3f3f3f"
            autoCapitalize = "none"
            onChange = {this.handleCode.bind(this)}/>
            <View  style={{flex:1,flexDirection: 'column',justifyContent: 'center', alignItems: 'stretch',paddingTop:40}}>
            <Button full danger style={{height:40, borderWidth:1, bordercolor:'transparent',borderRadius:4}} onPress={this.handleSubmit} ><Text>Send</Text></Button>
            </View>
             {/* <Right style={{paddingTop:20}}>
             <Button danger style={{height:40}} onPress={this.handleSubmit} ><Text>Send</Text></Button>
             </Right> */}
          </Form>
          </View>
        </View>
      </Modal>
      <Modal
       animationType="slide"
       transparent={true}
       visible={global.adminModel}>
       <View style={styles.modalcontainer}>
         <View style={styles.responsiveBox}>
             <TextInput style = {styles.input}
             underlineColorAndroid = "transparent"
             placeholder = " Enter Key"
             placeholderTextColor = "#3f3f3f"
             autoCapitalize = "none"
             onChangeText={(text) => this.setState({key:text})}
             />
             <View style={{alignSelf:'center', paddingBottom: 5}}>
               <MaterialCommunityIcons name="close-outline" size={40} color="#4cd58a" onPress={()=>{this.cancelModal()}}/>
             </View>
             <View style={{alignSelf:'center', paddingBottom: 5}}>
               <MaterialCommunityIcons name="check" size={40} color="#4cd58a" onPress={()=>{this.checkKey()}}/>
             </View>
         </View>
       </View>
     </Modal>
        <Grid>
            <Content style = {{backgroundColor:'#dfdfdf'}}>
            {
                this.state.Notification.map((item, key)=>
                  (
                    <View key={key}>
                      <Card style={{flex: 0, marginLeft: 0, width: '100%' }}>
                      <Row >
                        <Col style={{ backgroundColor: '#dfdfdf', height: '100%', width: '100%'}}>
                            <CardItem>
                              <Left>
                                  <Thumbnail source={{uri : 'https://cdn.myanimelist.net/images/anime/1232/93334l.jpg'}} />
                                  <Body>
                                  <Text style={{fontWeight:'bold',fontSize:20,color:'#484848' }}>{item.Noti_text}</Text>
                                  <Text style={{textAlign:'justify',color:'#5d5d5d'}}>{item.Notification}</Text>
                                  </Body>
                              </Left>
                            </CardItem>
                        </Col>
                      </Row>
                      <View style={{ flex: 1 }}>
                        <View  style={{flex:1,flexDirection: 'column',justifyContent: 'center', alignItems: 'stretch',paddingBottom:10}}>
                          {this.TransactionModelTest(item.ID,item.Tran_type, item.Noti_text)}
                        </View>
                      </View>
                      </Card>
                    </View>
                  )
                )
              }
            </Content>
        </Grid>
    </Container>
);
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
     modalcontainer:{
       flex: 1,
       backgroundColor: 'transparent',
       alignItems: 'center',
       justifyContent: 'center',
     },
     responsiveBox: {
       width: wp('84.5%'),
       height: hp('23%'),
       backgroundColor: 'white',
       borderWidth: 1,
       borderTopLeftRadius: 5,
       borderTopRightRadius: 5,
       borderBottomLeftRadius: 5,
       borderBottomRightRadius: 5,
       borderColor: 'grey',
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
     responsiveBoxphnumber: {
       width: wp('84.5%'),
       height: hp('22%'),
       paddingBottom: 8,
       backgroundColor: 'white',
       borderWidth: 1,
       borderTopLeftRadius: 5,
       borderTopRightRadius: 5,
       borderBottomLeftRadius: 5,
       borderBottomRightRadius: 5,
       borderColor: 'grey',
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
  })
