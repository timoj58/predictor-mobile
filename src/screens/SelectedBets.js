import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Progress from 'react-native-progress';
import { ListItem } from 'react-native-elements'
import { Dimensions } from 'react-native'

import {selectedBets} from "../api/DataService";
import {selectedBetsAgainst} from "../api/DataService";
import {getBetRatingColor} from "../util/RenderUtils";
import {renderListItem} from "../util/RenderUtils";
import {
  PublisherBanner
} from 'expo';


class SelectedBets extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     type: props.navigation.state.params.type,
     market: props.navigation.state.params.market,
     event: props.navigation.state.params.event,
     styles: props.navigation.state.params.styles,
     loading: true,
     start: props.navigation.state.params.start,
     bets:'',
     adUnitID: props.navigation.state.params.adUnitID,
     adUnitRewardsID: props.navigation.state.params.adUnitRewardsID
    };


  setDataSource(this);
}

_renderItem = ({item}) => (
  <ListItem
    onPress={() => loadEvent(this, item)}
    title={item.home + ' vs '+item.away}
    titleStyle={this.state.styles.listItem}
    badge={{ value: item.rating.toFixed(2), textStyle: { color: getBetRatingColor(item.rating) }, containerStyle: { marginTop: -5 } }}
  />
);


  render() {
    return (
     <View style={this.state.styles.container}>
     {this.state.loading &&
       <View style={this.state.styles.progressContainer}>
       <Progress.Circle
          size={Dimensions.get('window').width/4}
          indeterminate={true}
          color='black'
          thickness={20} />
        </View>
     }
    {!this.state.loading &&
      <View style={this.state.styles.container}>
      <PublisherBanner
        bannerSize="fullBanner"
        adUnitID={this.state.adUnitID}
        onDidFailToReceiveAdWithError={this.bannerError}
        onAdMobDispatchAppEvent={this.adMobEvent} />
      <FlatList
        data={this.state.bets}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      </View>
    }
      </View>
    );
  }
}

function setDataSource(component){
  if(component.state.event === 'against'){
    selectedBetsAgainst(component.state.type, component.state.token)
   .then( data => component.setState({bets : data, loading: false}))
   .catch((error) => component.props.navigation.navigate('Splash',{}));
  }else{
   selectedBets(component.state.type, component.state.market, component.state.event, component.state.token)
  .then( data => component.setState({bets : data, loading: false}))
  .catch((error) => component.props.navigation.navigate('Splash',{}));
 }
}


async function loadEvent(component, item){
component.props.navigation.navigate('Event',
  {  token: component.state.token,
     styles: component.state.styles,
     market: component.state.market,
     start: component.state.start,
     adUnitID: component.state.adUnitID,
     betType: component.state.event,
     adUnitRewardsID: component.state.adUnitRewardsID,
     label: item.home + ' vs '+item.away,
     event: {
       home: {
        type: component.state.type,
        country: item.country,
        competition: item.competition,
        id: item.homeId,
        label: item.home
      },
        away: {
          id: item.awayId,
          label: item.away
        }
     }
  });
}


export default SelectedBets;
