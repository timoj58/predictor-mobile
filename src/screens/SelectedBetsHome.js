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
         imageSrc: require('./img/winning.jpg'),
         props: {
           token: props.navigation.state.params.token,
           styles: props.navigation.state.params.styles,
           type: props.navigation.state.params.type,
           market: 'results'
         }
       },
       {
         title: 'Goals',
         screen: 'SelectedGoalsBets',
         imageSrc: require('./img/goal.jpg'),
         props: {
           token: props.navigation.state.params.token,
           styles: props.navigation.state.params.styles,
           type: props.navigation.state.params.type,
           market: 'goals'
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


export default SelectedBetsHome;
