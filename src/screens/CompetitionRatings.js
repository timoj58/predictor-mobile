import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Progress from 'react-native-progress';
import { Dimensions } from 'react-native';
import {competitionRatings} from "../api/DataService";
import { ListItem } from 'react-native-elements';
import {renderProgress} from "../util/RenderUtils";
import {getBetRatingColor} from "../util/RenderUtils";



class CompetitionRatings extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     styles: props.navigation.state.params.styles,
     loading: true,
     competitions :''
    };

  setDataSource(this);
}


_renderItem = ({item}) => (
  <ListItem
    title={item.competition +' '+item.type}
    badge={{ value: item.accuracy.toFixed(2), textStyle: { color: getBetRatingColor(item.accuracy) }, containerStyle: { marginTop: -5 } }}
    titleStyle={this.state.styles.listItem}
    hideChevron
    subtitle={
      <View style={this.state.styles.listItem}>
          <Text style={this.state.styles.ratingText}>{item.success} / {item.total}</Text>
      </View>
      }
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
        data={this.state.competitions}
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
  competitionRatings(component.state.token)
  .then( data => component.setState({competitions : data, loading: false}));
}


export default CompetitionRatings;
