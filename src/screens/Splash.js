import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import * as Progress from 'react-native-progress';
import { Dimensions } from 'react-native';
import { StyleSheet, Text, View, Button, Linking } from 'react-native';
import { ListItem, Tile} from 'react-native-elements';
import {isUsernameOnFile} from "../api/AuthService";
import {authenticate} from "../api/AuthService";
import {create} from "../api/AuthService";
import {SplashScreen } from 'expo';


const type = 'FOOTBALL';


class Splash extends React.Component {

  constructor(props) {
   super(props);

 this.state = {
  registered: false,
  username: Expo.Constants.installationId
 }

 checkUsername(this,Expo.Constants.installationId);

 SplashScreen.hide();
 //checkUsername(this, 'timmytime');
}

  render() {
    return (
    <View style={styles}>
      <Tile
             featured
          //   title={'Press to refresh'}
          //   titleStyle={styles.splashTitle}
             width={Dimensions.get('window').width}
             height={Dimensions.get('window').height-20}
             imageSrc={require('../screens/img/splash.png')}
            // icon={{ name: 'refresh', type: 'font-awesome', size: 150, color: 'blue' }}
             onPress={() => checkUsername(this, this.state.username)}

             />
        <Text style={styles.listItem} onPress={ ()=> Linking.openURL('https://s3.amazonaws.com/tabiiki-privacy-policy/privacy_policy.html') } >
         Privacy Policy
         </Text>
        </View>
  );
 }
}


function navigate(component){

  if(component.state.registered){
    console.log("logging in")
    login(component);
  }else{
    console.log("creating user")
    createUser(component);
  }

};


function checkUsername(component, username) {
    isUsernameOnFile(username)
    .then((value) =>  {
      if(value){
         login(component);
      }else{
        createUser(component);
      }
    });
}


function login(component) {
  authenticate(component.state.username, component.state.username)
  .then(token => {
    if(typeof token !== 'undefined'){
      console.log(token);
        component.props.navigation.navigate('Home', {
          token: token,
          type: type,
          styles: styles});
    }

  })
};

function createUser(component){
  create(component.state.username, component.state.username)
  .then(token =>  {
    if(token !== ""){
        component.props.navigation.navigate('Home', {
          token: token,
          type: type,
          styles: styles});
    }
 })
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#36454f',
    alignItems: 'stretch',
    justifyContent: 'center',
   },
   containerRow: {
     flex: 1,
     flexDirection: 'row',
     backgroundColor: '#36454f',
     alignItems: 'flex-start',
     justifyContent: 'flex-start',
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
  listItemSmall: {
   color: 'silver',
   fontSize: 15
 },
 listItemSmallRed: {
  color: 'orangered',
  fontSize: 15
},
listItemSmallGreen: {
 color: 'green',
 fontSize: 15
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
listItemAboveAverage: {
 color: 'silver',
 fontWeight: 'bold',
 backgroundColor: 'darkorange'
},
listItemBelowAverage: {
 color: 'silver',
 fontWeight: 'bold',
 backgroundColor: 'lightyellow'
},
  titleListItem: {
   color: 'grey',
   fontWeight: 'bold',
   fontSize: 30
 },
 titleListItemMedium: {
  color: 'grey',
  fontWeight: 'bold',
  fontSize: 25
},
 overlayItem: {
  color: 'black',
  fontWeight: 'bold',
  fontSize: 50,
  backgroundColor: 'grey'
},
splashTitle: {
 color: 'black',
 fontWeight: 'bold',
 fontSize: 25
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
