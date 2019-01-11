import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Progress from 'react-native-progress';
import { Dimensions } from 'react-native';
import {globalRatings} from "../api/DataService";
import { ListItem } from 'react-native-elements';
import {getBetRatingColor} from "../util/RenderUtils";



class GlobalRatingRanked extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     styles: props.navigation.state.params.styles,
     market: props.navigation.state.params.market,
     loading: true,
     teams :'',
     boundaries: []
    };

  setDataSource(this);
}


_renderItem = ({item}) => (
  <ListItem
    onPress={() => this.props.navigation.navigate('GlobalRatings',
    {  token: this.state.token,
       styles: this.state.styles,
       market: this.state.market,
       label: item.title,
       teams: this.state.teams.slice(item.start, item.end)
    })}
    title={item.title}
    titleStyle={this.state.styles.listItem}
  />
);


  render() {
    return (
     <View style={this.state.styles.container}>
     {this.state.loading &&
       <View style={this.state.styles.progressContainer}>
       <Progress.Circle
          size={Dimensions.get('window').width/2}
          indeterminate={true}
          color='black'
          thickness={50}
        />
        </View>
     }
     {!this.state.loading &&
       <FlatList
        data={this.state.boundaries}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index.toString()}
      />}
      </View>
    );
  }
}

function getRating(market, marketRatings){
  return marketRatings.filter(f => f.market === market).shift().rating;
}

function setDataSource(component){
  globalRatings(component.state.market, component.state.token)
  .then( data => component.setState({teams : data, loading: false, boundaries: createBoundaries(data.length)}));
}

function createBoundaries(total){
   var boundaries = [];
   var boundaryTotal = 50;

   var noOfBoundaries = Math.ceil(total / boundaryTotal);

   for (var i = 0; i < noOfBoundaries; i++){

    var title = (i*boundaryTotal+1)+' - '+(i*boundaryTotal+boundaryTotal);
    if(i === 0){
      title = 'Top '+boundaryTotal;
    }

     boundaries.push(
       {
         title: title,
         start: i*boundaryTotal,
         end: (i*boundaryTotal) + (boundaryTotal-1)
       });
     }

 return boundaries;
}

export default GlobalRatingRanked;
