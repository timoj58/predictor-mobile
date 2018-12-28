import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Progress from 'react-native-progress';
import { ListItem } from 'react-native-elements'
import { Dimensions } from 'react-native'
import { Rating } from 'react-native-elements';

import {selectedBets} from "../api/DataService";


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
     bets:''
    };

  setDataSource(this);
}


_renderItem = ({item}) => (
  <ListItem
    onPress={() => this.props.navigation.navigate('SelectedBet',
    {  token: this.state.token,
       styles: this.state.styles,
       bet: item
    })}
    title={item.home + ' vs '+item.away}
    titleStyle={this.state.styles.listItem}
    badge={{ value: item.rating, textStyle: { color: 'orange' }, containerStyle: { marginTop: -20 } }}
    subtitle={
      <View style={this.state.styles.listItem}>
         <Text style={this.state.styles.ratingText}>Competition Rating</Text>
           <Rating
           startingValue={item.countryRating/20}
           readonly
           paddingVertical={10}
           backgroundColor= {'#36454f'}
           ratingColor={'green'}
           imageSize={20}
           type={'custom'}
           ratingColor='green'
          />
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
          thickness={20} />
        </View>
     }
    {!this.state.loading &&
       <FlatList
        data={this.state.bets}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index}
      />}
      </View>
    );
  }
}

function setDataSource(component){
  selectedBets(component.state.type, component.state.market, component.state.event, component.state.token)
  .then( data => component.setState({bets : data, loading: false}));
}


export default SelectedBets;
