import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { Tile } from 'react-native-elements'
import {renderTile} from "../util/RenderUtils";



class GlobalRatingsHome extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     styles: props.navigation.state.params.styles,
     tiles: [
       {
         title: 'Results',
         screen: 'GlobalRatings',
         icon: 'trophy',
         props: {
           token: props.navigation.state.params.token,
           styles: props.navigation.state.params.styles,
           market: 'results'
         }
       },
       {
         title: 'Goals',
         screen: 'GlobalRatings',
         icon: 'soccer-ball-o',
         props: {
           token: props.navigation.state.params.token,
           styles: props.navigation.state.params.styles,
           market: 'goals'
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
