import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Progress from 'react-native-progress';
import { Dimensions } from 'react-native';
import {competitionRatings} from "../api/DataService";
import { ListItem, Avatar } from 'react-native-elements';
import {renderProgress} from "../util/RenderUtils";
import {getBetRatingColor} from "../util/RenderUtils";
import {getAvatarColor} from "../util/RenderUtils";


class CompetitionRatings extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     styles: props.navigation.state.params.styles,
     loading: true,
     competitions :'',
     market: props.navigation.state.params.market
   };


    setDataSource(this);
}


_renderItem = ({item}) => (
  <ListItem
    title={item.competition +' ('+item.type+')'}
    badge={{ value: item.accuracy.toFixed(2), textStyle: { color: getBetRatingColor(item.accuracy) }, containerStyle: { marginTop: -5 } }}
    titleStyle={this.state.styles.listItem}
    onPress={() => this.props.navigation.navigate('PreviousFixtures',
    {  token: this.state.token,
       styles: this.state.styles,
       market: convertMarket(item.type),
       event: item.type,
       competition: item.competition,
       title: item.competition,
       label: item.competition
     })}
   avatar={<Avatar
             rounded
             icon={{name: item.movement, color: getAvatarColor(item.movement), type: 'font-awesome'}}
            />}
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
          size={Dimensions.get('window').width/4}
          indeterminate={true}
          color='black'
          thickness={50}
        />
        </View>
     }
     {!this.state.loading &&
       <View style={this.state.styles.container}>
     <FlatList
        data={this.state.competitions}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
     </View>
    }
      </View>
    );
  }
}

function convertMarket(market){
  if(market === 'goals 2.5' || market === 'goals -2.5'){
    return 'PREDICT_GOALS';
  }
  return 'PREDICT_RESULTS';
}

function getRating(market, marketRatings){
  return marketRatings.filter(f => f.market === market).shift().rating;
}

function setDataSource(component){
  competitionRatings(component.state.token)
  .then( data =>
      component.setState({competitions : data, loading: false})
    )
  .catch((error) => component.props.navigation.navigate('Splash',{}));
}


export default CompetitionRatings;
