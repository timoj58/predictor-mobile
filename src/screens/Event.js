import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList, ScrollView } from 'react-native';
import * as Progress from 'react-native-progress';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import {predictions} from "../api/DataService";
import {globalRating} from "../api/DataService";
import {previousMeetings} from "../api/DataService";
import { ListItem, Icon } from 'react-native-elements';
import {getBetRatingColor} from "../util/RenderUtils";
import {predictedGoals} from "../util/GoalsUtils";
import PreviousMeetings from './PreviousMeetings';
import EventRating from './EventRating';


class Event extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
      token: props.navigation.state.params.token,
      event: props.navigation.state.params.event,
      styles: props.navigation.state.params.styles,
      market: props.navigation.state.params.market,
      betType: props.navigation.state.params.betType,
      loading: true,
      loadingPreviousMeetings: true,
      goalsRating: 0,
      resultsRating: 0,
      predictions: '',
      previousMeetings: '',
      homeResultsRating: 0,
      homeResultRatingSubTitle: '',
      awayResultsRating: 0,
      awayResultRatingSubTitle: ''
    };


    setDataSource(this);
  //  setDataSourcePreviousMeetings(this);
}


}


 const TabNavigator = createBottomTabNavigator({
   Match: { screen: props => <EventRating {...props}  market="results" />},
   Goals: { screen: props => <EventRating {...props}  market="goals" />},
   //Score: EventRating,
   Previous:  PreviousMeetings
  },
 {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === 'Previous') {
          iconName = `calendar-check-o`;
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
        } else if (routeName === 'Match') {
          iconName = `trophy`;
        }else if (routeName === 'Goals') {
          iconName = `soccer-ball-o`;
        }/*else if (routeName === 'Score') {
          iconName = `cog`;
        }/*else if (routeName === 'Ratings') {
          iconName = `bar-chart-o`;
        }else if (routeName === 'Countries') {
          iconName = `globe`;
        }*/

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



//export default Event;
