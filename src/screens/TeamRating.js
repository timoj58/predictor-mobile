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
     teamRating: props.navigation.state.params.teamRating
};

}

_renderItem = ({item}) => (
  <Text>{item.type} - {item.success}/{item.total} {item.accuracy}%</Text>
);




  render() {
    return (
     <View style={styles.container}>
     <FlatList
        data={this.state.teamRating.accuracy}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index}
      />
    </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1be215',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  }
});

export default TeamRating;
