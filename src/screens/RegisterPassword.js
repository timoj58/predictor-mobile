import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet,View,TextInput, Button } from 'react-native';
import {create} from "../api/AuthService";

 class RegisterPassword extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      token: '',
      username: props.navigation.state.params.username,
      styles: props.navigation.state.params.styles,
      disabledButton: true,
      password: ''};
  }

  render() {
    return (
      <View style={this.state.styles.container}>
       <TextInput secureTextEntry={true}
        style={{
          height: 40,
          alignSelf: 'stretch',
          borderColor: 'gray',
          borderWidth: 1}}
        onChangeText={(password) => this.setState({password})}/>
        <Button
         onPress={() =>  create(this.state.username, this.state.password)}
         title="Register"
         color="#841584"
         disabled={this.state.disabledButton}
         accessibilityLabel="Next"
         />

    </View>
    );
  }
}

export default RegisterPassword;
