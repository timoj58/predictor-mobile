import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements'

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
  <ListItem
    onPress={() => this.props.navigation.navigate('Matches',
    {  token: this.state.token,
       styles: this.state.styles,
       matches: item.data
    })}
    title={item.title}
    titleStyle={this.state.styles.listItem}
  />
);


  render() {
    return (
     <View style={this.state.styles.container}>
     <FlatList
        data={this.state.months}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      </View>
    );
  }
}

export default MatchMonths;
