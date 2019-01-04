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
      enterEnabled: false,
      password: ''};
  }

  render() {
    return (
      <View style={this.state.styles.container}>
       <TextInput secureTextEntry={true}
         style={this.state.styles.inputField}
         placeholder='Enter a password - minimum length 6'
         onChangeText={(password) => {
           this.setState({password});
           if(password.length > 5){
             this.setState({enterEnabled: true});
           }
           }
       }/>
       <TextInput secureTextEntry={true}
         style={this.state.styles.inputField}
         editable={this.state.enterEnabled}
         placeholder='Enter password again'
         onChangeText={(password) => {
             if(password === this.state.password){
             this.setState({disabledButton: false});
           }
           }
       }/>
        <Button
         onPress={() =>  createUser(this)}
         title="Register"
         color="green"
         disabled={this.state.disabledButton}
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
          styles: component.state.styles});
    }
 });
}

export default RegisterPassword;
