import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Progress from 'react-native-progress';
import { ListItem, Tile, Rating } from 'react-native-elements'
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
    title={
      <View>
        <Text style={this.state.styles.listItem}>{item.home}</Text>
        <Text style={this.state.styles.listItem}>{item.away}</Text>
      </View>
    }
    titleStyle={this.state.styles.listItem}
    containerStyle={{ borderBottomWidth: 0 }}
    badge={{ value: item.eventType, textStyle: { color: 'green', fontSize: 20 }, containerStyle: {backgroundColor: 'silver'} }}
    subtitle={
      <View>
      <Rating
         type='custom'
         imageSize={20}
         readonly
         ratingColor='green'
         ratingBackgroundColor='#36454f'
         startingValue={getRating(item)}/>
      </View>
    }
  />
);


  render() {
    return (
     <View style={this.state.styles.container}>
     {this.state.loading &&
       <View style={this.state.styles.progressContainer}>
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
   selectedBets(component.state.type, component.state.token)
  .then( data => component.setState({bets : data, loading: false}))
  .catch((error) => component.props.navigation.navigate('Splash',{}));
}

const reducer = (accumulator, currentValue) => accumulator + currentValue;

function getRating(item){

  var score;

  if(item.market === 'goals'){
    //not this is wrong...need to check over + under
    if(item.event === '-2.5'){
     score = item.predictions.result.filter(f => f.key < 3).map(m => m.score).reduce(reducer).toFixed(2);
    }else{
      score = item.predictions.result.filter(f => f.key >= 3).map(m => m.score).reduce(reducer).toFixed(2);
    }
  }else if(item.market === 'results'){
    score = item.predictions.result.filter(f => f.key === item.event).shift().score.toFixed(2);
  }

  return score / 100 * 5;
}


async function loadEvent(component, item){

console.log(item);

component.props.navigation.navigate('EventRating',
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
     selectedBet: true,
     selectedBetResult: item.event,
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
