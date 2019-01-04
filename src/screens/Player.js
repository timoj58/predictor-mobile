import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Progress from 'react-native-progress';
import { Dimensions } from 'react-native';
import { ListItem } from 'react-native-elements';

import {player} from "../api/DataService";


class Player extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
      token: props.navigation.state.params.token,
      playerId: props.navigation.state.params.playerId,
      styles: props.navigation.state.params.styles,
      loading: true,
      player: ''
    };

    setDataSource(this);
}


_renderItem = ({item}) => (
  <ListItem
    title={item}
    hideChevron
    badge={{ value:  this.state.player.stats[item].length, textStyle: { color: 'green' }, containerStyle: { marginTop: -5 } }}
    titleStyle={this.state.styles.listItem}
  />
);



  render() {
    return (
     <View style={this.state.styles.container}>
     {this.state.loading &&
       <View style={this.state.styles.progressContainer}>
        <Progress.Circle
          size={Dimensions.get('window').width/2}
          indeterminate={true}
          color='black'
          thickness={50} />
          </View>
    }
     {!this.state.loading &&
      <View style={this.state.styles.container}>
       <ListItem
        title={'Appearances'}
        hideChevron
        badge={{ value:  this.state.player.playerAppearances.length, textStyle: { color: 'green' }, containerStyle: { marginTop: -5 } }}
        titleStyle={this.state.styles.listItem}
       />
       <FlatList
        data={Object.keys(this.state.player.stats)}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
     </View>
     }
      </View>
    );
  }
}

function setDataSource(component){
  player(component.state.playerId, component.state.token)
  .then( data =>   component.setState({player : data, loading: false}));
}


export default Player;
