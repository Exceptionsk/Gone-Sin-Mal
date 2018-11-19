import React, { Component } from 'react';
import {Container,Content, Header,Button, Icon,Right, Left, Body, Text, Item, Input, Card, CardItem, View, Thumbnail, ListItem, CheckBox} from 'native-base';

export default class Home extends Component{

  constructor()
  {
    super();
    this.items = [
      {name:'KFC', img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {name:'Sar Mal', img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {name:'Gone Sin', img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {name:'YKKO', img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
      {name:'Golden Pot', img:'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'},
    ];
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
                  <Card key={key} style={{borderColor:'red', borderRadius: 5, padding:0}}>
                    <CardItem>
                      <Body>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{width: 100, height: '100%', alignItems: 'center'}}>
                          <Thumbnail square large source={{uri: item.img}} style={{borderColor:'red', borderRadius: 10}} />
                        </View>
                        <View style={{alignSelf: 'flex-start' , height: '100%', alignItems: 'center', padding:20}}>
                          <Text>{item.name}</Text>
                        </View>
                        <Right>
                          <View style={{width: 50, height: '100%', backgroundColor: 'steelblue'}}>
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
