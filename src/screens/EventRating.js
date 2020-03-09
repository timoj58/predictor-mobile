import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList, ScrollView } from 'react-native';
import * as Progress from 'react-native-progress';
import { ListItem, Tile, Rating, Badge } from 'react-native-elements'
import { Dimensions } from 'react-native';
import {predictions} from "../api/DataService";
import {globalRating} from "../api/DataService";
import {getBetRatingColor} from "../util/RenderUtils";
import {predictedGoals} from "../util/GoalsUtils";


class EventRating extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     type: props.navigation.state.params.type,
     styles: props.navigation.state.params.styles,
     home: props.navigation.state.params.home,
     away: props.navigation.state.params.away,
     homeLabel: props.navigation.state.params.homeLabel,
     awayLabel: props.navigation.state.params.awayLabel,
     country: props.navigation.state.params.country,
     competition: props.navigation.state.params.competition,
     loading: true,
     loading2: true,
     loading3: true,
     loading4: true,
     loadingPreviousMeetings: true,
     predictions: '',
     market: props.market,
     homeOutcomes: [],
     awayOutcomes: [],
     homeAccuracy: [],
     awayAccuracy: [],
     homeGoalOutcomes: [],
     awayGoalOutcomes: [],
     homeGoalAccuracy: [],
     awayGoalAccuracy: [],
     selectedBet: props.navigation.state.params.selectedBet,
     selectedBetResult: props.navigation.state.params.selectedBetResult
   };

   setDataSource(this);
}


_renderPredictionItem = ({item}) => (
  item.score > 0 &&  <ListItem
     title={item.key}
     badge={{ value:  item.score.toFixed(2), textStyle: { color: 'orange' }, containerStyle: { marginTop: -5 } }}
     containerStyle={{ borderBottomWidth: 0 }}
     hideChevron
     titleStyle={this.state.styles.listItem}
     />
   );


