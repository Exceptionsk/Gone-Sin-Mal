import React, { Component } from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Container, Header, Item, Input, Icon, Content, Button, Footer, FooterTab, Badge, Text } from 'native-base';
import {Actions} from 'react-native-router-flux';

export default ({history}) => (
    <Container>
        <Footer>
          <FooterTab>
            <Button vertical onPress={Actions.home}>
            <Ionicons name="ios-search" size={40} color="white" />
              {/* <Text style = {{fontStyle:'bold' ,fontSize: '13' ,color: 'black'}}>SEARCH</Text> */}
            </Button>
            <Button vertical onPress={Actions.fav}>
              <Ionicons name="md-heart" size={40} color="white" />
              {/* <Text style = {{fontSize: '13' ,color: 'black'}}>FAVOURITE</Text> */}
            </Button>
          </FooterTab>
        </Footer>
      </Container>
);
