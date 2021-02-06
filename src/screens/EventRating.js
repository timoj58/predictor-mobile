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
import {styles} from './Styles';



class EventRating extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     home: props.navigation.state.params.home,
     away: props.navigation.state.params.away,
     homeLabel: props.navigation.state.params.homeLabel,
     awayLabel: props.navigation.state.params.awayLabel,
     country: props.navigation.state.params.country,
     competition: props.navigation.state.params.competition,
     loading: true,
     loadingHome: true,
     loadingAway: true,
     loadingHomeGoals: true,
     loadingAwayGoals: true,
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
     badge={{ value:  item.score, textStyle: { color: 'orange' }, containerStyle: { marginTop: -5 }, containerStyle: {backgroundColor: 'silver'} }}
     containerStyle={{ borderBottomWidth: 0 }}
     hideChevron
     titleStyle={styles.listItem}
     />
   );


_renderEventItem = ({item}) => (
  <View style={styles.container}>
  <ListItem
  title=
  <View style={styles.container}>
     {getResultStyleView(this, item, true)}
     {getResultStyleView(this, item, false)}
    </View>
    hideChevron
    badge={{ value: item.score, textStyle: { color: 'silver', fontSize: 20 }, containerStyle: {backgroundColor: '#36454f'}}}
    containerStyle={{ borderBottomWidth: 0 }}
  />
  </View>

);

_renderHomeOutcomes = () => (
    <View>
    <FlatList
   data={this.state.homeOutcomes}
   renderItem={this._renderEventItem}
   keyExtractor={(item, index) => index.toString()}
 />
 </View>

);

_renderAwayOutcomes = () => (
    <View>
    <FlatList
   data={this.state.awayOutcomes}
   renderItem={this._renderEventItem}
   keyExtractor={(item, index) => index.toString()}
 />
 </View>
);


_renderHome = () => (
  <ListItem
     title={this.state.homeLabel}
     hideChevron
     containerStyle={{ borderBottomWidth: 0 }}
     titleStyle={styles.titleListItem}
     subtitle={
       <View>
       {this.state.loadingHome &&
         <Progress.Bar
            size={Dimensions.get('window').width/4}
            indeterminate={true}
            color='black'
            height={10}
          //  thickness={20}
            />
       }
       {!this.state.loadingHome &&
       <ListItem
        hideChevron
        containerStyle={{ borderBottomWidth: 0 }}
        subtitle={this._renderHomeOutcomes()}
      />
    }
     </View>
    }
    />
);


_renderAway = () => (
  <ListItem
      title={this.state.awayLabel}
      hideChevron
      containerStyle={{ borderBottomWidth: 0 }}
      titleStyle={styles.titleListItem}
      subtitle={
        <View>
        {this.state.loadingAway &&
          <Progress.Bar
             size={Dimensions.get('window').width/4}
             indeterminate={true}
             color='black'
             height={10}
           //  thickness={20}
             />
        }
        {!this.state.loadingAway &&
         <ListItem
        hideChevron
        containerStyle={{ borderBottomWidth: 0 }}
        subtitle={this._renderAwayOutcomes()}
         />
       }
     </View>
     }
     />
);

  render() {
    return (
    <View style={styles.container}>
     {this.state.loading &&
       <View style={styles.progressContainer}>
       <Progress.Bar
          size={Dimensions.get('window').width/4}
          indeterminate={true}
          color='black'
          height={10}
        //  thickness={20}
          />
        </View>
     }
     {!this.state.loading &&
       <ScrollView style={styles.scrollViewContainer}>
       <View>
       <ListItem
        title={'Predictions'}
        hideChevron
        titleStyle={styles.titleListItem}
        containerStyle={{ borderBottomWidth: 0 }}
        subtitle={
          <View>
         <ListItem
           title=
             <View>
             <View style={{flexDirection: 'row'}}><Text style={styles.listItemWithSize}>{predictedResult(this, getMarket(this.state.predictions, "PREDICT_RESULTS")).replace('Win','')+' '}</Text>
             <Rating
                type='custom'
                imageSize={18}
                readonly
                ratingColor='green'
                ratingBackgroundColor='#36454f'
                startingValue={getRating(getMarket(this.state.predictions, "PREDICT_RESULTS"), this)}/>
               {!this.state.selectedBet && <Text style={styles.listItemWithSize}>{' '+predictedResult(this, getMarket(this.state.predictions, "PREDICT_RESULTS"),1).replace('Win','')+' '}</Text>}
                {!this.state.selectedBet && <Rating
                   type='custom'
                   imageSize={18}
                   readonly
                   ratingColor='green'
                   ratingBackgroundColor='#36454f'
                   startingValue={getRating(getMarket(this.state.predictions, "PREDICT_RESULTS"), this,1)}/>}
                {!this.state.selectedBet && <Text style={styles.listItemWithSize}>{' '+predictedResult(this, getMarket(this.state.predictions, "PREDICT_RESULTS"),2).replace('Win','')+' '}</Text>}
                {!this.state.selectedBet && <Rating
                   type='custom'
                   imageSize={18}
                   readonly
                   ratingColor='green'
                   ratingBackgroundColor='#36454f'
                   startingValue={getRating(getMarket(this.state.predictions, "PREDICT_RESULTS"), this,2)}/>}
                </View>
                 <View style={{flexDirection: 'row'}}>
                 <Text style={styles.listItemWithSize}>{'expected goals ('+predictedGoals(JSON.parse(getMarket(this.state.predictions, "PREDICT_GOALS").predictions).result)+') '}</Text>
                 <Rating
                       type='custom'
                       imageSize={16}
                       readonly
                       ratingColor='green'
                       ratingBackgroundColor='#36454f'
                       startingValue={getRating(getMarket(this.state.predictions, "PREDICT_GOALS"), this)}/>
                </View>
             </View>
           //badge={{ value: , textStyle: { color: 'green', fontSize: 20 }, containerStyle: {backgroundColor: 'silver'} }}
           //titleStyle={styles.listItem}
           hideChevron
           containerStyle={{ borderBottomWidth: 0 }}
          />
         </View>
       }
        />
        {this._renderHome()}
        {this._renderAway()}
      </View>
      </ScrollView>
    }
    </View>
  );

 }
}


