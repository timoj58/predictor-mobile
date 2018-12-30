import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList, ScrollView } from 'react-native';
import * as Progress from 'react-native-progress';

import {predictions} from "../api/DataService";
import {globalRating} from "../api/DataService";
import {previousMeetings} from "../api/DataService";
import { ListItem } from 'react-native-elements';


class Event extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
      token: props.navigation.state.params.token,
      event: props.navigation.state.params.event,
      styles: props.navigation.state.params.styles,
      market: props.navigation.state.params.market,
      loading: true,
      loadingPreviousMeetings: true,
      predictions: '',
      previousMeetings: '',
      homeResultsRating: 0,
      homeResultRatingSubTitle: '',
      awayResultsRating: 0,
      awayResultRatingSubTitle: ''
    };

    setDataSource(this);
    setDataSourcePreviousMeetings(this);
}


_renderPrediction = ({item}) => (
    item.score > 0 &&
    <ListItem
    title={item.key}
    hideChevron
    titleStyle={this.state.styles.listItem}
    badge={{ value:  item.score.toFixed(2), textStyle: { color: 'orange' }, containerStyle: { marginTop: -20 } }}
  />
);


_renderPreviousMeeting = ({item}) => (
    <ListItem
    title={previousMeetingTitle(item)}
    hideChevron
    titleStyle={this.state.styles.listItem}
    subtitle={
      <View style={this.state.styles.listItem}>
          <Text style={this.state.styles.ratingText}>{item.date}</Text>
      </View>
      }
    />
);


_renderItem = ({item}) => (
  renderForMarket(this.state.market, item.eventType) &&
  <View style={this.state.styles.container}>
  <ListItem
   title={item.eventType}
   hideChevron
   titleStyle={this.state.styles.titleListItem}
   />
  <FlatList
   data={item.predictions.result}
   renderItem={this._renderPrediction}
   keyExtractor={(item, index) => index.toString()}
 />
 </View>
);

  render() {
    return (
     <ScrollView style={this.state.styles.scrollViewContainer}>
     {this.state.loading && <Progress.Circle size={50} indeterminate={true} />}
     {!this.state.loading &&
       <View>
       <ListItem
        title={'Machine Ratings'}
        hideChevron
        titleStyle={this.state.styles.titleListItem}
        />
       <ListItem
        title={this.state.event.home.label +' '+ getType(this.state.predictions, true, this.state.market)}
        hideChevron
        titleStyle={getStyle(this.state.styles, this.state.homeResultsRating, this.state.awayResultsRating, true)}
        badge={{ value:  this.state.homeResultsRating.toFixed(2), textStyle: { color: 'orange' }, containerStyle: { marginTop: -20 } }}
        subtitle={
          <View style={this.state.styles.listItem}>
              <Text style={this.state.styles.ratingText}>
               {this.state.homeResultRatingSubTitle}</Text>
          </View>
          }
        />
         <ListItem
          title={this.state.event.away.label +' '+ getType(this.state.predictions, false, this.state.market)}
          hideChevron
          titleStyle={getStyle(this.state.styles, this.state.homeResultsRating, this.state.awayResultsRating, false)}
          badge={{ value:  this.state.awayResultsRating.toFixed(2), textStyle: { color: 'orange' }, containerStyle: { marginTop: -20 } }}
          subtitle={
            <View style={this.state.styles.listItem}>
                <Text style={this.state.styles.ratingText}>
                {this.state.awayResultRatingSubTitle}</Text>
            </View>
            }
          />
       <FlatList
        data={this.state.predictions}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      </View>}
      {this.state.loadingPreviousMeetings && <Progress.Circle size={50} indeterminate={true} />}
      {!this.state.loadingPreviousMeetings &&
        <View>
        <ListItem
         title={'Previous Meetings'}
         hideChevron
         titleStyle={this.state.styles.titleListItem}
         />
        <FlatList
         data={this.state.previousMeetings}
         renderItem={this._renderPreviousMeeting}
         keyExtractor={(item, index) => index.toString()}
       />
     </View>}
  </ScrollView>
    );
  }
}