_renderEventItem = ({item}) => (
  <View style={this.state.styles.container}>
  <ListItem
  title=
  <View style={this.state.styles.container}>
     {getResultStyleView(this, item, true)}
     {getResultStyleView(this, item, false)}
    </View>
    hideChevron
    badge={{ value: item.score, textStyle: { color: 'silver', fontSize: 20 } }}
    containerStyle={{ borderBottomWidth: 0 }}
  />
  </View>

);


  render() {
    return (
    <View style={this.state.styles.container}>
     {loading(this.state) &&
       <View style={this.state.styles.progressContainer}>
       <Progress.Circle
          size={Dimensions.get('window').width/4}
          indeterminate={true}
          color='black'
          thickness={20} />
        </View>
     }
     {loaded(this.state) &&
       <ScrollView style={this.state.styles.scrollViewContainer}>
       <View>
       <ListItem
        title={'Predictions'}
        hideChevron
        titleStyle={this.state.styles.titleListItem}
        containerStyle={{ borderBottomWidth: 0 }}
        subtitle={
          <View>
         <ListItem
           title={'Result'}
           badge={{ value: predictedResult(this, getMarket(this.state.predictions, "PREDICT_RESULTS")), textStyle: { color: 'green', fontSize: 20 } }}
           titleStyle={this.state.styles.listItem}
           hideChevron
           containerStyle={{ borderBottomWidth: 0 }}
           subtitle={
             <View>
             <Rating
                type='custom'
                imageSize={20}
                readonly
                ratingColor='green'
                ratingBackgroundColor='#36454f'
                startingValue={getRating(getMarket(this.state.predictions, "PREDICT_RESULTS"))}/>
             </View>
           }
          />
          <ListItem
            title={'Expected Goals'}
            titleStyle={this.state.styles.listItem}
            badge={{ value: predictedGoals(getMarket(this.state.predictions, "PREDICT_GOALS").predictions.result).toFixed(2), textStyle: { color: 'green', fontSize: 20 } }}
            hideChevron
            containerStyle={{ borderBottomWidth: 0 }}
            subtitle={
              <View>
              <Rating
                 type='custom'
                 imageSize={20}
                 readonly
                 ratingColor='green'
                 ratingBackgroundColor='#36454f'
                 startingValue={getRating(getMarket(this.state.predictions, "PREDICT_GOALS"))}/>
              </View>
            }
           />
         </View>
       }
        />
        <ListItem
           title={this.state.homeLabel}
           hideChevron
           containerStyle={{ borderBottomWidth: 0 }}
           titleStyle={this.state.styles.titleListItem}
           subtitle={
             <View>
             <ListItem
             title={getTitle(this,'results', true)}
             hideChevron
             containerStyle={{ borderBottomWidth: 0 }}
             titleStyle={this.state.styles.listItem}
             badge={{ value: getOverallRating(this, 'results', true), textStyle: { color: 'green', fontSize: 20 } }}
              />
             <ListItem
             title={getTitle(this,'goals', true)}
             hideChevron
             containerStyle={{ borderBottomWidth: 0 }}
             titleStyle={this.state.styles.listItem}
             badge={{ value: getOverallRating(this, 'goals', true), textStyle: { color: 'green', fontSize: 20 } }}
              />
              <ListItem
              hideChevron
              containerStyle={{ borderBottomWidth: 0 }}
              subtitle={
                <View>
                <FlatList
               data={this.state.homeOutcomes}
               renderItem={this._renderEventItem}
               keyExtractor={(item, index) => index.toString()}
             />
             </View>
            }
            />
           </View>
          }
          />
         <ListItem
             title={this.state.awayLabel}
             hideChevron
             containerStyle={{ borderBottomWidth: 0 }}
             titleStyle={this.state.styles.titleListItem}
             subtitle={
               <View>
               <ListItem
               title={getTitle(this,'results', false)}
               hideChevron
               containerStyle={{ borderBottomWidth: 0 }}
               titleStyle={this.state.styles.listItem}
               badge={{ value: getOverallRating(this, 'results', false), textStyle: { color: 'green', fontSize: 20 } }}
                />
               <ListItem
               title={getTitle(this,'goals', false)}
               hideChevron
               containerStyle={{ borderBottomWidth: 0 }}
               titleStyle={this.state.styles.listItem}
               badge={{ value: getOverallRating(this, 'goals', false), textStyle: { color: 'green', fontSize: 20 } }}
                />
                <ListItem
               hideChevron
               containerStyle={{ borderBottomWidth: 0 }}
               subtitle={
                <View>
                <FlatList
                 data={this.state.awayOutcomes}
                 renderItem={this._renderEventItem}
                 keyExtractor={(item, index) => index.toString()}
                />
           </View>
         }
          />
             </View>
            }
            />
      </View>
      </ScrollView>
    }
    </View>
  );

 }
}

function loaded(component){
  if(!component.loading && !component.loading2 && !component.loading3  && !component.loading4){
   return true;
  }
  return false;
}

function loading(component){
  if(component.loading || component.loading2 || component.loading3 || component.loading4 ){
    return true;
  }
  return false;
}


function getResultStyleView(component, item, isHome){


   var style = getResultStyle(item, isHome);
   var goals = getGoalsStyle(component, item);

   var totalGoals;

   if(item.score !== null){
    var score = item.score.replace(" ", "").split("-");
    totalGoals = parseInt(score[0])+parseInt(score[1]);
   }
   var label;

   if(isHome){
     label = item.home;
   }else{
     label = item.away;
   }

   var goalStyle = 'white';
   if(item.score !== null){
   if(goals === '+2.5' && totalGoals > 2 ){
     goalStyle = 'green';
   }
   else if(goals === '-2.5' && totalGoals < 3 ){
     goalStyle = 'green';
   }
   else{
     goalStyle = 'red';
   }
 }

  /* if(style === 'primary' && goalsOutcome === 'primary'){
    return  <View style={component.state.styles.containerRow}><Text style= {component.state.styles.listItemSmall}>{label}</Text></View>;
   }
*/


   if(style === 'primary'){
     return  <View style={component.state.styles.containerRow}><Text style= {component.state.styles.listItemSmall}>{label}</Text>
     <Badge status='success' value={goals} textStyle={{color: goalStyle,fontSize: 10}} /></View>;
   }

   var prediction = predictedResult(null, item);
   var color = 'white';

  if(item.score !== null){
    if(style === 'success'){
     color = 'green';
   }else{
     color = 'red';
   }
 }
   return  <View style={component.state.styles.containerRow}><Text style= {component.state.styles.listItemSmall}>{label}</Text>
           <Badge status='success' value={prediction} textStyle={{color: color,fontSize: 10}} />
           <Badge status='success' value={goals} textStyle={{color: goalStyle,fontSize: 10}} /></View>;

}

