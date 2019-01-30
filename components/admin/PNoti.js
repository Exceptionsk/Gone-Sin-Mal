import React, { Component } from 'react';
import { View, Image, StyleSheet, ImageBackground, ScrollView, Alert, Modal, TextInput  } from 'react-native';
import { Container, Badge, H3, Header, Content, Card, CardItem,Grid,Row,Col, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
export default class PNoti extends Component {
  componentDidMount() {
    let that = this;
    setInterval(() => {
        that.setState({Notification: global.RefundNotification});
    }, 1000);
  }

  state = {
    Notification:[],
    key:'',
  };

  cancelModal(){
    global.adminModel=false;
    global.authorized=false;
  }

  checkKey(){
    fetch(global.HostURL + '/api/Admin/authenticate?key='+ this.state.key)
     .then((response) => response.json())
     .then((responseJson) => {
       console.log(responseJson);
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

  DoRefund(id){
    if(global.authorized){
      fetch(global.HostURL + '/api/Refund/' + id,{
        method:'DELETE',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then((response) => response.json())
        .then((responseJson) => {
          global.AdminNotification=responseJson;
      }).catch((error) => {
          // console.log("admin noti failed");
      });
    }else{
      Alert.alert(
        'Access Denied',
        'Enter correct key to manage Refund Requests!',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]
      )
    }
  }

  render() {
    return(
    <Container>
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
    <Header style = {{ height: 60,backgroundColor: '#a3080c', paddingBottom: 0, paddingTop: 0}}>
    <Body>
      <H3 style={{ color: 'white', fontWeight: "bold", paddingTop: 0, paddingLeft: 8 }}>Refund Request</H3>
    </Body>
    </Header>
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
                                  <Text style={{fontWeight:'bold',fontSize:20,color:'#484848' }}>Refund Request</Text>
                                  <Text style={{textAlign:'justify',color:'#5d5d5d'}}>{item.Rest_name} has requested you to refund {item.Amount} Coins. Transfer amount to this Myan Pay Account : {item.Myan_pay}.</Text>
                                  </Body>
                              </Left>
                              <Button warning  style={{alignSelf:'center', width: 90,height:35,marginLeft:8}} onPress={() => this.DoRefund(item.ID)}>
                                  <Text style={{fontWeight:'bold',fontSize:13 }}>Complete</Text>
                                </Button>
                            </CardItem>
                        </Col>
                      </Row>
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
const styles = StyleSheet.create({

  searchBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ff7d21',
    height: 40,
    borderRadius: 5,
    margin: 10,
  },
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
  container:{
    flex:1,
    width:'100%',
    height:'100%',
  }
});
