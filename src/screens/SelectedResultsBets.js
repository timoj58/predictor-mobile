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
          event: 'homeWin'
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
         event: 'awayWin'
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
        event: 'draw'
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
