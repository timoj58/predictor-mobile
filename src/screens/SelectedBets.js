import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Progress from 'react-native-progress';
import { ListItem, Tile } from 'react-native-elements'
import { Dimensions } from 'react-native'

import {selectedBets} from "../api/DataService";
import {selectedBetsAgainst} from "../api/DataService";
import {getBetRatingColor} from "../util/RenderUtils";
import {renderListItem} from "../util/RenderUtils";

class SelectedBets extends React.Component {
  constructor(props) {
   super(props);

  console.log(props);

   this.state = {
     token: props.navigation.state.params.token,
     type: props.navigation.state.params.type,
     market: props.market,
     event: props.event,
     styles: props.navigation.state.params.styles,
     loading: true,
     start: props.navigation.state.params.start,
     bets:''
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
       {this.state.bets.length > 0 &&<FlatList
        data={this.state.bets}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index.toString()}
      />}
      {this.state.bets.length == 0 &&
        <Tile
                 title={'No Bets'}
                 titleStyle={{color: 'silver',fontWeight: 'bold'}}
                 icon={{ name: 'warning', type: 'font-awesome', color: 'silver', size: 100 }}
                 featured
                 width={Dimensions.get('window').width}
                 height={Dimensions.get('window').height}
                 imageSrc={require('../screens/img/charcoal.png')}
      />}
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
     home: item.homeId,
     homeLabel: item.home,
     away: item.awayId,
     type: component.state.type,
     awayLabel: item.away,
     country: item.country,
     competition: item.competition,
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
