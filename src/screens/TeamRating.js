import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';


class TeamRating extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     styles: props.navigation.state.params.styles,
     teamRating: props.navigation.state.params.teamRating
};

}

_renderItem = ({item}) => (
  <Text>{item.type} - {item.success}/{item.total} {item.accuracy}%</Text>
);

_renderPredictionItem = ({item}) => (
    item.score > 0 &&
    <Text>{item.key} - {item.score}%</Text>
);

_renderEventItem = ({item}) => (
  <View style={this.state.styles.container}>
  <Text>{item.home} vs {item.away}</Text>
  <FlatList
     data={item.predictions.result}
     renderItem={this._renderPredictionItem}
     keyExtractor={(item, index) => index}
   />
  <Text>Outcome: {item.outcome.toString()} Result: {item.score}</Text>
  </View>

);


  render() {
    return (
     <View style={this.state.styles.container}>
     <FlatList
        data={this.state.teamRating.accuracy}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index}
      />
      <FlatList
         data={this.state.teamRating.predictionOutcomes}
         renderItem={this._renderEventItem}
         keyExtractor={(item, index) => index}
       />
    </View>
    );
  }
}


export default TeamRating;
