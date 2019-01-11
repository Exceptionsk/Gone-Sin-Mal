import React, { Component } from 'react';
import { View, Image, StyleSheet, ImageBackground, ScrollView, Modal, AsyncStorage,TextInput } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, List,Badge, H3, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { BlurView } from 'expo';
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';

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
    Cout:'',
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
        console.log(responsejson);
        this.setState({transactionmodalVisibleSpecialCoin:false})
          this.setState({ Code: '' });
      }).catch((error)=>{
        console.log('Transaction failed');
        console.log(error);
        this.setState({ Code: '' });
      });
  }
  componentDidMount() {
    let that = this;
    setInterval(() => {
        that.setState({Notification: global.RestNotification});
    }, 1000);
  }


  TransactionBar(type){
    if(type=='transaction id'){
      return <TextInput style = {styles.input}
      underlineColorAndroid = "transparent"
      placeholder = " Enter transation ID"
      placeholderTextColor = "#3f3f3f"
      autoCapitalize = "none"
      onChangeText = {this.handleCode}/>
    }
    else{

    }

  }
  TransactionModelTest(id,type,text){
      if(text!="Comfirmation completed!"){
        if(type=="special"){
            return <Button danger style={{height:40}} onPress={() => {this.setState({transactionmodalVisibleSpecialCoin: true});this.setState({ID: id});}}><Text>{type}</Text></Button>
        }else{
            return <Button danger style={{height:40}} onPress={() => {this.setState({transactionmodalVisible: true});this.setState({ID: id});}}><Text>normal Coin</Text></Button>
        }
    }
  }

  render() {
    let { image } = this.state;
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
            <TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = " Enter transation ID"
            placeholderTextColor = "#3f3f3f"
            autoCapitalize = "none"
            onChange = {this.handleCode.bind(this)}/>
             <Right style={{paddingTop:20}}>
             <Button danger style={{height:40}} onPress={this.sendTransactionID.bind(this)} ><Text>{this.state.Code}</Text></Button>
             </Right>
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
            <TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = " Enter number of users"
            placeholderTextColor = "#3f3f3f"
            autoCapitalize = "none"
            onChange = {this.handleCount.bind(this)}
            />
            <Text style={{paddingTop:20,paddingBottom:20}}>{this.state.Count}</Text>
            <TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = " Enter transation ID"
            placeholderTextColor = "#3f3f3f"
            autoCapitalize = "none"
            onChange = {this.handleCode.bind(this)}/>
             <Right style={{paddingTop:20}}>
             <Button danger style={{height:40}} onPress={this.sendTransactionID.bind(this)} ><Text>{this.state.Code}</Text></Button>
             </Right>
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
                                  <Thumbnail source={{uri : item.img}} />
                                  <Body>
                                  <Text style={{fontWeight:'bold',fontSize:20,color:'#484848' }}>{item.Noti_text}</Text>
                                  <Text style={{textAlign:'justify',color:'#5d5d5d'}}>{item.Notification}</Text>
                                  </Body>
                              </Left>
                            </CardItem>
                        </Col>
                      </Row>
                      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{padding:20}}>
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
  })
