import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

class Matches extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     matches: props.navigation.state.params.matches
    };

}


_renderItem = ({item}) => (
  <Button
    onPress={() => this.props.navigation.navigate('Match',
    {  token: this.state.token,
       match: item
    })}
    title={item.headline}
  />
);


  render() {
    return (
     <View style={styles.container}>
     <FlatList
        data={this.state.matches}
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
    justifyContent: 'center',
  }
});

export default Matches;
