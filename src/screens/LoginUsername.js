import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet,View,TextInput, Button } from 'react-native';
import {isUsernameOnFile} from "../api/AuthService";

 class LoginUsername extends React.Component {
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
       onChangeText={(username) => checkUsername(this, username)}/>
        <Button
        onPress={() => this.props.navigation.navigate('LoginPassword',
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
    console.log(value);
    component.setState({username: username, disabledButton: !value})
  });
 } // end username null
}


export default LoginUsername;
