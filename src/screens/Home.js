import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button } from 'react-native';

class Home extends React.Component {
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
        onPress={() => this.props.navigation.navigate('Betting',
        {
          token: this.state.token
        })}
        title='Betting'
      />
      <Button
        onPress={() => this.props.navigation.navigate('GlobalRatings',
        {
          token: this.state.token,
          market: 'results'
        })}
        title='Global Ratings - Results'
      />
      <Button
        onPress={() => this.props.navigation.navigate('GlobalRatings',
        {
          token: this.state.token,
          market: 'goals'
        })}
        title='Global Ratings - Goals'
      />
      <Button
        onPress={() => this.props.navigation.navigate('Countries',
        {
          token: this.state.token
        })}
        title='Countries'
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

export default Home;
