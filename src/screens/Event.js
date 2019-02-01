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
import {getBetRatingColor} from "../util/RenderUtils";
import {predictedGoals} from "../util/GoalsUtils";

import {
  PublisherBanner
} from 'expo';


class Event extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
      token: props.navigation.state.params.token,
      event: props.navigation.state.params.event,
      styles: props.navigation.state.params.styles,
      market: props.navigation.state.params.market,
      betType: props.navigation.state.params.betType,
      loading: true,
      loadingPreviousMeetings: true,
      goalsRating: 0,
      resultsRating: 0,
      predictions: '',
      previousMeetings: '',
      homeResultsRating: 0,
      homeResultRatingSubTitle: '',
      awayResultsRating: 0,
      awayResultRatingSubTitle: '',
      adUnitID: props.navigation.state.params.adUnitID,
      adUnitRewardsID: props.navigation.state.params.adUnitRewardsID
    };


    setDataSource(this);
    setDataSourcePreviousMeetings(this);
}


_renderPrediction = ({item}) => (
    item.score > 0 &&
    <ListItem
    title={item.key}
    hideChevron
    containerStyle={{ borderBottomWidth: 0 }}
    titleStyle={this.state.styles.listItem}
    badge={{ value:  item.score.toFixed(2), textStyle: { color: 'orange' }, containerStyle: { marginTop: -5 } }}
  />
);


_renderPreviousMeeting = ({item}) => (
    <ListItem
    title={previousMeetingTitle(item)}
    hideChevron
    containerStyle={{ borderBottomWidth: 0 }}
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
  {item.eventType === 'PREDICT_SCORES' && <ListItem
   title={item.eventType}
   containerStyle={{ borderBottomWidth: 0 }}
   hideChevron
   titleStyle={this.state.styles.titleListItem}
   />}
   {item.eventType === 'PREDICT_RESULTS' && <ListItem
    title={item.eventType}
    containerStyle={{ borderBottomWidth: 0 }}
    hideChevron
    titleStyle={this.state.styles.titleListItem}
    badge={{ value:  getBetRating(item.eventType, this.state).toFixed(2), textStyle: { color: getBetRatingColor(getBetRating(item.eventType, this.state)), fontSize: 35 }, containerStyle: { marginTop: 5 } }}
    />}
    {item.eventType === 'PREDICT_GOALS' && <ListItem
     title={item.eventType}
     containerStyle={{ borderBottomWidth: 0 }}
     hideChevron
     titleStyle={this.state.styles.titleListItem}
     badge={{ value:  getBetRating(item.eventType, this.state).toFixed(2), textStyle: { color: getBetRatingColor(getBetRating(item.eventType, this.state)), fontSize: 35 }, containerStyle: { marginTop: 5 } }}
     subtitle={
        <View style={this.state.styles.container}>
         <Text style={this.state.styles.listItem}>
          {predictedGoals(item.predictions.result).toFixed(2)+' expected goals'}
         </Text>
        </View>
        }
     />}
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
       <PublisherBanner
       bannerSize="fullBanner"
       adUnitID={this.state.adUnitID}
       onDidFailToReceiveAdWithError={this.bannerError}
       onAdMobDispatchAppEvent={this.adMobEvent} />
       <ListItem
        title={'Machine Ratings'}
        hideChevron
        containerStyle={{ borderBottomWidth: 0 }}
        titleStyle={this.state.styles.titleListItem}
        />
       <ListItem
        title={this.state.event.home.label +' '+ getType(this.state.predictions, true, this.state.market)}
        hideChevron
        containerStyle={{ borderBottomWidth: 0 }}
        titleStyle={getStyle(this.state.styles, this.state.homeResultsRating, this.state.awayResultsRating, true)}
        badge={{ value:  this.state.homeResultsRating.toFixed(2), textStyle: { color: 'orange' }, containerStyle: { marginTop: -5 } }}
        subtitle={
          <View style={this.state.styles.listItem}>
              <Text style={this.state.styles.ratingText}>
               {this.state.homeResultRatingSubTitle}</Text>
          </View>
          }
        />
         <ListItem
          title={this.state.event.away.label +' '+ getType(this.state.predictions, false, this.state.market)}
          containerStyle={{ borderBottomWidth: 0 }}
          hideChevron
          titleStyle={getStyle(this.state.styles, this.state.homeResultsRating, this.state.awayResultsRating, false)}
          badge={{ value:  this.state.awayResultsRating.toFixed(2), textStyle: { color: 'orange' }, containerStyle: { marginTop: -5 } }}
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
         containerStyle={{ borderBottomWidth: 0 }}
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


  if (market === 'all' || market === 'results'){
   var predictions = prediction.filter(f => f.eventType === 'PREDICT_RESULTS').shift();
   var result = predictions.predictions.result[0].key;

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

   if(predictedGoals(predictions.predictions.result) >= 2.5){
    return 'OVER_2_5';
   }

   if(predictedGoals(predictions.predictions.result) < 2.5){
    return 'UNDER_2_5';
   }
 }
};

const reducer = (accumulator, currentValue) => accumulator + currentValue;


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

    var goals = data.filter(f => f.eventType === 'PREDICT_GOALS').shift();

     component.setState({
       predictions: data,
       loading: false,
       goalsRating: (getAccuracy(goals.homeOutcomes.accuracy, getType(data,true, 'goals'))
       +
       getAccuracy(goals.awayOutcomes.accuracy, getType(data, false, 'goals'))) /2,
       resultsRating: data.filter(f => f.eventType === 'PREDICT_RESULTS').shift().rating});
     if(component.state.market === 'all' || component.state.market === 'results'){
      setDataSourceHomeResultsRatings(component, 'results', component.state.event.home.id);
      setDataSourceAwayResultsRatings(component, 'results', component.state.event.away.id);
    }
    else{
      setDataSourceHomeResultsRatings(component, 'goals', component.state.event.home.id);
      setDataSourceAwayResultsRatings(component, 'goals', component.state.event.away.id);
    }
   })
    .catch((error) => component.props.navigation.navigate('Splash',{}));

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
              )
              .catch((error) => component.props.navigation.navigate('Splash',{}));

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
                })
                .catch((error) => component.props.navigation.navigate('Splash',{}));

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
  .then( data => component.setState({previousMeetings: data, loadingPreviousMeetings: false}))
  .catch((error) => component.props.navigation.navigate('Splash',{}));
}


function getBetRating(type, state){
  if(type === 'PREDICT_RESULTS'){
    return state.resultsRating;
  }

  if(type === 'PREDICT_GOALS'){
    if(state.goalsRating === null){
      return 0;
    }
    return state.goalsRating;
  }

  return -1;
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
