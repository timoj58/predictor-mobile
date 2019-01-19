import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import * as Progress from 'react-native-progress';
import { Dimensions } from 'react-native';
import { StyleSheet, Text, View, Button } from 'react-native';
import { ListItem} from 'react-native-elements';
import {isUsernameOnFile} from "../api/AuthService";
import {authenticate} from "../api/AuthService";
import {create} from "../api/AuthService";


class Splash extends React.Component {

  constructor(props) {
   super(props);

 this.state = {
  registered: false,
  username: Expo.Constants.installationId
 }

 checkUsername(this,Expo.Constants.installationId);
 //checkUsername(this, 'timmytime');
}

  render() {
    return (
      <View style={styles.container}>
            <ListItem
             onPress={() => navigate(this)}
              title={getTitle(this.state.registered)}
              titleStyle={styles.listItem}
              />
    </View>
      );
  }
}

function navigate(component){
  if (component.state.registered){
    return component.props.navigation.navigate('LoginPassword',
    {
      styles: styles,
      username: component.state.username
   });
  }
  return component.props.navigation.navigate('RegisterPassword',
  {
    styles: styles,
    username: component.state.username
 });
}


function getTitle(registered){
  if(registered){
    return "Welcome Back";
  }
  return "Get Started";
}

function checkUsername(component, username) {
    isUsernameOnFile(username)
    .then((value) =>  component.setState({registered: value}));
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
 overlayItem: {
  color: 'black',
  fontWeight: 'bold',
  fontSize: 50,
  backgroundColor: 'grey'
},
overlayItemSuccess: {
 color: 'black',
 fontWeight: 'bold',
 fontSize: 50,
 backgroundColor: 'grey'
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


export default Splash;
