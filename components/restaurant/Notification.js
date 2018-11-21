import React, { Component } from 'react';
import { View, Image, StyleSheet, ImageBackground, ScrollView, Modal, AsyncStorage,TextInput } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, List,Badge, H3, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { BlurView } from 'expo';
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';

export default class Notification extends Component {
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  };
  setModalVisibleTransaction(visible) {
    this.setState({transactionmodalVisible: visible});
  };
  handlePassword = (text) => {
    this.setState({ password: text })
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
    modalVisible: false,
    transactionmodalVisible: false,
    Profile:{},
  };
  componentWillMount(){
    this.retrieveItem('profile')
  }
  sendTransactionID(tran_id){
    fetch(global.HostURL + '/api/transaction/comfirm', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        Rest_id : global.Profile.id,
        Tran_id : tran_id,
      }),
    }).then((response) => response.json())
      .then((responsejson)=>{
        console.log(responsejson);
      }).catch((error)=>{
        console.log('Transaction failed');
      });
  }
  constructor()
  {
    super();
    this.items = [
      {id: '1',
      type: 'transaction id',
      name:'KFC',
      description:'You have gained 500 points from KFC. Please Keep in mind that these points are only valid before the expire date.',
      img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {id: '2',
      type: 'normal',
      name:'KFC',
      description:'You have gained 500 points from KFC. Please Keep in mind that these points are only valid before the expire date.',
      img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {id: '3',
      type: 'transaction id',
      name:'KFC',
      description:'You have gained 500 points from KFC. Please Keep in mind that these points are only valid before the expire date.',
      img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {id: '4',
      type: 'normal',
      name:'KFC',
      description:'You have gained 500 points from KFC. Please Keep in mind that these points are only valid before the expire date.',
      img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {id: '5',
      type: 'normal',
      name:'KFC',
      description:'You have gained 500 points from KFC. Please Keep in mind that these points are only valid before the expire date.',
      img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {id: '6',
      type: 'normal',
      name:'KFC',
      description:'You have gained 500 points from KFC. Please Keep in mind that these points are only valid before the expire date.',
      img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {id: '7',
      type: 'normal',
      name:'KFC',
      description:'You have gained 500 points from KFC. Please Keep in mind that these points are only valid before the expire date.',
      img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {id: '8',
      type: 'normal',
      name:'KFC',
      description:'You have gained 500 points from KFC. Please Keep in mind that these points are only valid before the expire date.',
      img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
    ];
  }

  TransactionBar(type){
    if(type=='transaction id'){
      return <TextInput style = {styles.input}
      underlineColorAndroid = "transparent"
      placeholder = " Enter transation ID"
      placeholderTextColor = "#3f3f3f"
      autoCapitalize = "none"
      onChangeText = {this.handlePassword}/>
    }
    else{

    }

  }
  TransactionButton(type){
    if(type=='transaction id'){
      return <Button danger style={{height:40}} onPress={this.sendTransactionID.bind(this,"248455")}><Text>Redeem Coin</Text></Button>
    }
  }
  TransactionModelTest(type){
    if(type=='transaction id'){
      return <Button danger style={{height:40}} onPress={() => {this.setModalVisibleTransaction(true);}}><Text>Redeem Coin</Text></Button>
    }
  }

  render() {
    let { image } = this.state;
    return(
    <Container>
      <Header style = {{ height: 60,backgroundColor: '#a3080c', color: 'orange', paddingBottom: 0, paddingTop: 0}}>
      <Body>
        <H3 style={{ color: 'white', fontWeight: "bold", paddingTop: 0, paddingLeft: 8 }}>Notification</H3>
      </Body>
      </Header>
        <Grid>
            <Content style = {{backgroundColor:'#dfdfdf'}}>
            {
                this.items.map((item, key)=>
                  (
                    <View key={key}>
                      <Card style={{flex: 0, marginLeft: 0, width: '100%' }}>
                      <Row >
                        <Col style={{ backgroundColor: '#dfdfdf', height: '100%', width: '100%'}}>
                            <CardItem>
                              <Left>
                                  <Thumbnail source={{uri : item.img}} />
                                  <Body>
                                  <Text style={{fontWeight:'bold',fontSize:20,color:'#484848' }}>{item.name}</Text>
                                  <Text style={{textAlign:'justify',color:'#5d5d5d'}}>{item.description}</Text>
                                  </Body>
                              </Left>
                            </CardItem>
                            <Modal
                              animationType="fade"
                              transparent={true}
                              onRequestClose={()=>{this.setModalVisibleTransaction(!this.state.transactionmodalVisible);}}
                              visible={this.state.transactionmodalVisible}>

                              <BlurView tint="light" intensity={50}  style={{
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
                                  <Button transparent onPress={()=>{this.setModalVisibleTransaction(!this.state.transactionmodalVisible);}}>
                                    <MaterialCommunityIcons name="window-close" size="20" color="#959595" />
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
                                  onChangeText = {this.handlePassword}/>
                                   <Right style={{paddingTop:20}}>
                                   <Button danger style={{height:40}}><Text>Send</Text></Button>
                                   </Right>
                                </View>
                              </BlurView>
                            </Modal>
                        </Col>
                      </Row>
                      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{padding:20}}>
                          {this.TransactionModelTest(item.type)}
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
