import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements'


class SelectedBetHistory extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     type: props.navigation.state.params.type,
     styles: props.navigation.state.params.styles,
     history: props.navigation.state.params.history
   };


}


_renderItem = ({item}) => (
  <ListItem
    onPress={() => this.props.navigation.navigate('BetHistoryBatch',
    {  token: this.state.token,
       styles: this.state.styles,
       label: item.batchStartDate +' - '+item.batchEndDate,
       batch: item
    })}
    title={item.batchStartDate + ' to '+item.batchEndDate}
    titleStyle={this.state.styles.listItem}
  />
);


  render() {
    return (
     <View style={this.state.styles.container}>
       <FlatList
        data={this.state.history}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      </View>
    );
  }
}


export default SelectedBetHistory;
