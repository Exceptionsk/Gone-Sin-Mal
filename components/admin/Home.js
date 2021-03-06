import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet, TextInput,TouchableWithoutFeedback,
    Dimensions,
    ScrollView,
    Alert, Modal, View
  } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container,Card,CardItem,Body, Header, H1,H2,H3, H4,Left, Item, Input, Icon, Thumbnail, Content, Button, Footer, FooterTab, Badge, Text } from 'native-base';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from 'react-native-chart-kit';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';

export default class Home extends Component {
  state = {
    modalVisible: false,
    System:[],
    Data:[],
    key:'',
  };

  getTotalCoins(){
   return (this.state.System.Sold_coins+ this.state.System.Sold_special_coins+ this.state.System.Expired_coins);
  }


  componentDidMount(){
    let that = this;
    setInterval(() => {
      let newdata=[
        { name: 'Normal Coin', population: global.SystemStatus.Sold_coins, color: '#84f8bd', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Special Coin', population: global.SystemStatus.Sold_special_coins, color: '#84bdf8', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Expired Coin', population: global.SystemStatus.Expired_coins, color: '#f8d184', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      ]
        that.setState({System: global.SystemStatus});
        that.setState({Data: newdata});
    }, 1000);
  }

  cancelModal(){
    global.adminModel=false;
    global.authorized=false;
  }

  checkKey(){
    fetch(global.HostURL + '/api/Admin/authenticate?key='+ this.state.key)
     .then((response) => response.json())
     .then((responseJson) => {
       this.setState({key:''});
       console.log(responseJson);
       if(responseJson=="Yes"){
         global.adminModel=false;
         global.authorized=true;
       }else{
         Alert.alert(
           'Wrong Key',
           'The Key you entered is Incorrect',
           [
             {text: 'OK', onPress: () => console.log('OK Pressed')},
           ]
         )
       }
     })
     .catch((error) => {
       console.log(error);
     });
  }

  render() {
    const chartConfig = {
      backgroundGradientFrom: '#1E2923',
      backgroundGradientTo: '#08130D',
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
    }
    return (
      <Container>
        <Modal
         animationType="slide"
         transparent={true}
         visible={global.adminModel}>
         <View style={styles.modalcontainer}>
           <View style={styles.responsiveBox}>
               <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = " Enter Key"
               placeholderTextColor = "#3f3f3f"
               autoCapitalize = "none"
               onChangeText={(text) => this.setState({key:text})}
               />
               <View style={{flex:1,flexDirection: 'row',alignSelf:'center'}}>
                 <View style={{alignSelf:'center', paddingRight:15}}>
                   <Button success style={{width: wp('25%'), height:35,justifyContent: 'center'}} onPress={()=>{this.checkKey()}}>
                     <Text style={{textAlign:'center'}}>Enter</Text>
                   </Button>
                 </View>
                 <View style={{alignSelf:'center', paddingLeft:15}}>
                   <Button danger style={{width: wp('25%'), height:35,justifyContent: 'center'}} onPress={()=>{this.cancelModal()}}>
                     <Text>Cancel</Text>
                   </Button>
                 </View>
            </View>
             </View>
           </View>
         </Modal>
          <Header style = {{height: 80,backgroundColor: '#a3080c' , color: 'orange', paddingBottom: 0, paddingTop: 0}}>
          <Button transparent style={{height:70}}>
              <Thumbnail style = {{ marginLeft:15, borderColor: 'white', borderWidth: 2}}  source={{uri: 'https://graph.facebook.com/'+ global.Profile.id + '/picture?type=normal'}} />
              <Text style = {{color: 'white'}}>{global.Profile.name}</Text>
          </Button>
        </Header>
        <Grid>
        <Content>
        <Card style={{width:'99%',height:'100%'}}>
          <CardItem header>
          <Row>
            <Col style={{height:30, alignItems:'center'}}>
              <H2>Coin Status</H2>
            </Col>
          </Row>
          </CardItem>
          <CardItem>
              <Row>
                <Col style={{backgroundColor:'white',height:'100%'}}>
                    <PieChart
                      data={this.state.Data}
                      width={390}
                      height={220}
                      chartConfig={chartConfig}
                      accessor="population"
                      backgroundColor="transparent"
                    />
                  </Col>
              </Row>
          </CardItem>
          <CardItem footer>
          <Row>
            <Col style={{backgroundColor:'white'}}>
              <View style={{flex:1,justifyContent: 'space-between',height: hp('23%')}}>
                <Text style={{paddingBottom:5,fontSize:18}}>Total Coin: {this.getTotalCoins()}</Text>
                <Text style={{paddingBottom:5,fontSize:18}}>Normal Coin: {this.state.System.Sold_coins}</Text>
                <Text style={{paddingBottom:5,fontSize:18}}>Special Coin: {this.state.System.Sold_special_coins}</Text>
                <Text style={{paddingBottom:5,fontSize:18}}>Expired Coin: {this.state.System.Expired_coins}</Text>
              </View>
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
const styles = StyleSheet.create({

  searchBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ff7d21',
    height: 40,
    borderRadius: 5,
    margin: 10,
  },
  input: {
    borderColor: '#ff7d21',
    borderRadius: 5,
    borderWidth: 1,
    width:'100%',
    height:40
 },
  modalcontainer:{
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    margin:10,
  },
  responsiveBox: {
    padding :10,
    width: wp('84.5%'),
    height: 130,
    backgroundColor: 'white',
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: 'grey',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 3,
    shadowOpacity: 0.5,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  responsiveBoxphnumber: {
    width: wp('84.5%'),
    height: hp('22%'),
    paddingBottom: 8,
    backgroundColor: 'white',
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: 'grey',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 3,
    shadowOpacity: 0.5,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  container:{
    flex:1,
    width:'100%',
    height:'100%',
  }
});
