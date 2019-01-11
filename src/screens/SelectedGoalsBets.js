import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { Tile } from 'react-native-elements'
import {renderTile} from "../util/RenderUtils";

class SelectedGoalsBets extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     market: props.navigation.state.params.market,
     styles: props.navigation.state.params.styles,
     type: props.navigation.state.params.type,
     tiles: [
       {
        title: 'Over 2.5 Goals',
        screen: 'SelectedBets',
        icon: 'plus-square-o',
        props: {
          token: props.navigation.state.params.token,
          market: props.navigation.state.params.market,
          styles: props.navigation.state.params.styles,
          type: props.navigation.state.params.type,
          start: props.navigation.state.params.start,
          event: '2.5',
          label: 'Selected OVER 2.5 Goals'
       }
      },
      {
       title: 'Under 2.5 Goals',
       screen: 'SelectedBets',
       icon: 'minus-square-o',
       props: {
         token: props.navigation.state.params.token,
         market: props.navigation.state.params.market,
         styles: props.navigation.state.params.styles,
         type: props.navigation.state.params.type,
         start: props.navigation.state.params.start,
         event: '-2.5',
         label: 'Selected UNDER 2.5 Goals'
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


export default SelectedGoalsBets;
