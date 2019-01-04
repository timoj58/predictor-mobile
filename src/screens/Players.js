import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import {players} from "../api/DataService";
import * as Progress from 'react-native-progress';
import { ListItem } from 'react-native-elements'
import { Dimensions } from 'react-native';


class Players extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     team: props.navigation.state.params.teamId,
     styles: props.navigation.state.params.styles,
     loading: true,
     players: ''
   };

   setDataSource(this);
}


_renderItem = ({item}) => (
  <ListItem
   id={item.id}
    onPress={() => this.props.navigation.navigate('Player',
    {
      token: this.state.token,
      styles: this.state.styles,
      playerId: item.id,
      label: item.label
    })}
    title={item.label}
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
          thickness={20} />
          </View>
      }
      {!this.state.loading && <FlatList
        data={this.state.players}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      }
      </View>
    );
  }
}

function setDataSource(component){
  players(component.state.team, component.state.token)
  .then( data => component.setState({players : data, loading: false}));
}

export default Players;
