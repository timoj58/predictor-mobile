import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet,View,TextInput, Button } from 'react-native';
import {authenticate} from "../api/AuthService";

 class LoginPassword extends React.Component {
   constructor(props) {
    super(props);

    this.state = {
      token: '',
      username: props.navigation.state.params.username,
      styles: props.navigation.state.params.styles,
      buttonColor: 'green',
      password: ''};
  }

  render() {
    return (
      <View style={this.state.styles.container}>
       <TextInput secureTextEntry={true}
        style={this.state.styles.inputField}
        placeholder='Your password'
        onChangeText={(password) => this.setState({password: password, buttonColor: 'green'})}/>
        <Button
        onPress={() =>  login(this)}
         title="Login"
         color={this.state.buttonColor}
         accessibilityLabel="Next"
         />
    </View>
    );
  }
}

function login(component) {
  authenticate(component.state.username, component.state.password)
  .then(token => {
    if(typeof token !== 'undefined'){
        component.props.navigation.navigate('Home', {
          token: token,
          styles: component.state.styles});
    }else{
      component.setState({buttonColor: 'red'});
    }

  });

 } // end username null

export default LoginPassword;
