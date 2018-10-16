import React, {Component} from "react";
import {View, Text, Button} from "react-native";

class Login extends Component {
  static navigationOptions = {
    header:null
  }
  render(){
    return(
      <View>
        <Button title="Login" onPress={() => this.props.navigation.replace('CustHome')}/>
      </View>
    )
  }
};
export default Login;
