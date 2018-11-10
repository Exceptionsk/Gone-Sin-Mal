import React, { Component } from 'react';
import {Container,Content, Header,Button, Icon,Right, Left, Body, Text } from 'native-base';

export default class Home extends Component{

  render(){
    return(
      <Container>
        <Header style = {{height: 70,backgroundColor: '#a3080c', color: 'orange', paddingBottom: 0, paddingTop: 0}}>
          <Body>
            <Button transparent onPress={()=>this.props.navigation.goBack()} >
              <Icon style = {{color: 'white', paddingLeft:20}} name='arrow-back' />
              <Text style = {{color: 'white', width:'100%'}} >Search</Text>
            </Button>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content padder>
          <Text>hello</Text>
        </Content>
      </Container>
    );
  }

}
