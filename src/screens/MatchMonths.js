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
     styles: props.navigation.state.params.styles,
     months: props.navigation.state.params.months
    };

}


_renderItem = ({item}) => (
  <Button
    onPress={() => this.props.navigation.navigate('Matches',
    {  token: this.state.token,
       styles: this.state.styles,
       matches: item.data
    })}
    title={item.title}
  />
);


  render() {
    return (
     <View style={this.state.styles.container}>
     <FlatList
        data={this.state.months}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index}
      />
      </View>
    );
  }
}

export default MatchMonths;
