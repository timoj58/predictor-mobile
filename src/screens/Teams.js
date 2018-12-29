import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements'
import {teams} from "../api/DataService";


class Teams extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     type: props.navigation.state.params.type,
     country: props.navigation.state.params.country,
     styles: props.navigation.state.params.styles,
    competition: props.navigation.state.params.competition,
     teams: ''
   };

   setDataSource(this);
}


_renderItem = ({item}) => (
  <ListItem
   id={item.id}
    onPress={() => this.props.navigation.navigate('Team',
    {
      token: this.state.token,
      styles: this.state.styles,
      id: item.id
    })}
    title={item.label}
    titleStyle={this.state.styles.listItem}
  />
);


  render() {
    return (
     <View style={this.state.styles.container}>
     <FlatList
        data={this.state.teams}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      </View>
    );
  }
}

function setDataSource(component){
  teams(component.state.type, component.state.country, component.state.competition, component.state.token)
  .then( data => component.setState({teams : data}));
}

export default Teams;
