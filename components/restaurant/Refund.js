import React, { Component } from 'react';
import {View, Image, StyleSheet, ImageBackground, ScrollView, Switch} from "react-native";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Ionicons } from '@expo/vector-icons';
import { Container, Form, Label, Input, Header, H1,H2,H3, H4,Title, Item, Icon, Thumbnail, Content, Button, Footer, FooterTab, Badge, Card, CardItem, Body, Text } from 'native-base';
import ToggleSwitch from 'toggle-switch-react-native';
export default class Home extends Component{

  render(){
    return(
      <Container>
        <Form>
            <Item>
              <Input placeholder="Enter refund amount"/>
            </Item>
            <Button block success>
              <Text>Refund Now</Text>
            </Button>
          </Form>
      </Container>
    );
  }
}
