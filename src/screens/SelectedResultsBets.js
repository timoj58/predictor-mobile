import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button } from 'react-native';

class SelectedResultsBets extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     market: props.navigation.state.params.market
    };

}


  render() {
    return (
      <View style={styles.container}>
      <Button
        onPress={() => this.props.navigation.navigate('SelectedBets',
        {
          token: this.state.token,
          market: this.state.market,
          event: 'homeWin'
        })}
        title='Home Wins'
      />
      <Button
        onPress={() => this.props.navigation.navigate('SelectedBets',
        {
          token: this.state.token,
          market: this.state.market,
          event: 'awayWin'
        })}
        title='Away Wins'
      />
      <Button
        onPress={() => this.props.navigation.navigate('SelectedBets',
        {
          token: this.state.token,
          market: this.state.market,
          event: 'draw'
        })}
        title='Draws'
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

export default SelectedResultsBets;
