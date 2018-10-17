import React, { Component } from 'react';
import {View} from "react-native";
import { Container, Header, H1,H2,H3, H4,Title, Item, Input, Icon, Thumbnail, Content, Button, Footer, FooterTab, Badge, Card, CardItem, Body, Text } from 'native-base';

export default class Favourite extends Component {
  render() {
    return(
      <Container>
      <Header>
          <Body>
            <Title>Favourite</Title>
          </Body>
        </Header>
      <View>
        <Text>i am fav</Text>
      </View>
      </Container>
    );
  }
}
