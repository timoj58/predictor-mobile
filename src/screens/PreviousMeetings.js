import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Progress from 'react-native-progress';
import { ListItem, Tile, Avatar } from 'react-native-elements'
import { Dimensions } from 'react-native';
import {previousMeetings} from "../api/DataService";
import {predictions} from "../api/DataService";
import {predictedGoals} from "../util/GoalsUtils";


import {
  PublisherBanner
} from 'expo';

class PreviousMeetings extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     type: props.navigation.state.params.type,
     country: props.navigation.state.params.country,
     competition: props.navigation.state.params.competition,
     styles: props.navigation.state.params.styles,
     home: props.navigation.state.params.home,
     away: props.navigation.state.params.away,
     homeLabel: props.navigation.state.params.homeLabel,
     awayLabel: props.navigation.state.params.awayLabel,
     loadingPreviousMeetings: true,
     previousMeetings: [],
     event: '',
     goalsEvent: '',
     adUnitID: props.navigation.state.params.adUnitID,
     adUnitRewardsID: props.navigation.state.params.adUnitRewardsID
    };

/*    if(this.state.today){
      AdMobRewarded.setAdUnitID(this.state.adUnitRewardsID); // Test ID, Replace with your-admob-unit-id
      rewards();
    }
*/
    setDataSource(this);
}


_renderPreviousMeeting = ({item}) => (
    <ListItem
    title={previousMeetingTitle(item)}
    hideChevron
    titleStyle={this.state.styles.listItem}
    badge={{ value: (item.homeScore + item.awayScore), textStyle: { color: getGoalsColor(item, this.state.goalsEvent) }, containerStyle: { marginTop: -5 } }}
   avatar={<Avatar
              rounded
              icon={{name: getIcon(
                item,
                this.state.event,
                this.state.homeLabel,
                this.state.awayLabel),
              color: getIconColor(
                item,
                this.state.event,
                this.state.homeLabel,
                this.state.awayLabel), type: 'font-awesome'}}
             />}
    subtitle={
      <View style={this.state.styles.listItem}>
          <Text style={this.state.styles.ratingText}>{item.date}</Text>
      </View>
      }
    />
);


  render() {
    return (
     <View style={this.state.styles.container}>
    {this.state.loadingPreviousMeetings && <Progress.Circle size={50} indeterminate={true} />}
     {!this.state.loadingPreviousMeetings &&
       <View style={this.state.styles.container}>
        <PublisherBanner
        bannerSize="fullBanner"
        adUnitID={this.state.adUnitID}
        onDidFailToReceiveAdWithError={this.bannerError}
        onAdMobDispatchAppEvent={this.adMobEvent} />
         <FlatList
        data={this.state.previousMeetings}
        renderItem={this._renderPreviousMeeting}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>}
  </View>
    );
  }
}
/*
async function rewards(){
  var x = await AdMobRewarded.requestAdAsync();
  var y = await AdMobRewarded.showAdAsync();
}
*/
function setDataSource(component){
  previousMeetings(
    component.state.home,
    component.state.away,
    component.state.token)
  .then( data => {

    predictions(
      component.state.type,
      component.state.country,
      component.state.competition,
      component.state.home,
      component.state.token)
    .then( result => {
      var predictions = result.filter(f => f.eventType === 'PREDICT_RESULTS').shift();
      var outcome = predictions.predictions.result[0].key;
      var goalsOutcome = '';

      var goalsPredictions = result.filter(f => f.eventType === 'PREDICT_GOALS').shift();

      if(predictedGoals(goalsPredictions.predictions.result) >= 2.5){
       goalsOutcome =  'OVER_2_5';
      }

      if(predictedGoals(goalsPredictions.predictions.result) < 2.5){
       goalsOutcome =  'UNDER_2_5';
      }


      component.setState({event: outcome, goalsEvent: goalsOutcome,  previousMeetings: data, loadingPreviousMeetings: false})
      });
   }
  )
  .catch((error) => component.props.navigation.navigate('Splash',{}));
}

function previousMeetingTitle(item) {
  return item.home +' '+ item.homeScore + '-' + item.awayScore + ' '+ item.away
};

function getIcon(item, event, home, away){
  if(event === 'homeWin' && home === item.away){
    return 'minus';
  }

  if(event === 'awayWin' && away === item.home){
    return 'minus';
  }
  //times
  if(event === 'draw' && item.homeScore == item.awayScore){
    return 'check';
  }

  if(event === 'homeWin' && item.home === home && item.homeScore > item.awayScore){
    return 'check';
  }

  if(event === 'awayWin' && item.away === away && item.homeScore < item.awayScore){
    return 'check';
  }

  return 'times';
}


function getIconColor(item, event, home, away){

  if(event === 'homeWin' && home === item.away){
    return 'silver';
  }

  if(event === 'awayWin' && away === item.home){
    return 'silver';
  }


  if(event === 'draw' && item.homeScore == item.awayScore){
    return 'limegreen';
  }

  if(event === 'homeWin' && item.home === home && item.homeScore > item.awayScore){
    return 'limegreen';
  }

  if(event === 'awayWin' && item.away === away && item.homeScore < item.awayScore){
    return 'limegreen';
  }

  return 'red';
}

function getGoalsColor(item, event){
  if(event === 'OVER_2_5' && item.homeScore + item.awayScore > 2.5){
    return 'limegreen';
  }
  if(event === 'UNDER_2_5' && item.homeScore + item.awayScore < 2.5){
    return 'limegreen';
  }
  return 'red';
}

export default PreviousMeetings;
