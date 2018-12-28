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
      password: ''};
  }

  render() {
    return (
      <View style={this.state.styles.container}>
       <TextInput secureTextEntry={true}
        style={this.state.styles.inputField}
        onChangeText={(password) => this.setState({password})}/>
        <Button
        onPress={() =>  login(this)}
         title="Login"
         color="green"
         accessibilityLabel="Next"
         />
    </View>
    );
  }
}

function login(component) {
  authenticate(component.state.username, component.state.password)
  .then(token => {
    if(token !== ""){
        component.props.navigation.navigate('Home', {
          token: token,
          styles: component.state.styles});
    }

  });

 } // end username null

export default LoginPassword;
