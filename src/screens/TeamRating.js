import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import {getBetRatingColor} from "../util/RenderUtils";



class TeamRating extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     styles: props.navigation.state.params.styles,
     teamRating: props.navigation.state.params.teamRating,
     market: props.navigation.state.params.market
};

}

_renderItem = ({item}) => (
  <ListItem
    title={item.type}
    badge={{ value:  item.accuracy.toFixed(2), textStyle: { color: getBetRatingColor(item.accuracy) }, containerStyle: { marginTop: -5 } }}
    hideChevron
    titleStyle={this.state.styles.listItem}
    subtitle={
      <View style={this.state.styles.listItem}>
          <Text style={this.state.styles.ratingText}>{item.success} / {item.total}</Text>
      </View>
      }
      />
);

_renderPredictionItem = ({item}) => (
  item.score > 0 &&  <ListItem
     title={item.key}
     badge={{ value:  item.score.toFixed(2), textStyle: { color: 'orange' }, containerStyle: { marginTop: -5 } }}
     hideChevron
     titleStyle={this.state.styles.listItem}
     />
   );

_renderEventItem = ({item}) => (
  ((this.state.market === 'results' && item.predictions.result.length < 4)
  || (this.state.market === 'goals' && item.predictions.result.length > 4)) &&
  <View style={this.state.styles.container}>
  <ListItem
    title={getTitle(item)}
    hideChevron
    titleStyle={getStyle(item, this.state.styles, this.state.market,
      getGoalsPrediction(item.predictions.result, this.state.market))}
    subtitle={
         (this.state.market === 'results' && <View style={this.state.styles.listItem}>
         <FlatList
              data={item.predictions.result}
              renderItem={this._renderPredictionItem}
              keyExtractor={(item, index) => index.toString()}
            />
         </View>)
         ||
         (this.state.market === 'goals' && <Text style={this.state.styles.ratingText}>
         {getGoalsPrediction(item.predictions.result, this.state.market).toFixed(2) +
         ' vs '
         + item.score}</Text>)
         }
  />
  </View>

);


  render() {
    return (
     <ScrollView style={this.state.styles.scrollViewContainer}>
     <View>
     <ListItem
      title={'Machine Statistics'}
      hideChevron
      titleStyle={this.state.styles.titleListItem}
      />
      <FlatList
         data={this.state.teamRating.accuracy}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      </View>
      <View>
      <ListItem
       title={'Past Predictions'}
       hideChevron
       titleStyle={this.state.styles.titleListItem}
       />
      <FlatList
         data={this.state.teamRating.predictionOutcomes}
         renderItem={this._renderEventItem}
         keyExtractor={(item, index) => index.toString()}
       />
       </View>
    </ScrollView>
    );
  }
}

function getTitle(item){
  return item.home + ' vs '+ item.away;
};

const reducer = (accumulator, currentValue) => accumulator + currentValue;

function getGoalsPrediction(result, market){
 if(market === 'results') {
   return;
 }

  const filtered = result.filter(score => score.score > 0).map(m => parseInt(m.key));

  return filtered.reduce(reducer) / filtered.length;
};

function getStyle(item, styles, market, goals){
 if(market === 'results'){
   if (item.outcome === true){
     return styles.listItemSuccess;
   }

   return styles.listItemFail;
 }

 if(market === 'goals'){

   const actual = item.score.replace(/\s+/g, '').split("-");
   const total = actual.map(m => parseInt(m)).reduce(reducer);

   if ((goals > 2.5 && total > 2.5) || (goals < 2.5 && total < 2.5)){
     return styles.listItemSuccess;
  }

 return styles.listItemFail;
 }
};


export default TeamRating;
