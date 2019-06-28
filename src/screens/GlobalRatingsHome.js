import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { Icon, Tile } from 'react-native-elements'
import {renderTile} from "../util/RenderUtils";
import {expires} from "../util/TokenUtils";
import {refresh} from "../api/AuthService";
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import GlobalRatingsRanked from './GlobalRatingsRanked';
import CompetitionRatings from './CompetitionRatings';


class GlobalRatingsHome extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     styles: props.navigation.state.params.styles,
     tiles: [
       {
         title: 'Leagues',
         screen: 'CompetitionRatingsHome',
         icon: 'globe',
         props: {
           token: props.navigation.state.params.token,
           styles: props.navigation.state.params.styles,
           type: props.navigation.state.params.type
         }
       },
       {
         title: 'Results',
         screen: 'GlobalRatingsRanked',
         icon: 'trophy',
         props: {
           token: props.navigation.state.params.token,
           styles: props.navigation.state.params.styles,
           type: props.navigation.state.params.type,
           market: 'results',
           label: 'Results Rankings'
         }
       },
       {
         title: 'Goals',
         screen: 'GlobalRatingsRanked',
         icon: 'soccer-ball-o',
         props: {
           token: props.navigation.state.params.token,
           styles: props.navigation.state.params.styles,
           type: props.navigation.state.params.type,
           market: 'goals',
           label: 'Goals (OVER / UNDER) Rankings'
         }
       }
     ]
    };


}

_renderTile = ({item}) => (
  renderTile(this, item));


  render() {
    return (
      <View style={this.state.styles.container}>
      <FlatList
        data={this.state.tiles}
        renderItem={this._renderTile}
        keyExtractor={(item, index) => index.toString()}
      />
      </View>
    );
  }
}


const TabNavigator = createBottomTabNavigator({
  Leagues: CompetitionRatings,
  Results:  { screen: props => <GlobalRatingsRanked {...props}  market="results" />},
  Goals:  { screen: props => <GlobalRatingsRanked {...props}  market="goals" />}
 },
 {
   defaultNavigationOptions: ({ navigation }) => ({
     tabBarIcon: ({ focused, horizontal, tintColor }) => {
       const { routeName } = navigation.state;
       if (routeName === 'Events') {
         iconName = `calendar-check-o`;
         // Sometimes we want to add badges to some icons.
         // You can check the implementation below.
       } else if (routeName === 'Leagues') {
         iconName = `globe`;
       }else if (routeName === 'Results') {
         iconName = `trophy`;
       }else if (routeName === 'Goals') {
         iconName = `soccer-ball-o`;
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


//export default GlobalRatingsHome;
