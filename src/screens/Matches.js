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
     styles: props.navigation.state.params.styles,
     matches: props.navigation.state.params.matches
    };

}


_renderItem = ({item}) => (
  <Button
    onPress={() => this.props.navigation.navigate('Match',
    {  token: this.state.token,
       styles: this.state.styles,
       match: item
    })}
    title={item.headline}
  />
);


  render() {
    return (
     <View style={this.state.styles.container}>
     <FlatList
        data={this.state.matches}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index}
      />
      </View>
    );
  }
}


export default Matches;