function getGoalOutcome(component, item){
  var combined = component.state.homeGoalOutcomes.concat(component.state.awayGoalOutcomes);
  //now get the first match..
  return combined.filter(f => f.home === item.home && f.away === item.away);
}

function getGoalsStyle(component, item){
  var data = getGoalOutcome(component, item);

   if(data.length === 0){
    return 'primary';
   }

   var goals = predictedGoals(data[0].predictions.result).toFixed(2);

   if(goals >= 2.5){
     return '+2.5';
   }else{
     return '-2.5';
   }

}

function getGoalsOutcome(component, item){
  /*
   have a hack at this.  so...
  */
  var data = getGoalOutcome(component, item);

   if(data.length === 0){
    return 'primary';
   }

   return data[0].outcome;

}

function getResultStyle(item, isHome){

  var result = predictedResult(null, item);

  if(result === 'draw' && item.outcome){
    return 'success'
  }

  if(result === 'draw' && !item.outcome){
    return 'error';
  }

  if(isHome && result === 'homeWin'){
      if(item.outcome){
        return 'success';
      }else{
        return 'error';
      }
  }

  if(isHome){
    return 'primary';
  }

  if(!isHome && result === 'awayWin'){
      if(item.outcome){
        return 'success';
      }else{
        return 'error';
      }
  }

  return 'primary';

}

function getOverallRating(component, market, isHome){
   var title = getTitle(component,market, isHome);
   var accuracy;

   if(component.state.homeAccuracy.length == 0 || component.state.awayAccuracy.length == 0){
     return '69%';
   }

   if(title === 'against' && !isHome){
     accuracy = component.state.awayAccuracy.filter(f => f.type === 'AWAY_BEATS_HOME')[0].accuracy.toFixed(0);
   }
   if(title === 'against' && isHome){
     accuracy = component.state.homeAccuracy.filter(f => f.type === 'HOME_BEATS_AWAY')[0].accuracy.toFixed(0);
   }
   if(title === 'homeWin' && isHome){
     accuracy = component.state.homeAccuracy.filter(f => f.type === 'HOME_WIN')[0].accuracy.toFixed(0);
   }
   if(title === 'awayWin' && !isHome){
     accuracy = component.state.awayAccuracy.filter(f => f.type === 'AWAY_WIN')[0].accuracy.toFixed(0);
   }
   if(title === 'draw' && isHome){
     accuracy = component.state.homeAccuracy.filter(f => f.type === 'DRAW')[0].accuracy.toFixed(0);
   }
   if(title === 'draw' && !isHome){
     accuracy = component.state.awayAccuracy.filter(f => f.type === 'DRAW')[0].accuracy.toFixed(0);
   }

   if(title === 'Under 2.5' && isHome){
     accuracy = component.state.homeGoalAccuracy.filter(f => f.type === 'UNDER_2_5')[0].accuracy.toFixed(0);
   }
   if(title === 'Over 2.5' && isHome){
     accuracy = component.state.homeGoalAccuracy.filter(f => f.type === 'OVER_2_5')[0].accuracy.toFixed(0);
   }
   if(title === 'Under 2.5' && !isHome){
     accuracy = component.state.awayGoalAccuracy.filter(f => f.type === 'UNDER_2_5')[0].accuracy.toFixed(0);
   }
   if(title === 'Over 2.5' && !isHome){
     accuracy = component.state.awayGoalAccuracy.filter(f => f.type === 'OVER_2_5')[0].accuracy.toFixed(0);
   }

   return accuracy+'%';

}

function getTitle(component, market,isHome){

  var result = predictedResult(component,getMarket(component.state.predictions, "PREDICT_RESULTS"))
  var goals = predictedGoals(getMarket(component.state.predictions, "PREDICT_GOALS").predictions.result);


  if(isHome && market === 'results'){
     if(result === 'awayWin'){
       return 'against';
     }
     return result;
  }
  if(!isHome && market === 'results'){
     if(result === 'homeWin'){
       return 'against';
     }
     return result;
  }

  if(market === 'goals'){
    if(goals < 2.5){
      return 'Under 2.5';
    }
    return 'Over 2.5';
  }

}

