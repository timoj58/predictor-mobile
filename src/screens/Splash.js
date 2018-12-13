import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button } from 'react-native';

export default class Splash extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
        onPress={() =>this.props.navigation.navigate('RegisterUsername')}
         title="Register"
         color="#841584"
         accessibilityLabel="Not got an account? Register now"
         />
         <Button
         onPress={() => this.props.navigation.navigate('LoginUsername')}
          title="Login"
          color="#841584"
          accessibilityLabel="Login to your account"
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1be215',
    alignItems: 'stretch',
    justifyContent: 'center',
  }
});
