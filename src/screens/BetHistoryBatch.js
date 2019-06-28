import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements'
import {getBetRatingColor} from "../util/RenderUtils";

class BetHistoryBatch extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     styles: props.navigation.state.params.styles,
     batch: props.navigation.state.params.batch
     };
}


_renderBet = ({item}) => (
  <ListItem
    title={item.home+' vs '+item.away}
    titleStyle={getStyle(this.state.styles, item.win)}
    containerStyle={{ borderBottomWidth: 0 }}
    hideChevron
    badge={{ value:  item.rating.toFixed(2), textStyle: { color: getBetRatingColor(item.rating) }, containerStyle: { marginTop: -5 } }}
    subtitle={
       <View style={this.state.styles.container}>
        <Text style={this.state.styles.listItem}>
         {getPriceReturn(item.bestPrice)}
        </Text>
       </View>
       }
  />
);


_renderItem = ({item}) => (
  <ListItem
    title={item.header.market +' '+ item.header.event+' ('+getPotentialReturn(item)+')'}
    titleStyle={this.state.styles.titleListItem}
    hideChevron
    containerStyle={{ borderBottomWidth: 0 }}
    subtitle={
         <View style={this.state.styles.listItem}>
         <ListItem
           title={item.header.success+' of '+item.header.total+' wins'}
           titleStyle={this.state.styles.titleListItem}
           hideChevron
           badge={{ value:  item.header.average.toFixed(2), textStyle: { color: getBetRatingColor(item.header.average), fontSize: 35 }, containerStyle: { marginTop: -5 } }}
         />
         <FlatList
              data={item.selectedBetResponses}
              renderItem={this._renderBet}
              keyExtractor={(item, index) => index.toString()}
            />
         </View>
         }
  />
);


  render() {
    return (
     <View style={this.state.styles.container}>
       <FlatList
        data={getHistory(this.state.batch.betHistoryResponses)}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      </View>
    );
  }
}

function getPotentialReturn(item){

  var winningBets = item.selectedBetResponses.filter(f => f.win == true).length;

  var withPrices = item.selectedBetResponses
                         .filter(f => f.win == true)
                         .filter(f => f.bestPrice != null)
                         .map(m => getPrice(m.bestPrice));

  if(withPrices.length == 0){
    return '?';
  }

  var potentialReturn = withPrices.reduce((total, scalar) => total + scalar);
  var unitPrice = 1 * (potentialReturn/100);

  return (unitPrice + winningBets - item.selectedBetResponses.length).toFixed(2);
}

function getPrice(bestPrice){
  return (bestPrice-1)*100;
}

function getPriceReturn(bestPrice){
  if (bestPrice === null) {
    return 'No price available';
  }

  return getPrice(bestPrice).toFixed(2) +'% Returned';
}

function getHistory(betHistoryResponses){

    var history = [];

    for(var x = 0; x < betHistoryResponses.length; x++){
     for( var y = 0; y < betHistoryResponses[x].marketEventHistoryResponses.length; y++){
       history.push(betHistoryResponses[x].marketEventHistoryResponses[y]);
     }
    }

  return history;
}

function getStyle(styles, win){
  if(win){
    return styles.listItemSuccess;
  }

  return styles.listItemFail;
}


export default BetHistoryBatch;
