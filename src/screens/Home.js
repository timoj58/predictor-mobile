import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { Dimensions, StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { Tile } from 'react-native-elements'
import {renderTile} from "../util/RenderUtils";

const type = 'FOOTBALL';

class Home extends React.Component {
  constructor(props) {
   super(props);

   var start = new Date().getTime();

   this.state = {
     token: props.navigation.state.params.token,
     styles: props.navigation.state.params.styles,
     start: start,
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
           start: start,
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
           start: start
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
           styles: props.navigation.state.params.styles,
           type: type,
           start: start
         }
       },
       {
         title: 'Leagues',
         screen: 'Countries',
         icon: 'globe',
         props: {
           token: props.navigation.state.params.token,
           styles: props.navigation.state.params.styles,
           type: type,
           start: start
         }
       }
     ]
    };

}

_renderTile = ({item}) => (
    //renderTile(this, item, 75, Dimensions.get('window').width/2, Dimensions.get('window').height/3)
    renderTile(this, item)
);

/*
<Text style={
  {
    height: Dimensions.get('window').height/4,
    width: Dimensions.get('window').width
}} h1>Placeholder - do something? </Text>
{this._renderTile(this.state.tilesLeft[0])}
{this._renderTile(this.state.tilesLeft[1])}
{this._renderTile(this.state.tilesRight[0])}
{this._renderTile(this.state.tilesRight[1])}

*/

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
