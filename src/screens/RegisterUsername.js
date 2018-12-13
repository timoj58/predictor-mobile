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
      disabledButton: true
    };
  }

  render() {
    return (
      <View style={styles.container}>
      <TextInput
       style={{
         height: 40,
         alignSelf: 'stretch',
         borderColor:  'gray',
         borderWidth: 1}}
         onChangeText={(username) => checkUsername(this, username)}
         value={this.state.username}/>
        <Button
        onPress={() => this.props.navigation.navigate('RegisterPassword', {username: this.state.username})}
         title="Next"
         disabled={this.state.disabledButton}
         color="#841584"
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
     component.setState({username: username,disabledButton: value})});
 } // end username null
 component.setState({username: username,disabledButton: true});
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1be215',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default RegisterUsername;
