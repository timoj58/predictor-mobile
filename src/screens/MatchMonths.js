import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

class MatchMonths extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     months: props.navigation.state.params.months
    };

}


_renderItem = ({item}) => (
  <Button
    onPress={() => this.props.navigation.navigate('Matches',
    {  token: this.state.token,
       matches: item.data
    })}
    title={item.title}
  />
);


  render() {
    return (
     <View style={styles.container}>
     <FlatList
        data={this.state.months}
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

export default MatchMonths;
