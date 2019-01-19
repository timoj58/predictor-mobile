import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { Tile } from 'react-native-elements'
import {renderTile} from "../util/RenderUtils";

class SelectedBetsHome extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     styles: props.navigation.state.params.styles,
     type: props.navigation.state.params.type,
     tiles: [
       {
         title: 'Results',
         screen: 'SelectedResultsBets',
         icon: 'trophy',
         props: {
           token: props.navigation.state.params.token,
           styles: props.navigation.state.params.styles,
           type: props.navigation.state.params.type,
           start: props.navigation.state.params.start,
           market: 'results',
           adUnitID: props.navigation.state.params.adUnitID,
           adUnitRewardsID: props.navigation.state.params.adUnitRewardsID
         }
       },
       {
         title: 'Goals',
         screen: 'SelectedGoalsBets',
         icon: 'soccer-ball-o',
         props: {
           token: props.navigation.state.params.token,
           styles: props.navigation.state.params.styles,
           type: props.navigation.state.params.type,
           start: props.navigation.state.params.start,
           market: 'goals',
           adUnitID: props.navigation.state.params.adUnitID,
           adUnitRewardsID: props.navigation.state.params.adUnitRewardsID
         }
       }

     ]
    };

}


_renderTile = ({item}) => (
   renderTile(this, item)
);



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

export default SelectedBetsHome;
