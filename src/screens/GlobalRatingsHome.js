import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { Tile } from 'react-native-elements'
import {renderTile} from "../util/RenderUtils";
import {expires} from "../util/TokenUtils";
import {refresh} from "../api/AuthService";



class GlobalRatingsHome extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     styles: props.navigation.state.params.styles,
     tiles: [
       {
         title: 'Leagues',
         screen: 'CompetitionRatings',
         icon: 'globe',
         props: {
           token: props.navigation.state.params.token,
           styles: props.navigation.state.params.styles,
           type: props.navigation.state.params.type,
           adUnitID: props.navigation.state.params.adUnitID,
           adUnitRewardsID: props.navigation.state.params.adUnitRewardsID
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
           label: 'Results Rankings',
           adUnitID: props.navigation.state.params.adUnitID,
           adUnitRewardsID: props.navigation.state.params.adUnitRewardsID
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
           label: 'Goals (OVER / UNDER) Rankings',
           adUnitID: props.navigation.state.params.adUnitID,
           adUnitRewardsID: props.navigation.state.params.adUnitRewardsID
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


export default GlobalRatingsHome;
