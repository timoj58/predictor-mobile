import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button } from 'react-native';
import { ListItem } from 'react-native-elements'

export default class Splash extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ListItem
        onPress={() =>this.props.navigation.navigate('RegisterUsername',
        {
          styles: styles
        })}
         title="Register"
         titleStyle={styles.listItem}
         accessibilityLabel="Not got an account? Register now"
         />
         <ListItem
         onPress={() => this.props.navigation.navigate('LoginUsername',
         {
           styles: styles
        })}
          title="Login"
          titleStyle={styles.listItem}
          accessibilityLabel="Login to your account"
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#36454f',
    alignItems: 'stretch',
    justifyContent: 'center',
   },
   progressContainer: {
     flex: 1,
     backgroundColor: '#36454f',
     alignItems: 'center',
     justifyContent: 'center',
    },
   listItem: {
    color: 'white',
    fontWeight: 'bold'
  },
  ratingText: {
   color: 'grey',
   fontWeight: 'bold'
 },
  inputField: {
      height: 40,
      alignSelf: 'stretch',
      textAlign: "center",
      borderColor:  'gray',
      borderWidth: 1,
      color: "black",
      backgroundColor: 'white'
  }
});