function predictedResult(component, result){
  var prediction;
  if(component === null || !component.state.selectedBet){
    prediction = result.predictions.result[0].key;
  }else{
    var res = result.predictions.result.filter(f => f.key === component.state.selectedBetResult);
    if(res.length > 0){
     return res[0].key;
   }
   return result.predictions.result[0].key;
  }
  return prediction;
}

function getMarket(predictions, market){
  var filtered =  predictions.filter(f => f.eventType === market);
  return filtered[filtered.length - 1];
}

function getRating(item){

  var score;

  if(item.eventType === 'PREDICT_GOALS'){
    var goals = predictedGoals(item.predictions.result).toFixed(2);
    //need to find the total goals really..
  if(goals < 2.5){
     score = item.predictions.result.filter(f => f.key < 3).map(m => m.score).reduce(reducer).toFixed(2);
  }
  else{
    score = item.predictions.result.filter(f => f.key >= 3).map(m => m.score).reduce(reducer).toFixed(2);
  }
  }else if(item.eventType === 'PREDICT_RESULTS'){
    score = item.predictions.result[0].score.toFixed(2);
  }

  return score / 100 * 5;
}

const reducer = (accumulator, currentValue) => accumulator + currentValue;


function getAccuracy(marketRatings, type){

  return marketRatings.filter(f => f.type === type).shift().accuracy;
}

function getTotal(marketRatings, type){
  return marketRatings.filter(f => f.type === type).shift().total;
}

function getSuccess(marketRatings, type){
  return marketRatings.filter(f => f.type === type).shift().success;
}



function getGoalsPrediction(result, market){
 if(market === 'results') {
   return;
 }

  return predictedGoals(result);
};


async function setDataSource(component){
  predictions(
    component.state.type,
    component.state.country,
    component.state.competition,
    component.state.home,
    component.state.token)
  .then( data => {

    component.setState({predictions: data, loading: false});

       setDataSourceHomeResultsRatings(component, 'results', component.state.home);
       setDataSourceAwayResultsRatings(component, 'results', component.state.away);
       setDataSourceHomeGoalsRatings(component, 'goals', component.state.home);
       setDataSourceAwayGoalsRatings(component, 'goals', component.state.away);

   })
    .catch((error) => {
      console.log(error);
      component.props.navigation.navigate('Splash',{});
    }
    );

}

function setDataSourceHomeResultsRatings(component, market, team){
  globalRating(team,
              market,
              component.state.token)
              .then(data => {


                 component.setState({
                   homeOutcomes: data.predictionOutcomes.filter(f => f.outcome !== null).slice(0,5),
                   homeAccuracy: data.accuracy,
                   loading: false
                 });


              })
              .catch((error) => {
                component.props.navigation.navigate('Splash',{});
              });

}


function setDataSourceAwayResultsRatings(component, market, team){
  globalRating(team,
              market,
              component.state.token)
              .then(data => {


                component.setState({
                    awayOutcomes: data.predictionOutcomes.filter(f => f.outcome !== null).slice(0,5),
                    awayAccuracy: data.accuracy,
                    loading2: false
              });


                })
                .catch((error) => {
                  console.log(error);
                  component.props.navigation.navigate('Splash',{});
                });

}

function setDataSourceHomeGoalsRatings(component, market, team){
  globalRating(team,
              market,
              component.state.token)
              .then(data => {

                 component.setState({
                   homeGoalOutcomes: data.predictionOutcomes.filter(f => f.outcome !== null).slice(0,5),
                   homeGoalAccuracy: data.accuracy,
                   loading3: false
                 });

              })
              .catch((error) => {
                console.log(error);
                component.props.navigation.navigate('Splash',{});
              });

}


function setDataSourceAwayGoalsRatings(component, market, team){
  globalRating(team,
              market,
              component.state.token)
              .then(data => {

                component.setState({
                    awayGoalOutcomes: data.predictionOutcomes.filter(f => f.outcome !== null).slice(0,5),
                    awayGoalAccuracy: data.accuracy,
                    loading4: false
                   });

                })
                .catch((error) => {
                  console.log(error);
                  component.props.navigation.navigate('Splash',{});
                });

}



export default EventRating;
