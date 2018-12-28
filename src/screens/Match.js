import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';


class Match extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     styles: props.navigation.state.params.styles,
     match: props.navigation.state.params.match};
}

_renderItem = ({item}) => (
  <Text>{item.name}  {item.duration}</Text>
);



  render() {
    return (
     <View style={this.state.tyles.container}>
     <Text>{this.state.match.headline}</Text>
     <Text>{this.state.match.date}</Text>
     <Text>Starting</Text>
     <FlatList
       data={this.state.match.starting}
       renderItem={this._renderItem}
       keyExtractor={(item, index) => index}
     />
     <Text>Subs</Text>
     <FlatList
       data={this.state.match.subs}
       renderItem={this._renderItem}
       keyExtractor={(item, index) => index}
     />
      </View>
    );
  }
}

export default Match;
