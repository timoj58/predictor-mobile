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
      enterEnabled: false,
      type: props.navigation.state.params.type,
      adUnitID: props.navigation.state.params.adUnitID,
      adUnitRewardsID: props.navigation.state.params.adUnitRewardsID,
      password: props.navigation.state.params.username};

  }

  render() {
    return (
      <View style={this.state.styles.container}>
       <TextInput secureTextEntry={true}
         style={this.state.styles.inputField}
         editable={false}
         placeholder='Enter password again'
         value={this.state.password}
         onChangeText={(password) => this.setState({disabledButton: false})}
       />
        <Button
         onPress={() =>  createUser(this)}
         title="Register"
         color="green"
         disabled={false}
         accessibilityLabel="Next"
         />

    </View>
    );
  }
}


function createUser(component){
  create(component.state.username, component.state.password)
  .then(token =>  {
    if(token !== ""){
      console.log(token);
        component.props.navigation.navigate('Home', {
          token: token,
          type: component.state.type,
          adUnitID: component.state.adUnitID,
          adUnitRewardsID: component.state.adUnitRewardsID,
          styles: component.state.styles});
    }
 });
}

export default RegisterPassword;