function renderForMarket(market, eventType){
  if (market === 'all'){
    return true;
  }

  if(market === 'goals' && eventType === 'PREDICT_GOALS'){
    return true;
  }

  if(market === 'results' && eventType === 'PREDICT_RESULTS'){
    return true;
  }

  return false;
}

function getType(prediction, home, market){


  var predictions = prediction.filter(f => f.eventType === 'PREDICT_RESULTS').shift();
  var result = predictions.predictions.result[0].key;

  if (market === 'all' || market === 'results'){
   if(result === 'homeWin' && home){
     return "HOME_WIN";
   }
   if(result === 'homeWin' && !home){
     return "AWAY_BEATS_HOME";
   }
   if(result === 'awayWin' && home){
     return "HOME_BEATS_AWAY";
   }
   if(result === 'awayWin' && !home){
     return "AWAY_WIN";
   }
   if(result === 'draw'){
     return "DRAW";
   }
 }
 if(market === 'goals'){
   var predictions = prediction.filter(f => f.eventType === 'PREDICT_GOALS').shift();

   if(getGoalsPrediction(predictions.predictions.result) > 2.5){
    return 'OVER_2_5';
   }

   if(getGoalsPrediction(predictions.predictions.result) < 2.5){
    return 'UNDER_2_5';
   }
 }
};

const reducer = (accumulator, currentValue) => accumulator + currentValue;


function getGoalsPrediction(result){

  const filtered = result.filter(score => score.score > 0).map(m => parseInt(m.key));

  return filtered.reduce(reducer) / filtered.length;
};


function previousMeetingTitle(item) {
  return item.home +' '+ item.homeScore + '-' + item.awayScore + ' '+ item.away
};


function setDataSource(component){
  predictions(
    component.state.event.home.type,
    component.state.event.home.country,
    component.state.event.home.competition,
    component.state.event.home.id,
    component.state.token)
  .then( data => {
     component.setState({predictions: data, loading: false});
     if(component.state.market === 'all' || component.state.market === 'results'){
      setDataSourceHomeResultsRatings(component, 'results', component.state.event.home.id);
      setDataSourceAwayResultsRatings(component, 'results', component.state.event.away.id);
    }
    else{
      setDataSourceHomeResultsRatings(component, 'goals', component.state.event.home.id);
      setDataSourceAwayResultsRatings(component, 'goals', component.state.event.away.id);
    }
   });
}


function setDataSourceHomeResultsRatings(component, market, team){
  globalRating(team,
              market,
              component.state.token)
              .then(data => {
                var type = getType(component.state.predictions, true, component.state.market);

                component.setState(
                {
                   homeResultRatingSubTitle: getSuccess(data.accuracy, type)
                  + ' / '+ getTotal(data.accuracy, type),
                  homeResultsRating: getAccuracy(data.accuracy, type)});
                }
              );
}


function setDataSourceAwayResultsRatings(component, market, team){
  globalRating(team,
              market,
              component.state.token)
              .then(data => {


                var type = getType(component.state.predictions, false, component.state.market);

                component.setState(
                {
                  awayResultRatingSubTitle: getSuccess(data.accuracy, type)
                  + ' / '+ getTotal(data.accuracy, type),
                  awayResultsRating: getAccuracy(data.accuracy, type)});
                });
}


function getAccuracy(marketRatings, type){
  return marketRatings.filter(f => f.type === type).shift().accuracy;
}

function getTotal(marketRatings, type){
  return marketRatings.filter(f => f.type === type).shift().total;
}

function getSuccess(marketRatings, type){
  return marketRatings.filter(f => f.type === type).shift().success;
}


function setDataSourcePreviousMeetings(component){
  previousMeetings(
    component.state.event.home.id,
    component.state.event.away.id,
    component.state.token)
  .then( data => component.setState({previousMeetings: data, loadingPreviousMeetings: false}));
}

function getStyle(styles, homeScore, awayScore, home){
  if (home && homeScore > awayScore){
     return styles.listItemSuccess;
  }

  if (home && homeScore < awayScore){
     return styles.listItemFail;
  }

  if (!home && homeScore < awayScore){
     return styles.listItemSuccess;
  }

  if (!home && homeScore > awayScore){
     return styles.listItemFail;
  }

   return styles.listItem;
 }


export default Event;
