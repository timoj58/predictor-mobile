import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements'
import {getBetRatingColor} from "../util/RenderUtils";

class SelectedBetHistoryMonths extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     type: props.navigation.state.params.type,
     styles: props.navigation.state.params.styles,
     history: props.navigation.state.params.history,
     title: props.navigation.state.params.title
    };

  }


_renderItem = ({item}) => (
  <ListItem
    onPress={() => this.props.navigation.navigate('SelectedBetHistory',
    {  token: this.state.token,
       styles: this.state.styles,
       title: this.state.title +' - '+item.month,
       history: item.betHistoryBatches
    })}
    title={item.month}
    titleStyle={this.state.styles.titleListItem}
    subtitle={
      <View style={this.state.styles.listItem}>
      <FlatList
        data={item.betHistoryAccuracies}
        renderItem={this._renderAccuracyItem}
        keyExtractor={(item, index) => index.toString()}
      />
      </View>
    }
  />
);


_renderAccuracyItem = ({item}) => (
  <ListItem
    title={item.market+' '+item.event }
    titleStyle={this.state.styles.listItem}
    containerStyle={{ borderBottomWidth: 0 }}
    badge={{ value: getAverage(item).toFixed(2), textStyle: { color: getBetRatingColor(getAverage(item)) }, containerStyle: { marginTop: -5 } }}
    hideChevron
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


function getAverage(item){
  return (item.success / item.total) * 100;
}


export default SelectedBetHistoryMonths;
