import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Progress from 'react-native-progress';
import { ListItem, Tile, Rating, Avatar } from 'react-native-elements'
import { Dimensions } from 'react-native'

import {selectedBets} from "../api/DataService";
import {getBetRatingColor} from "../util/RenderUtils";
import {renderListItem} from "../util/RenderUtils";

import {styles} from './Styles';


class SelectedBets extends React.Component {
  constructor(props) {
   super(props);

  console.log(props);

   this.state = {
     market: props.market,
     event: props.event,
     loading: true,
     start: props.navigation.state.params.start,
     bets:'',
     blink: false,
     blinkRating: false
    };

       // Change the state every second
       setInterval(() => {
           this.setState(previousState => {
             return { blink: !previousState.blink};
           });
         },
         // Define any blinking time.
       6000);

       // Change the state every second
       setInterval(() => {
           this.setState(previousState => {
             return { blinkRating: !previousState.blinkRating};
           });
         },
         // Define any blinking time.
       400);


  setDataSource(this);
}


_renderItem = ({item}) => (
  <ListItem
  hideChevron
    title={
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.listItemWithSize}>{item.label}</Text>
        <Rating style={{paddingTop: 4}}
          type='custom'
          imageSize={18}
          readonly
          ratingColor={getRatingBackground(this.state.blink, this.state.blinkRating, item.market)}
          ratingBackgroundColor='#36454f'
          startingValue={item.rating.toFixed(0) / 100 * 5}/>
      </View>
    }
   subtitle={
     <View>
       <Text style={styles.listItemSmallGrey}>{item.subtitle}</Text>
     </View>
   }
   avatar={<Avatar
    rounded
    icon={{name: getAvatar(item.market), type: 'font-awesome', size: 28, color: getAvatarColor(item.market)}}
    overlayContainerStyle={{backgroundColor: '#36454f', paddingRight: 5}}
    />}
    containerStyle={{ borderBottomWidth: 0 }}
    badge={{ value: item.market.toLowerCase().replace("yellow_", "").replace("win", "").replace("goals", "goal").replace("assists", "assist"),
             textStyle: { color: getBlinkText(this.state.blink, item.market), fontSize: 18 },
             containerStyle: { backgroundColor: getBlinkBackground(this.state.blink, item.market),
                borderBottomWidth: 0, elevation: 0 }}}
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
      <View style={styles.container}>
       {this.state.bets.length > 0 &&<FlatList
        data={this.state.bets}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index.toString()}
      />}
      </View>
    }
      </View>
    );
  }
}

function getRatingBackground(blink, blinkRating, market){
    if(blinkRating && blink && (market === 'GOALS' || market === 'ASSISTS' || market === 'YELLOW_CARD')){
      return "green";
    }
    if(!blinkRating && blink && (market === 'GOALS' || market === 'ASSISTS' || market === 'YELLOW_CARD')){
      return "#36454f";
    }
    if(!blinkRating && !blink && (market === 'homeWin' || market === 'awayWin' || market === 'draw')){
      return "gold";
    }
    return "#36454f";
  }


function getBlinkBackground(blink, market){
  if(blink && (market === 'GOALS' || market === 'ASSISTS' || market === 'YELLOW_CARD')){
    return "green";
  }
  if(!blink && (market === 'GOALS' || market === 'ASSISTS' || market === 'YELLOW_CARD')){
    return "#36454f";
  }
  if(!blink && (market === 'homeWin' || market === 'awayWin' || market === 'draw')){
    return "gold";
  }
  return "#36454f";
}

function getBlinkText(blink, market){
  if(blink && (market === 'GOALS' || market === 'ASSISTS' || market === 'YELLOW_CARD')){
    return "white";
  }
  if(!blink && (market === 'GOALS' || market === 'ASSISTS' || market === 'YELLOW_CARD')){
    return "#36454f";
  }
  if(!blink && (market === 'homeWin' || market === 'awayWin' || market === 'draw')){
    return "black";
  }
  return "#36454f";
}

async function setDataSource(component){
   allSelectedBets()
  .then( data =>
    component.setState({bets : data.flatMap(m => m['body']).sort((a,b) => b.rating - a.rating)
    .filter(f => toDate(f.date) >= todayFilter), loading: false})
  )
  .catch((error) =>  component.props.navigation.navigate('Splash',{})
  );
}

function allSelectedBets(){
    return Promise.all([
      selectedBets('homewin'),
      selectedBets('awaywin'),
      selectedBets('draw'),
      selectedBets('goals'),
      selectedBets('assists'),
      selectedBets('yellow_card')
    ])
}

const todayFilter = new Date().setHours(0,0,0,0);

const toDate = (dateStr) => {
  const [day, month, year] = dateStr.split("-")
  return new Date(year, month - 1, day).setHours(0,0,0,0)
}

function getAvatar(market){
   if(market === 'draw' || market === 'homeWin' || market === 'awayWin'){
     return "trophy";
   }
   return "user";
}

function getAvatarColor(market){
   if(market === 'draw' || market === 'homeWin' || market === 'awayWin'){
     return "gold";
   }
   return "silver";
}


export default SelectedBets;
