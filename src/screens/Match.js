import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';


class Match extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     styles: props.navigation.state.params.styles,
     match: props.navigation.state.params.match};
}

_renderItem = ({item}) => (
  <ListItem
   title={item.name}
   hideChevron
   titleStyle={this.state.styles.listItem}
   badge={{ value:  item.duration, textStyle: { color: 'green' }, containerStyle: { marginTop: -5 } }}
  />
);

_renderStat = ({item}) => (
  this.state.match.teamStats[item] > 0 &&
  <ListItem
   title={item}
   hideChevron
   titleStyle={this.state.styles.listItem}
   badge={{ value: this.state.match.teamStats[item], textStyle: { color: 'green' }, containerStyle: { marginTop: -5 } }}
  />
);


  render() {
    return (
    <ScrollView style={this.state.styles.scrollViewContainer}>
    <View>
    <ListItem
     title={'Lineup'}
     hideChevron
     titleStyle={this.state.styles.titleListItem}
     />
     <FlatList
        data={this.state.match.starting}
       renderItem={this._renderItem}
       keyExtractor={(item, index) => index.toString()}
     />
     </View>
     <View>
     <ListItem
      title={'Substitutes'}
      hideChevron
      titleStyle={this.state.styles.titleListItem}
      />
      <FlatList
         data={this.state.match.subs}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      </View>
      <View>
      <ListItem
       title={'Statistics'}
       hideChevron
       titleStyle={this.state.styles.titleListItem}
       />
       <FlatList
          data={Object.keys(this.state.match.teamStats)}
         renderItem={this._renderStat}
         keyExtractor={(item, index) => index.toString()}
       />
       </View>
    </ScrollView>
    );
  }
}

export default Match;
