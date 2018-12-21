import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button } from 'react-native';

class Betting extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token
    };

}


  render() {
    return (
      <View style={styles.container}>
      <Button
        onPress={() => this.props.navigation.navigate('SelectedBetsHome',
        {
          token: this.state.token
        })}
        title='Selected Bets'
      />
      <Button
        onPress={() => this.props.navigation.navigate('SelectedBetHistory',
        {
          token: this.state.token
        })}
        title='Selected Bet History'
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

export default Betting;
