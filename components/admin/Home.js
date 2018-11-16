import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet, TextInput,TouchableWithoutFeedback,
    Dimensions,
    ScrollView
  } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container,Card,CardItem,Body, Header, H1,H2,H3, H4,Left, Item, Input, Icon, Thumbnail, Content, Button, Footer, FooterTab, Badge, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from 'react-native-chart-kit';


export default class Home extends Component {
  state = {
    modalVisible: false,
    Coinstatus : [],
    value:'',
  };
  getCoinstatus(){
    return fetch(global.HostURL + '/api/System_Table')
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      this.setState({
        Coinstatus: responseJson,
       }, function(){

       });
    })
    .catch((error) => {
      // console.error(error);
      console.log("recommend failed");
    });
  }
  componentDidMount(){
    this.getCoinstatus();
  }
  componentDidMount(sum){
    var sum = 0;
  this.state.Coinstatus.map((item, key)=>
  (
     sum +=(item.Sold_coins)
  )
  )
  alert(sum)
}

  render() {
    
      
      const data = 
      [
        { name: 'Normal Coin', population: 2000, color: '#ff9d0a', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Special Coin', population: 3000, color: 'blue', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Expired Coin', population: 1000, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      ]

    

    const chartConfig = {
      backgroundGradientFrom: '#1E2923',
      backgroundGradientTo: '#08130D',
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
    }
    const rcdata = {
      labels: ['Jan', 'Feb', 'Mar', 'April', 'May', 'June','July','Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        data: [ 20, 45, 28, 80, 99, 43, 70, 57, 30, 80, 70, 80 ]
      }]
    }
    const rcchartConfig = {
      backgroundGradientFrom: '#357edd',
      backgroundGradientTo: '#8956ff',
      color: (opacity = 1) => `rgba(225, 225, 225, ${opacity})`
    }
    const screenWidth = Dimensions.get('window').width
    return (
      <Container>
          <Header style = {{height: 110,backgroundColor: '#a3080c' , color: 'orange', paddingBottom: 0, paddingTop: 0}}>
          <Button transparent style={{height:70}}>
              <Thumbnail style = {{ marginLeft:15, borderColor: 'white', borderWidth: 2}}  source={require('../../assets/saitama.jpg')} />
              <Text style = {{color: 'white'}}>Saitama</Text>
          </Button>
        </Header>
        <Grid>
        <Content>
        <Card style={{width:'99%',height:450}}>
          <CardItem header>
          <Row>
            <Col style={{height:30, alignItems:'center'}}>
              <H2>Coin Status</H2>
            </Col>
          </Row>
          </CardItem>
          <CardItem>
              <Row>
                {
                  this.state.Coinstatus.map((item, key)=>
                  (
                    
                      <Col>
                     <Text>{sum +=item.Sold_coins}</Text>
                      </Col>
                  )
                  )
                  
                }

                <Col style={{backgroundColor:'white',height:'100%'}}>
                    <PieChart
                      data={data}
                      width={390}
                      height={220}
                      chartConfig={chartConfig}
                      accessor="population"
                      backgroundColor="transparent"
                      paddingLeft="15"
                    />
                  </Col>
              </Row>
          </CardItem>
          <CardItem footer>
          <Row>
            <Col style={{backgroundColor:'white'}}>
              <Text style={{paddingBottom:5}}>Total Coin: 10,000</Text>
              <Text style={{paddingBottom:5}}>Normal Coin: 8,000</Text>
              <Text style={{paddingBottom:5}}>Special Coin: 1,000</Text>
              <Text style={{paddingBottom:5}}>Expired Coin: 1,000</Text>
              {/* <Text style={{paddingBottom:5}}>Total Restaurants: 57</Text>
              <Text style={{paddingBottom:5}}>Total Customers: 275</Text> */}
            </Col>
          </Row>
          </CardItem>
        </Card>
        <Card style={{width:'99%',height:350}}>
          <CardItem header>
          <Row>
            <Col style={{height:30, alignItems:'center'}}>
              <H2>Restaurants Status</H2>
            </Col>
          </Row>
          </CardItem>
          <CardItem> 
              <Row style={{width:378}}>      
                <Col style={{backgroundColor:'white'}}>
                <ScrollView horizontal={true}>
                <BarChart
                  data={rcdata}
                  width={1000}
                  height={220}
                  chartConfig={rcchartConfig}
                />
                </ScrollView>
                </Col>
              </Row>         
          </CardItem>
          <CardItem footer>
          <Row>
            <Col style={{backgroundColor:'white'}}>
              <Text style={{paddingBottom:5}}>Total Restaurants: 57</Text>
              {/* <Text style={{paddingBottom:5}}>Total Customers: 275</Text> */}
            </Col>
          </Row>
          </CardItem>
        </Card>
        <Card style={{width:'99%',height:350}}>
          <CardItem header>
          <Row>
            <Col style={{height:30, alignItems:'center'}}>
              <H2>Customers Status</H2>
            </Col>
          </Row>
          </CardItem>
          <CardItem> 
              <Row style={{width:378}}>      
                <Col style={{backgroundColor:'white'}}>
                <ScrollView horizontal={true}>
                {/* <BarChart
                  data={rcdata}
                  width={1000}
                  height={220}
                  chartConfig={rcchartConfig}
                /> */}
                <LineChart
                  data={rcdata}
                  width={1000}
                  height={220}
                  chartConfig={rcchartConfig}
                  bezier
                />
                </ScrollView>
                </Col>
              </Row>         
          </CardItem>
          <CardItem footer>
          <Row>
            <Col style={{backgroundColor:'white'}}>
              <Text style={{paddingBottom:5}}>Total Number of Customer: 789</Text>
              {/* <Text style={{paddingBottom:5}}>Total Customers: 275</Text> */}
            </Col>
          </Row>
          </CardItem>
        </Card>
        </Content>
        </Grid>
      </Container>
    );
  };
}
