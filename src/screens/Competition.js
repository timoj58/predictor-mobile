import React from 'react';

import {
  StackNavigator,
} from 'react-navigation';


import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { Icon } from 'react-native-elements'
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Events from './Events';
import PreviousFixtures from './PreviousFixtures';
import Accuracy from './Accuracy';

const TabNavigator = createBottomTabNavigator({
  Upcoming:  { screen: props => <Events {...props}today='false' />},
  Previous: PreviousFixtures,
  Accuracy: Accuracy
},
{
   defaultNavigationOptions: ({ navigation }) => ({
     tabBarIcon: ({ focused, horizontal, tintColor }) => {
       const { routeName } = navigation.state;
       if (routeName === 'Previous') {
         iconName = `calendar-check-o`;
         // Sometimes we want to add badges to some icons.
         // You can check the implementation below.
       } else if (routeName === 'Upcoming') {
         iconName = `calendar`;
       }else if (routeName === 'Accuracy') {
         iconName = `crosshairs`;
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

//export default Competition;
