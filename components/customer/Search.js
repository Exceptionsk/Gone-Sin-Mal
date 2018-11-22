import React, { Component } from 'react';
import {Container,Content, Header,Button, Badge,Icon,Right, Left, Body, Text, Item, Input, Card, CardItem, View, Thumbnail, ListItem, CheckBox} from 'native-base';
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';

export default class Home extends Component{

  constructor()
  {
    super();
    this.items = [
      {name:'KFC', favouritestatus:'yes', img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {name:'Sar Mal',favouritestatus:'no', img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {name:'Gone Sin',favouritestatus:'yes', img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {name:'YKKO',favouritestatus:'yes', img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {name:'Golden Pot',favouritestatus:'no', img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
    ];
  }
  FavouriteButtonStatus(favouritestatus){
    if(favouritestatus=='yes'){
      return <Button transparent warning style={{height:'55%',shadowColor: '#000000',shadowOffset: {width: 1,height: 1},shadowRadius: 1,shadowOpacity: 0.5}}><Badge warning style={{height:'100%', backgroundColor:'white', borderWidth:1, borderColor:'#fe680d'}}><MaterialCommunityIcons name="tag-heart" size={35} color="red" /></Badge></Button>
    }
    else{
      return <Button transparent warning style={{height:'55%',shadowColor: '#000000',shadowOffset: {width: 1,height: 1},shadowRadius: 1,shadowOpacity: 0.5}}><Badge style={{height:'100%', backgroundColor:'white', borderWidth:1, borderColor:'#fe680d'}}><MaterialCommunityIcons name="tag-heart" size={35} color="#6c7a87"/></Badge></Button>
    }
  }
  render(){
    return(
      <Container>
        <Header searchBar rounded style = {{height: 70,backgroundColor: '#a3080c', color: 'orange', paddingBottom: 10, paddingTop: 20}}>
            <Item style = {{backgroundColor: 'white' ,borderColor: 'orange', borderTopWidth: 1, borderRightWidth: 1, borderLeftWidth: 1}}>
              <Icon name="ios-search" />
              <Input placeholder="Search" />
            </Item>
            {/* <Button transparent onPress={()=>this.props.navigation.goBack()} >
              <Icon style = {{color: 'white', paddingLeft:20}} name='arrow-back' />
              <Text style = {{color: 'white', width:'100%'}} >Search</Text>
            </Button> */}
          {/* <Right>
          </Right> */}
        </Header>
        <Content padder>
              {
                this.items.map((item, key)=>
                (
                  <Card key={key} style={{borderColor:'red', borderRadius: 2}}>
                    <CardItem style={{paddingTop:0, paddingBottom:0, paddingRight:0}}>
                      <Body>
                      <View style={{flex: 1,flexDirection: 'row'}}>
                        <View style={{width: 100, height: '100%', paddingTop:10, paddingBottom:10}}>
                          <Thumbnail square large source={{uri: item.img}} style={{borderWidth:1, borderColor:'#616161', borderRadius: 10}} />
                        </View>
                        <View style={{alignSelf: 'flex-start' , height: '100%', padding:20,alignItems: 'center', justifyContent: 'center'}}>
                          <Text style={{fontWeight:'bold'}}>{item.name}</Text>
                        </View>
                        <Right>
                          <View style={{width: 70, height: '100%', backgroundColor: 'white',alignItems: 'center', justifyContent: 'center'}}>
                            {this.FavouriteButtonStatus(item.favouritestatus)}
                          </View>
                        </Right>
                      </View>
                        {/* <Col style={{ backgroundColor: 'white', height: 180, width: 140,marginRight:0 }}>

                        </Col> */}
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
