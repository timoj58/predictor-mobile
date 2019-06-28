import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Progress from 'react-native-progress';
import { Dimensions } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { Tile } from 'react-native-elements'
import {renderTile} from "../util/RenderUtils";

class CompetitionRatingsHome extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     styles: props.navigation.state.params.styles,
     loading: true,
     competitions :'',
     tiles: [
       {
         title: 'Results',
         screen: 'CompetitionRatings',
         icon: 'trophy',
         props: {
           token: props.navigation.state.params.token,
           styles: props.navigation.state.params.styles,
           type: props.navigation.state.params.type,
           market: 'results',
           label: 'Results Rankings'
              }
       },
       {
         title: 'Goals',
         screen: 'CompetitionRatings',
         icon: 'soccer-ball-o',
         props: {
           token: props.navigation.state.params.token,
           styles: props.navigation.state.params.styles,
           type: props.navigation.state.params.type,
           market: 'goals',
           label: 'Goals (OVER / UNDER) Rankings'
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


export default CompetitionRatingsHome;
