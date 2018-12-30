import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Progress from 'react-native-progress';
import { Dimensions } from 'react-native';
import {globalRatings} from "../api/DataService";
import { ListItem } from 'react-native-elements';
import {renderProgress} from "../util/RenderUtils";


class GlobalRatings extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     styles: props.navigation.state.params.styles,
     market: props.navigation.state.params.market,
     loading: true,
     teams :''
    };

  setDataSource(this);
}


_renderItem = ({item}) => (
  <ListItem
    onPress={() => this.props.navigation.navigate('TeamRating',
    {  token: this.state.token,
       styles: this.state.styles,
       market: this.state.market,
       teamRating: item
    })}
    title={item.team}
    badge={{ value:  getRating(this.state.market, item.marketRatings).toFixed(2), textStyle: { color: 'orange' }, containerStyle: { marginTop: -20 } }}
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
        data={this.state.teams}
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
  .then( data => component.setState({teams : data, loading: false}));
}


export default GlobalRatings;
