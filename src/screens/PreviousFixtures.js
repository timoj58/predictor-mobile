import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Progress from 'react-native-progress';
import { ListItem, Badge} from 'react-native-elements'
import { Dimensions } from 'react-native';
import {previousFixtures} from "../api/DataService";
import {expires} from "../util/TokenUtils";
import {refresh} from "../api/AuthService";
import {predictedGoals} from "../util/GoalsUtils";


class PreviousFixtures extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     type: props.navigation.state.params.type,
     styles: props.navigation.state.params.styles,
     country: props.navigation.state.params.country,
     competition: props.navigation.state.params.competition,
     fixtures: '',
     market: props.navigation.state.params.market,
     event: props.navigation.state.params.event
    };


    setDataSource(this);
}

_renderOutcomeItem = ({item}) => (
  <ListItem
    title={getPrediction(item)}
    titleStyle={getStyle(item, this.state.styles)}
    containerStyle={{ borderBottomWidth: 0 }}
    hideChevron
    />
  );


_renderItem = ({item}) => (
  <ListItem
    title={
      <View>
       <View style={this.state.styles.containerRow}>
              <Text style= {this.state.styles.listItemSmall}>{item.home.label+' '}</Text>
              {getResultsBadge(item.previousFixtureOutcomes.filter(f => f.eventType === 'PREDICT_RESULTS')[0], true)}
              {getGoalsBadge(item.previousFixtureOutcomes.filter(f => f.eventType === 'PREDICT_GOALS')[0])}
      </View>
      <View style={this.state.styles.containerRow}>
             <Text style= {this.state.styles.listItemSmall}>{item.away.label+' '}</Text>
             {getResultsBadge(item.previousFixtureOutcomes.filter(f => f.eventType === 'PREDICT_RESULTS')[0], false)}
             {getGoalsBadge(item.previousFixtureOutcomes.filter(f => f.eventType === 'PREDICT_GOALS')[0])}
     </View>
     </View>
   }

//      item.home.label +' '+item.homeScore+' - '+item.awayScore+' '+item.away.label}
//    titleStyle={this.state.styles.listItem}
    containerStyle={{ borderBottomWidth: 0 }}
    hideChevron
    badge={{ value: item.homeScore+' - '+item.awayScore, textStyle: { color: 'silver', fontSize: 20 }, containerStyle: {backgroundColor: '#36454f'} }}
   /*subtitle={
         <View style={this.state.styles.listItem}>
         <FlatList
              data={item.previousFixtureOutcomes}
              renderItem={this._renderOutcomeItem}
              keyExtractor={(item, index) => index.toString()}
            />
         </View>
       } */

  />
);


  render() {
    return (
       <View style={this.state.styles.container}>
       <FlatList
        data={this.state.fixtures}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      </View>
    );
  }
}

async function setDataSource(component){
   previousFixtures(component.state.competition, component.state.market, component.state.token)
   .then( data => component.setState({fixtures : filteredFixtures(data, component.state.market, component.state.event)}))
   .catch((error) => component.props.navigation.navigate('Splash',{}));
}

function filteredFixtures(data, market, event){
  if (event === undefined){
    return data;
  }

  if(event === 'results'){
    return data;
  }

  /*
  otherwise...for market filter results...
  */
  var filtered = [];

  for(var x = 0; x < data.length; x++){
    var res = getPrediction(data[x].previousFixtureOutcomes[0]);


    if (market === 'PREDICT_RESULTS'){
      if(event === 'results '+res){
        filtered.push(data[x]);
      }
    }
    if(market === 'PREDICT_GOALS'){

      res = predictedGoals(data[x].previousFixtureOutcomes[0].predictions.result).toFixed(2);

      if((event === 'goals 2.5' && res >= 2.5) || (event === 'goals -2.5' && res < 2.5)){
        filtered.push(data[x]);
      }
   }
  }

  return filtered;
}


function getStyle(item){
 if(item.eventType === 'PREDICT_RESULTS' || item.eventType === 'PREDICT_SCORES'){
   if (item.success === true){
     return 'success';
   }

   return 'error';
 }

 if(item.eventType === 'PREDICT_GOALS'){

   var goals = predictedGoals(item.predictions.result);

   if ((goals >= 2.5 && item.totalGoals > 2.5) || (goals < 2.5 && item.totalGoals < 2.5)){
     return 'success';
  }

 return 'error';
 }

 return 'primary';
}


function getGoalsBadge(item){

  var prediction = getPrediction(item);
  var style = getStyle(item);

  var color;

  if(style === 'error'){
     color = 'red';
  } else{
    color = 'green';
  }

  return <Badge status='success' containerStyle={{backgroundColor: color}} value={prediction} textStyle={{color: 'silver',fontSize: 10}} />;
}


function getResultsBadge(item, isHome){

  var prediction = getPrediction(item);
  var style = getStyle(item);

  if(isHome){
    if(prediction === 'awayWin'){
       return;
    }

    if((prediction === 'homeWin' || prediction === 'draw') && style === 'success'){
      return <Badge status="success" containerStyle={{backgroundColor: 'green'}} value={prediction} textStyle={{color: 'silver',fontSize: 10}} />;
    }

    return <Badge status="error" containerStyle={{backgroundColor: 'red'}} value={prediction} textStyle={{color: 'silver',fontSize: 10}} />;

  }else{
    if(prediction === 'homeWin'){
       return;
    }

    if((prediction === 'awayWin' || prediction === 'draw') && style === 'success'){
      return <Badge status="success" containerStyle={{backgroundColor: 'green'}} value={prediction} textStyle={{color: 'silver',fontSize: 10}} />;
    }

    return <Badge status="error" containerStyle={{backgroundColor: 'red'}} value={prediction} textStyle={{color: 'silver',fontSize: 10}} />;
  }

}

function getPrediction(item){

  if(item.eventType === 'PREDICT_RESULTS' || item.eventType === 'PREDICT_SCORES'){
    return item.predictions.result.map(m => m.key).shift();
  }

  var goals = predictedGoals(item.predictions.result).toFixed(2);

  if(goals >= 2.5){
    return '+2.5';
  }
  return '-2.5';

}



export default PreviousFixtures;
