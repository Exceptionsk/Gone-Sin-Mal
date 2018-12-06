import React, { Component } from 'react';
import {Container,Content, Header,Button, Badge,Icon,Right, Left, Body, Text, Item, Input, Card, CardItem, View, Thumbnail, ListItem, CheckBox} from 'native-base';
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';

export default class Home extends Component{
  state = {
    Results: [],
    value:'',
  };

  FavouriteButtonStatus(favouritestatus){
    if(favouritestatus=='yes'){
      return <Button transparent warning style={{height:'55%',shadowColor: '#000000',shadowOffset: {width: 1,height: 1},shadowRadius: 1,shadowOpacity: 0.5}}><Badge warning style={{height:'100%', backgroundColor:'white', borderWidth:1, borderColor:'#fe680d'}}><MaterialCommunityIcons name="tag-heart" size={35} color="red" /></Badge></Button>
    }
    else{
      return <Button transparent warning style={{height:'55%',shadowColor: '#000000',shadowOffset: {width: 1,height: 1},shadowRadius: 1,shadowOpacity: 0.5}}><Badge style={{height:'100%', backgroundColor:'white', borderWidth:1, borderColor:'#fe680d'}}><MaterialCommunityIcons name="tag-heart" size={35} color="#6c7a87"/></Badge></Button>
    }
  }

  handleChange(e) {
       this.setState({
         value: e.nativeEvent.text,
       });
     }

  handleSearch(value){
    return fetch(global.HostURL + '/api/restaurant/search?name=' + this.state.value)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      this.setState({
         Results: responseJson,
       }, function(){

       });
    })
    .catch((error) => {
      console.error(error);
      console.log("search failed");
    });
  }

  render(){
    return(
      <Container>
        <Header searchBar rounded style = {{height: 70,backgroundColor: '#a3080c', color: 'orange', paddingBottom: 10, paddingTop: 20}}>
            <Item style = {{backgroundColor: 'white' ,borderColor: 'orange', borderTopWidth: 1, borderRightWidth: 1, borderLeftWidth: 1}}>
              <Icon name="ios-search" />
              <Input placeholder="Search" onChange={this.handleChange.bind(this)} onSubmitEditing={this.handleSearch.bind(this)} returnKeyType="search" />
            </Item>
        </Header>
        <Content padder>
              {
                this.state.Results.map((item, key)=>
                (
                  <Card key={key} style={{borderColor:'red', borderRadius: 2}}>
                    <CardItem style={{paddingTop:0, paddingBottom:0, paddingRight:0}}>
                      <Body>
                      <View style={{flex: 1,flexDirection: 'row'}}>
                        <View style={{width: 100, height: '100%', paddingTop:10, paddingBottom:10}}>
                          <Thumbnail square large source={{uri: global.HostURL + '/api/resturant/profile_pic/' + item.Rest_id}} style={{borderWidth:1, borderColor:'#616161', borderRadius: 10}} />
                        </View>
                        <View style={{alignSelf: 'flex-start' , height: '100%', padding:20,alignItems: 'center', justifyContent: 'center'}}>
                          <Text style={{fontWeight:'bold'}}>{item.Rest_name}</Text>
                        </View>
                      </View>
                      </Body>
                    </CardItem>
                  </Card>
                )
                )
              }
        </Content>
      </Container>
    );
  }

}
