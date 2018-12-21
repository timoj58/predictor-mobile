import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button } from 'react-native';

class SelectedBetsHome extends React.Component {
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
        onPress={() => this.props.navigation.navigate('SelectedResultsBets',
        {
          token: this.state.token,
          market: "results"
        })}
        title='Results'
      />
      <Button
        onPress={() => this.props.navigation.navigate('SelectedGoalsBets',
        {
          token: this.state.token,
          market: "goals"
        })}
        title='Goals'
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

export default SelectedBetsHome;
