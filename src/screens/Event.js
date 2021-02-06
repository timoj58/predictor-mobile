import React from 'react';

import {
  StackNavigator,
} from 'react-navigation';


import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import EventRating from './EventRating';
import PlayerEvents from './PlayerEvents';
import { Icon } from 'react-native-elements'


import {styles} from './Styles';


const TabNavigator = createBottomTabNavigator({
  EventRating:  { screen: props => <EventRating {...props} />},
  PlayerEvents: { screen: props => <PlayerEvents {...props} />}
},
{
   defaultNavigationOptions: ({ navigation }) => ({
     tabBarIcon: ({ focused, horizontal, tintColor }) => {
       const { routeName } = navigation.state;
       if (routeName === 'EventRating') {
         iconName = `trophy`;
         // Sometimes we want to add badges to some icons.
         // You can check the implementation below.
       } else if (routeName === 'PlayerEvents') {
         iconName = `user`;
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
