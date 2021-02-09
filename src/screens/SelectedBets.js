import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Progress from 'react-native-progress';
import { ListItem, Tile, Rating, Avatar, Badge } from 'react-native-elements'
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
     carousel: [],
     carouselIndex: 0,
     blink: false,
     blinkRating: false
    };

       // Change the state every second
       setInterval(() => {
           this.setState(previousState => {
             return { blink: !previousState.blink,
                      carouselIndex: previousState.carouselIndex < previousState.carousel.length-1 ?
                                     previousState.carouselIndex + 1 : 0
             };
           });
         },
         // Define any blinking time.
       6000);


  setDataSource(this);
}

_renderRating = (item) => (
  <Badge status='success' value={item.rating.toFixed(0)+"%"} containerStyle={{
    backgroundColor: 'gold'}}
  textStyle={{color: 'black',fontSize: 14, fontWeight: 'bold'}} />);


_renderItem = ({item}) => (
  <ListItem
  hideChevron
    title={
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.listItemWithSize}>{item.label.substring(0,17)+(item.label.length > 17 ? '...' : '')+' '}</Text>
         {this._renderRating(item)}
      </View>
    }
   subtitle={
     <View>
       <Text style={styles.listItemSmallGrey}>{item.subtitle}</Text>
     </View>
   }
   avatar={<Avatar
    rounded
    icon={{name: getAvatar(item.market), type: 'font-awesome', size: 28, color: "silver"}}
    overlayContainerStyle={{backgroundColor: '#36454f', paddingRight: 5}}
    />}
    containerStyle={{ borderBottomWidth: 0 }}
    badge={{ value: item.market.toLowerCase().replace("yellow_", "").replace("win", "").replace("goals", "goal").replace("assists", "assist"),
             textStyle: { color: "white", fontSize: 18 },
             containerStyle: { backgroundColor: "green",
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
       {this.state.carousel.length > 0 &&<FlatList
        data={this.state.carousel[this.state.carouselIndex]}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index.toString()}
      />}
    </View>
    }
      </View>
    );
  }
}


async function setDataSource(component){
   allSelectedBets()
  .then( data => {
    var filtered = data.flatMap(m => m['body']).sort((a,b) => b.rating - a.rating)
    .filter(f => toDate(f.date) >= todayFilter);
    component.setState(
       { loading: false,
        carousel: [
                  filtered.filter(f => f.market === 'homeWin'),
                  filtered.filter(f => f.market === 'awayWin'),
                  filtered.filter(f => f.market === 'draw'),
                  filtered.filter(f => f.market === 'GOALS'),
                  filtered.filter(f => f.market === 'ASSISTS'),
                  filtered.filter(f => f.market === 'YELLOW_CARD')
                 ]});
   }
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


export default SelectedBets;
