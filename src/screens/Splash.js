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
   tileContainer: {
     flex: 1,
     flexDirection: 'row',
     flexWrap: 'wrap',
     backgroundColor: '#36454f',
     alignItems: 'stretch',
     justifyContent: 'center',
    },
   scrollViewContainer: {
     flex: 1,
     backgroundColor: '#36454f'
  },
   progressContainer: {
     flex: 1,
     backgroundColor: '#36454f',
     alignItems: 'center',
     justifyContent: 'center',
    },
   listItem: {
    color: 'silver',
    fontWeight: 'bold'
  },
  listItemSuccess: {
   color: 'silver',
   fontWeight: 'bold',
   backgroundColor: 'green'
 },
 listItemFail: {
  color: 'silver',
  fontWeight: 'bold',
  backgroundColor: 'red'
},
  titleListItem: {
   color: 'black',
   fontWeight: 'bold',
   fontSize: 30
 },
  ratingText: {
   color: 'grey',
   fontWeight: 'bold'
 },
 ratingTextPlus: {
  color: 'green',
  fontWeight: 'bold'
},
ratingTextLMinus: {
 color: 'red',
 fontWeight: 'bold'
},
  inputField: {
      height: 40,
      alignSelf: 'stretch',
      textAlign: "center",
      borderColor:  'gray',
      fontSize: 20,
      borderWidth: 1,
      color: "black",
      backgroundColor: 'white'
  }
});
