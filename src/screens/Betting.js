import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { Tile } from 'react-native-elements'
import {renderTile} from "../util/RenderUtils";


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
         imageSrc: require('./img/bet-slip.png'),
         props: {
           token: props.navigation.state.params.token,
           type: props.navigation.state.params.type,
           styles: props.navigation.state.params.styles
         }
       },
       {
         title: 'History',
         screen: 'SelectedBetHistory',
         imageSrc: require('./img/history.jpg'),
         props: {
           token: props.navigation.state.params.token,
           type: props.navigation.state.params.type,
           styles: props.navigation.state.params.styles
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
        keyExtractor={(item, index) => index}
      />
      </View>
    );
  }
}


export default Betting;
