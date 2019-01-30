import React, { Component } from 'react';
import {View, Image, StyleSheet, ImageBackground, ScrollView, Switch, Modal, AsyncStorage, TextInput, Alert } from "react-native";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container,List, Left, Header, ListItem, H1,H2,H3, H4,Title,Right, Item, Input, Icon, Thumbnail, Content, Button, Footer, FooterTab, Badge, Card, CardItem, Body, Text } from 'native-base';
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default class Admins extends Component {
  state = {
    value:'',
    Users:[],
    key:'',
    modalVisible:false,
    authorized: false,
  };

  componentDidMount(){
    let that = this;
    setInterval(() => {
        that.setState({modalVisible: global.adminModel});
        that.setState({authorized: global.adminAuthorized});
    }, 1000);
  }

  cancelModal(){
    global.adminModel=false;
    this.setState({authorized:false });

  }

  checkKey(){
    fetch(global.HostURL + '/api/Admin/authenticate?key='+ this.state.key)
     .then((response) => response.json())
     .then((responseJson) => {
       console.log(responseJson);
       if(responseJson=="Yes"){
         this.setState({modalVisible:false});
         that.setState({authorized:true });
         global.adminModel=false;
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

  handleChange(e) {
       this.setState({
         value: e.nativeEvent.text,
       });
       console.log(this.state.value);
     }

  handleSearch(){
    if(this.state.authorized){
      return fetch(global.HostURL + '/api/User/search?name=' + this.state.value)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
           Users: responseJson,
         }, function(){

         });
      })
      .catch((error) => {
        console.error(error);
      });
    }else{
      Alert.alert(
        'Access Denied',
        'Enter correct key to manage admins!',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]
      )
    }

  }

  Userbar(id,type){
    if(type=="admin"){
      return <Button rounded small onPress={this.Demote.bind(this,id)}><Icon name='ios-remove-circle' /></Button>

    }else{
      return <Button rounded small onPress={this.Promote.bind(this,id)}><Icon name='ios-person-add' /></Button>
    }
  }

  Promote(id){
    try {
      fetch(global.HostURL + '/api/user/promote', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          User_id : id,
        }),
      }).then((response) => response.json())
        .then((responsejson)=>{
          this.handleSearch();
        });
    } catch (e) {
      console.log('promote failed');
    }
  }

  Demote(id){
    try {
      fetch(global.HostURL + '/api/user/demote', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          User_id : id,
        }),
      }).then((response) => response.json())
        .then((responsejson)=>{
          this.handleSearch();
        });
    } catch (e) {
      console.log('demote failed');
    }
  }
  render() {
    return (
      <Container>
        <Modal
         animationType="slide"
         transparent={true}
         onRequestClose={()=>{this.setState({modalVisible:false});}}
         visible={this.state.modalVisible}>
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
      <Header style = {{height: 50,backgroundColor: '#a3080c', color: 'orange', paddingBottom: 0, paddingTop: 0}}>
      <Body>
        <Text style = {{color: 'white'}}>Add or remove Admin</Text>
      </Body>
      </Header>
        <View style={styles.searchBar}>
        <Icon name="ios-search" style={{padding:10}} />
          <TextInput style={{flex:1}}
          underlineColorAndroid = "transparent"
          placeholder = " Search "
          placeholderTextColor = "#3f3f3f"
          autoCapitalize = "none"
          returnKeyType="search"
          onChange={this.handleChange.bind(this)}
          onSubmitEditing={this.handleSearch.bind(this)}
          />
        </View>
        <Content>
          {
            this.state.Users.map((item, key)=>
              (
                <List key={key}>
                  <ListItem thumbnail>
                    <Left>
                      <Thumbnail source={{ uri: 'https://graph.facebook.com/'+ item.User_id + '/picture?type=normal' }} />
                    </Left>
                    <Body>
                      <Text>{item.User_name}</Text>
                      <Text note>{item.User_type}</Text>
                    </Body>
                    <Right>
                      {this.Userbar(item.User_id, item.User_type)}
                    </Right>
                  </ListItem>
                </List>
              )
            )
          }
        </Content>
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
