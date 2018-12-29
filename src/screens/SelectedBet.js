import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList, ScrollView } from 'react-native';


class SelectedBet extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
      token: props.navigation.state.params.token,
      styles: props.navigation.state.params.styles,
      bet: props.navigation.state.params.bet
      };

      console.log(this.state.bet);

}


  render() {
    return (
     <ScrollView style={this.state.styles.scrollViewContainer}>
     <Text>placeholder ideally add past form, bet prices, and maybe more stuff like weather etc</Text>
  </ScrollView>
    );
  }
}


export default SelectedBet;
