import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { Tile } from 'react-native-elements'
import {renderTile} from "../util/RenderUtils";
import {expires} from "../util/TokenUtils";
import {refresh} from "../api/AuthService";



class GlobalRatingsHome extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     styles: props.navigation.state.params.styles,
     tiles: [
       {
         title: 'Leagues',
         screen: 'CompetitionRatings',
         icon: 'globe',
         props: {
           token: props.navigation.state.params.token,
           styles: props.navigation.state.params.styles
         }
       },
       {
         title: 'Results',
         screen: 'GlobalRatingsRanked',
         icon: 'trophy',
         props: {
           token: props.navigation.state.params.token,
           styles: props.navigation.state.params.styles,
           market: 'results',
           label: 'Results Rankings'
         }
       },
       {
         title: 'Goals',
         screen: 'GlobalRatingsRanked',
         icon: 'soccer-ball-o',
         props: {
           token: props.navigation.state.params.token,
           styles: props.navigation.state.params.styles,
           market: 'goals',
           label: 'Goals (OVER / UNDER) Rankings'
         }
       }
     ]
    };

    refreshToken(this);

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

async function refreshToken(component){
  if(expires(component.state.start)){
    refresh(component.state.token).then(token => component.setState({token: token}) )
  }
}




export default GlobalRatingsHome;
