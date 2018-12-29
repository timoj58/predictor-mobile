import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList, ScrollView } from 'react-native';
import * as Progress from 'react-native-progress';

import {predictions} from "../api/DataService";
import {previousMeetings} from "../api/DataService";
import { ListItem } from 'react-native-elements';


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
       <FlatList
        data={this.state.predictions}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index.toString()}
      />}
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
