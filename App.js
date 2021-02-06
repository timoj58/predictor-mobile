
import React from 'react';
import AppNavigator from './AppNavigator';
import * as SplashScreen from 'expo-splash-screen'

export default class App extends React.Component {
  constructor(props) {
   super(props);
   SplashScreen.preventAutoHide();
 }

  render() {
    return (
      <AppNavigator/>
    );
  }
}

/*import React from 'react';
//import AppNavigator from './AppNavigator';
import {SplashScreen } from 'expo';
import { NavigationContainer, createNavigatorFactory} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import Splash from "./src/screens/Splash";
import Home from "./src/screens/Home";
import Competition from "./src/screens/Competition";
import EventRating from "./src/screens/EventRating";
import Events from "./src/screens/Events";
import Accuracy from "./src/screens/Accuracy";
import Countries from "./src/screens/Countries";
import SelectedBets from "./src/screens/SelectedBets";
import PreviousFixtures from "./src/screens/PreviousFixtures";

const Stack = createStackNavigator();


export default class App extends React.Component {
  constructor(props) {
   super(props);
   SplashScreen.preventAutoHide();
 }

  render() {
    return (
      <NavigationContainer>
       <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Countries" component={Countries} />
      //  <Stack.Screen name="Competition" component={Competition} />
        <Stack.Screen name="Events" component={Events} />
        <Stack.Screen name="EventRating" component={EventRating} />
        <Stack.Screen name="PreviousFixtures" component={PreviousFixtures} />
        <Stack.Screen name="SelectedBets" component={SelectedBets} />
        <Stack.Screen name="Accuracy" component={Accuracy} />
      </Stack.Navigator>
    </NavigationContainer>
    );
  }
}
*/
