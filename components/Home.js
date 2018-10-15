import React, { Component } from 'react';
import { View, Image, StyleSheet, ImageBackground, ScrollView  } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Header, H1,H2, H4, Item, Input, Icon, Thumbnail, Content, Button, Footer, FooterTab, Badge, Text } from 'native-base';
import {Actions} from 'react-native-router-flux';
import ToggleSwitch from 'toggle-switch-react-native';



export default ({history}) => (
    <Container>
        <Header searchBar rounded>
          <Button transparent onPress={Actions.userprofile}>
              <Thumbnail  source={require('../assets/usothree.jpg')} />
              <Text>BitGeeks</Text>
          </Button>
          <Button transparent>
              <Text>Available Coin</Text>
                <Text>1,866</Text>
          </Button>
        </Header>
    </Container>
);

const styles= StyleSheet.create({
  image:{
    height: '100%',
    width: '100%',
    borderColor: 'white',
    borderWidth: 3
  },
  imagetwo:{
    height: '100%',
    width: '100%',
    borderColor: 'black',
    borderWidth: 1
  },
  imgcol:{
    padding: 20,
    color: 'white',
  },
  imgcoltwo:{
    paddingTop: 20,
    paddingLeft: 20,
    color: 'white',
  },
  imgcolthree:{
    paddingTop: 20,
    color: 'white',
  },
  container:{
    flex:1,
    width:'100%',
    height:'100%',
  }
})
