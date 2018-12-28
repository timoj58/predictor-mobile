import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Progress from 'react-native-progress';

import {predictions} from "../api/DataService";
import {previousMeetings} from "../api/DataService";


class Event extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
      token: props.navigation.state.params.token,
      event: props.navigation.state.params.event,
      styles: props.navigation.state.params.styles,
      loading: true,
      loadingPreviousMeetings: true,
      predictions: '',
      previousMeetings: ''
    };

    setDataSource(this);
    setDataSourcePreviousMeetings(this);

}


_renderPrediction = ({item}) => (
    item.score > 0 &&
    <Text>{item.key} - {item.score}%</Text>
);


_renderPreviousMeeting = ({item}) => (
    <Text>{item.home} {item.homeScore} - {item.awayScore} {item.away} {item.date}</Text>
);


_renderItem = ({item}) => (
  <View style={this.state.styles.container}>
  <Text>Event {item.eventType} Rating {item.rating}</Text>
  <FlatList
   data={item.predictions.result}
   renderItem={this._renderPrediction}
   keyExtractor={(item, index) => index}
 />
 </View>
);

  render() {
    return (
     <View style={this.state.styles.container}>
     <Text>Home: {this.state.event.home.label}</Text>
     <Text>Away: {this.state.event.away.label}</Text>
     <Text>Date: {this.state.event.eventDate}</Text>
     {this.state.loading && <Progress.Circle size={50} indeterminate={true} />}
     {!this.state.loading &&
       <FlatList
        data={this.state.predictions}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index}
      />}
      {this.state.loadingPreviousMeetings && <Progress.Circle size={50} indeterminate={true} />}
      {!this.state.loadingPreviousMeetings &&
        <FlatList
         data={this.state.previousMeetings}
         renderItem={this._renderPreviousMeeting}
         keyExtractor={(item, index) => index}
       />}
  </View>
    );
  }
}

function setDataSource(component){
  predictions(
    component.state.event.home.type,
    component.state.event.home.country,
    component.state.event.home.competition,
    component.state.event.home.id,
    component.state.token)
  .then( data => component.setState({predictions: data, loading: false}));
}

function setDataSourcePreviousMeetings(component){
  previousMeetings(
    component.state.event.home.id,
    component.state.event.away.id,
    component.state.token)
  .then( data => component.setState({previousMeetings: data, loadingPreviousMeetings: false}));
}


export default Event;
