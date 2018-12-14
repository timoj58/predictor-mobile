import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Progress from 'react-native-progress';

import {player} from "../api/DataService";


class Player extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
      token: props.navigation.state.params.token,
      playerId: props.navigation.state.params.playerId,
      loading: true,
      player: ''
    };

    setDataSource(this);
}

_renderItem = ({item}) => (
  <Text> {item} </Text>
);


  render() {
    return (
     <View style={styles.container}>
     {this.state.loading && <Progress.Circle size={50} indeterminate={true} />}
     {!this.state.loading && <Text>{this.state.player.player.label}</Text>}
     {!this.state.loading && <Text>Yellow Card</Text>}
     {!this.state.loading && <FlatList
       data={this.state.player.stats["Yellow Card"]}
       renderItem={this._renderItem}
       keyExtractor={(item, index) => index}
     />}
      </View>
    );
  }
}

function setDataSource(component){
  player(component.state.playerId, component.state.token)
  .then( data => component.setState({player : data, loading: false}));
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1be215',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  }
});

export default Player;
