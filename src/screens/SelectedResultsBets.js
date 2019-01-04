import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { Tile } from 'react-native-elements'
import {renderTile} from "../util/RenderUtils";

class SelectedResultsBets extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     market: props.navigation.state.params.market,
     styles: props.navigation.state.params.styles,
     type: props.navigation.state.params.type,
     tiles: [
       {
        title: 'Home Wins',
        screen: 'SelectedBets',
        icon: 'home',
        props: {
          token: props.navigation.state.params.token,
          market: props.navigation.state.params.market,
          styles: props.navigation.state.params.styles,
          type: props.navigation.state.params.type,
          start: props.navigation.state.params.start,
          event: 'homeWin',
          label: 'Selected Home Wins'
       }
      },
      {
       title: 'Away Wins',
       screen: 'SelectedBets',
       icon: 'home',
       props: {
         token: props.navigation.state.params.token,
         market: props.navigation.state.params.market,
         styles: props.navigation.state.params.styles,
         type: props.navigation.state.params.type,
         start: props.navigation.state.params.start,
         event: 'awayWin',
         label: 'Selected Away Wins'
     }
     },
     {
      title: 'Draws',
      screen: 'SelectedBets',
      icon: 'handshake-o',
      props: {
        token: props.navigation.state.params.token,
        market: props.navigation.state.params.market,
        styles: props.navigation.state.params.styles,
        type: props.navigation.state.params.type,
        start: props.navigation.state.params.start,
        event: 'draw',
        label: 'Selected Draws'
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


export default SelectedResultsBets;