function getResultStyleView(component, item, isHome){


   var style = getResultStyle(item, isHome);
   var goals = getGoalsStyle(component, item);

   var totalGoals;

   if(item.score !== null && item.score !== undefined){
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
     return  <View style={styles.containerRow}><Text style= {styles.listItemSmall}>{label+' '}</Text>
     <Badge status='success' value={goals} containerStyle={{backgroundColor: goalStyle}}  textStyle={{color: 'silver',fontSize: 10}} /></View>;
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
   return  <View style={styles.containerRow}><Text style= {styles.listItemSmall}>{label+' '}</Text>
           <Badge status='success' value={prediction} containerStyle={{backgroundColor: color}} textStyle={{color: 'silver',fontSize: 10}} />
           <Badge status='success' value={goals} containerStyle={{backgroundColor: goalStyle}} textStyle={{color: 'silver',fontSize: 10}} /></View>;

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

   var goals = predictedGoals(JSON.parse(data[0].predictions).result);

   if(goals >= 2.5){
     return '+2.5';
   }else{
     return '-2.5';
   }

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


function predictedResult(component, result, index=0){

  var prediction;
  if(component === null || !component.state.selectedBet){
    prediction = JSON.parse(result.predictions).result[index].key;
  }else{
    var res = JSON.parse(result.predictions).result.filter(f => f.key === component.state.selectedBetResult);
    if(res.length > 0){
     return res[0].key;
   }
   return JSON.parse(result.predictions).result[index].key;
  }
  return prediction; //.replace('Win', '');
}

function getMarket(predictions, market){

  var filtered =  predictions.filter(f => f.eventType === market);

  return filtered[filtered.length - 1];
}

function getRating(item, component,index=0){

  var score;

  if(item.eventType === 'PREDICT_GOALS'){
    var goals = predictedGoals(JSON.parse(item.predictions).result);
    //need to find the total goals really..
  if(goals < 2.5){
     score = JSON.parse(item.predictions).result.filter(f => f.key < 3).map(m => m.score).reduce(reducer);
  }
  else{
    score = JSON.parse(item.predictions).result.filter(f => f.key >= 3).map(m => m.score).reduce(reducer);
  }
  }else if(item.eventType === 'PREDICT_RESULTS'){
    console.log(component.state.selectedBetResult);
    console.log(JSON.parse(item.predictions).result);

    if(component.state.selectedBet && ["homeWin", "awayWin", "draw"].includes(component.state.selectedBetResult) ){
     score = JSON.parse(item.predictions).result.filter(f => f.key === component.state.selectedBetResult)[0].score;
   }else{

     console.log(JSON.parse(item.predictions).result[index].score);
     score = JSON.parse(item.predictions).result[index].score;
   }
  }

  return score / 100 * 5;
}

const reducer = (accumulator, currentValue) => accumulator + currentValue;



function filterRatings(data, team, type){
  return data.map(m => m['body']).filter(f => f.data.length > 0).filter(f => f.type === type).filter(f => f.team === team)[0].data.filter(f => f.outcome !== null).slice(0,3);
}

async function setDataSource(component){
  predictionsCombined(component)
  .then( data => {

    if(data.map(m => m['body'])[0] === void 0){
        component.props.navigation.navigate('Home',{});
      }else{
    component.setState({predictions: data.map(m => m['body']), loading: false});

    ratings(component)
    .then( data => {
      component.setState({
        homeOutcomes: filterRatings(data, component.state.home, "PREDICT_RESULTS"),
        awayOutcomes: filterRatings(data, component.state.away, "PREDICT_RESULTS"),
        homeGoalOutcomes: filterRatings(data, component.state.home, "PREDICT_GOALS"),
        awayGoalOutcomes: filterRatings(data, component.state.away, "PREDICT_GOALS"),
        loadingHome: false,
        loadingAway: false,
        loadingHomeGoals: false,
        loadingAwayGoals: false
      });
    })
     }

   })
    .catch((error) => {
      console.log(error);
      component.props.navigation.navigate('Splash',{});
    }
    );

}

function ratings(component){
  return Promise.all(
    [globalRating(component.state.competition, component.state.home, "PREDICT_RESULTS"),
     globalRating(component.state.competition, component.state.away, "PREDICT_RESULTS"),
     globalRating(component.state.competition, component.state.home, "PREDICT_GOALS"),
    globalRating(component.state.competition, component.state.away, "PREDICT_GOALS")]
  )
}

function predictionsCombined(component){
  return Promise.all([
    predictions(component.state.competition, component.state.home, component.state.away, "PREDICT_RESULTS"),
    predictions(component.state.competition, component.state.home, component.state.away, "PREDICT_GOALS")
  ]);
}



export default EventRating;
