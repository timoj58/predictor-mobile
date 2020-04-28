import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import * as Progress from 'react-native-progress';
import { Dimensions } from 'react-native';
import { StyleSheet, Text, View, Button, Linking } from 'react-native';
import { ListItem, Tile} from 'react-native-elements';
import {SplashScreen } from 'expo';
import {styles} from './Styles';


class Splash extends React.Component {

  constructor(props) {
   super(props);

 SplashScreen.hide();

 login(this);
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
             onPress={() => login(this)}

             />
        <Text style={styles.listItem} onPress={ ()=> Linking.openURL('https://s3.amazonaws.com/tabiiki-privacy-policy/privacy_policy.html') } >
         Privacy Policy
         </Text>
        </View>
  );
 }
}



function login(component) {
        component.props.navigation.navigate('Home', {});
};



export default Splash;
