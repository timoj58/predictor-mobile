import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';


import { Dimensions, StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { Tile } from 'react-native-elements'
import {renderTile} from "../util/RenderUtils";

const type = 'FOOTBALL';
const adUnitID = 'ca-app-pub-3940256099942544/6300978111';
const adUnitRewardsID = 'ca-app-pub-3940256099942544/5224354917';

class Home extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     styles: props.navigation.state.params.styles,
     tilesLeft: [
       {
         title: 'Today',
         screen: 'Events',
         icon: 'calendar-check-o',
         props: {
           token: props.navigation.state.params.token,
           styles: props.navigation.state.params.styles,
           today: true,
           country: null,
           competition: null,
           type: type,
           adUnitID: adUnitID,
           adUnitRewardsID: adUnitRewardsID,
           label: 'Todays Events'
         }
       },
       {
         title: 'Betting',
         screen: 'Betting',
         icon: 'dollar',
         props: {
           token: props.navigation.state.params.token,
           styles: props.navigation.state.params.styles,
           type: type,
           adUnitID: adUnitID,
           adUnitRewardsID: adUnitRewardsID
         }
       }
     ],
     tilesRight: [
       {
         title: 'Ratings',
         screen: 'GlobalRatingsHome',
         icon: 'bar-chart-o',
         props: {
           token: props.navigation.state.params.token,
           type: type,
           adUnitID: adUnitID,
           adUnitRewardsID: adUnitRewardsID,
           styles: props.navigation.state.params.styles
         }
       },
       {
         title: 'Leagues',
         screen: 'Countries',
         icon: 'globe',
         props: {
           token: props.navigation.state.params.token,
           styles: props.navigation.state.params.styles,
           adUnitID: adUnitID,
           adUnitRewardsID: adUnitRewardsID,
           type: type
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
              data={this.state.tilesLeft.concat(this.state.tilesRight)}
              renderItem={this._renderTile}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
    );
  }
}


export default Home;
