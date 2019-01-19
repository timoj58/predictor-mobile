import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { Tile } from 'react-native-elements'
import {renderTile} from "../util/RenderUtils";
import {expires} from "../util/TokenUtils";
import {refresh} from "../api/AuthService";


class Betting extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     type: props.navigation.state.params.type,
     styles: props.navigation.state.params.styles,
     tiles: [
       {
         title: 'Selected Bets',
         screen: 'SelectedBetsHome',
         icon: 'sticky-note',
         props: {
           token: props.navigation.state.params.token,
           type: props.navigation.state.params.type,
           styles: props.navigation.state.params.styles,
           start: props.navigation.state.params.start,
           adUnitID: props.navigation.state.params.adUnitID,
           adUnitRewardsID: props.navigation.state.params.adUnitRewardsID
         }
       },
       {
         title: 'History',
         screen: 'SelectedBetHistory',
         icon: 'history',
         props: {
           token: props.navigation.state.params.token,
           type: props.navigation.state.params.type,
           styles: props.navigation.state.params.styles,
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


export default Betting;
