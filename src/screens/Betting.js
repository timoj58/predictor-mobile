import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { Icon, Tile } from 'react-native-elements'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import SelectedBets from './SelectedBets';
import SelectedBetHistoryYears from './SelectedBetHistoryYears';


const TabNavigator = createBottomTabNavigator({
  Home:  { screen: props => <SelectedBets {...props} event="homeWin" market="results" />},
  Away:  { screen: props => <SelectedBets {...props} event="awayWin" market="results" />},
  Draw:  { screen: props => <SelectedBets {...props} event="draw" market="results" />},
  Over:  { screen: props => <SelectedBets {...props} event="2.5" market="goals" />},
  Under:  { screen: props => <SelectedBets {...props} event="-2.5" market="goals" />},
  History: {screen: SelectedBetHistoryYears}
 },
 {
   defaultNavigationOptions: ({ navigation }) => ({
     tabBarIcon: ({ focused, horizontal, tintColor }) => {
       const { routeName } = navigation.state;
       if (routeName === 'Events') {
         iconName = `calendar-check-o`;
         // Sometimes we want to add badges to some icons.
         // You can check the implementation below.
       } else if (routeName === 'Home') {
         iconName = `home`;
       }else if (routeName === 'Away') {
         iconName = `home`;
       }else if (routeName === 'Draw') {
         iconName = `handshake-o`;
       }else if (routeName === 'Over') {
         iconName = `soccer-ball-o`;
       }else if (routeName === 'Under') {
         iconName = `soccer-ball-o`;
       }else if (routeName === 'History') {
         iconName = `history`;
       }

       // You can return any component that you like here!
      // return {{ name: iconName, type: 'font-awesome', size: iconSize, color: 'silver' }};

       return <Icon name={iconName} type={'font-awesome'} size={25} color={tintColor} />;
     },
   }),
   tabBarOptions: {
     activeTintColor: 'tomato',
     inactiveTintColor: '#36454f',
     style: {
   backgroundColor: 'silver',
   height: 50
     },
   },
 });


export default createAppContainer(TabNavigator);



//export default Betting;
