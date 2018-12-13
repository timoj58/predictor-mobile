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
      password: ''};
  }

  render() {
    return (
      <View style={styles.container}>
       <TextInput secureTextEntry={true}
        style={{
          height: 40,
          alignSelf: 'stretch',
          borderColor: 'gray',
          borderWidth: 1}}
        onChangeText={(password) => this.setState({password})}/>
        <Button
        onPress={() =>  login(this)}
         title="Login"
         color="#841584"
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
        component.props.navigation.navigate('Home', {token: token});
    }

  });

 } // end username null


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1be215',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default LoginPassword;
