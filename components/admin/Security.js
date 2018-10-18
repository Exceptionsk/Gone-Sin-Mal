import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label,Button,Thumbnail,Text,Grid,Row,Col,H3 } from 'native-base';

export default class Security extends Component {
  render() {
    return (
      <Container>
        <Header style = {{height: 110,backgroundColor: '#a3080c' , color: 'orange', paddingBottom: 0, paddingTop: 0}}>
          <Button transparent style={{height:70}}>
              <Thumbnail style = {{ marginLeft:15, borderColor: 'white', borderWidth: 2}}  source={require('../../assets/saitama.jpg')} />
              <Text style = {{color: 'white'}}>Saitama</Text>
          </Button>
        </Header>
        <Grid>
          <Row style={{height: 50}}>
            <Col style={{ height: 50, paddingTop: 15 }}>
                    <H3 style={{ fontWeight: "bold", paddingTop: 0, paddingLeft: 8 }}>Change Password</H3>
            </Col>
          </Row>
          <Row style={{height:250}}>
            <Col style={{ height: 270, paddingTop: 15 }}>
              <Form>
                <Item stackedLabel>
                  <Label>Enter Old Password</Label>
                  <Input />
                </Item>
                <Item stackedLabel last>
                  <Label>Enter New Password</Label>
                  <Input />
                </Item>
                <Item stackedLabel last>
                  <Label>Confirm Password</Label>
                  <Input />
                </Item>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button iconLeft full warning textStyle={{color:'white'}} style={{alignSelf:'center',width: 150}} onPress={() => this.props.navigation.navigate('AdminHome')}>
                <Text> Confirm </Text>
              </Button>
            </Col>
            <Col>
            <Button iconLeft full primary textStyle={{color:'white'}} style={{alignSelf:'center',width: 150}} onPress={() => this.props.navigation.navigate('AdminHome')}>
                <Text>Cancel </Text>
              </Button>
            </Col>
          </Row>
        </Grid>

      </Container>
    );
  }
}