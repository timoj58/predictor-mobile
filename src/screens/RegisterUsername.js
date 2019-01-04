import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet,View,TextInput, Button } from 'react-native';

import {isUsernameOnFile} from "../api/AuthService";

 class RegisterUsername extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      username: '',
      styles: props.navigation.state.params.styles,
      disabledButton: true
    };
  }

  render() {
    return (
      <View style={this.state.styles.container}>
      <TextInput
         style={this.state.styles.inputField}
         placeholder='Button will go green if username free'
         onChangeText={(username) => checkUsername(this, username)}
         value={this.state.username}/>
        <Button
         onPress={() => this.props.navigation.navigate('RegisterPassword',
         {username: this.state.username,
          styles: this.state.styles})}
         title="Next"
         disabled={this.state.disabledButton}
         color="green"
         accessibilityLabel="Next"
         />

    </View>
    );
  }
}

function checkUsername(component, username) {
  if(username !== "" && username.length > 6){
    isUsernameOnFile(username).then((value) => {
     component.setState({disabledButton: value})});
 } // end username null
 component.setState({username: username,disabledButton: true});
}


export default RegisterUsername;
