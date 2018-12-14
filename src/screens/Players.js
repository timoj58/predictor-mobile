import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import {players} from "../api/DataService";
import * as Progress from 'react-native-progress';


class Players extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     team: props.navigation.state.params.teamId,
     loading: true,
     players: ''
   };

   setDataSource(this);
}


_renderItem = ({item}) => (
  <Button
   id={item.id}
    onPress={() => this.props.navigation.navigate('Player',
    {
      token: this.state.token,
      playerId: item.id
    })}
    title={item.label}
  />
);


  render() {
    return (
     <View style={styles.container}>
     {this.state.loading && <Progress.Circle size={50} indeterminate={true} />}
     {!this.state.loading && <FlatList
        data={this.state.players}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index}
      />}
      </View>
    );
  }
}

function setDataSource(component){
  players(component.state.team, component.state.token)
  .then( data => component.setState({players : data, loading: false}));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1be215',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  }
});

export default Players;
