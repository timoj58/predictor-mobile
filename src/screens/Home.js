import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { Tile } from 'react-native-elements'
import {renderTile} from "../util/RenderUtils";


const type = 'FOOTBALL';

class Home extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     styles: props.navigation.state.params.styles,
     tiles: [
       {
         title: 'Now',
         screen: 'Events',
         icon: 'calendar-check-o',
         props: {
           token: props.navigation.state.params.token,
           styles: props.navigation.state.params.styles,
           today: true,
           country: null,
           competition: null,
           type: type
         }
       },
       {
         title: 'Betting',
         screen: 'Betting',
         icon: 'dollar',
         props: {
           token: props.navigation.state.params.token,
           styles: props.navigation.state.params.styles,
           type: type
         }
       },
       {
         title: 'Ratings',
         screen: 'GlobalRatingsHome',
         icon: 'bar-chart-o',
         props: {
           token: props.navigation.state.params.token,
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
        data={this.state.tiles}
        renderItem={this._renderTile}
        keyExtractor={(item, index) => index.toString()}
      />
      </View>
    );
  }
}


export default Home;
