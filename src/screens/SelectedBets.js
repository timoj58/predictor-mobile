import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Progress from 'react-native-progress';

import {selectedBets} from "../api/DataService";


class SelectedBets extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     market: props.navigation.state.params.market,
     event: props.navigation.state.params.event,
     loading: true,
     bets:''
    };

  setDataSource(this);
}


_renderItem = ({item}) => (
  <Button
    onPress={() => this.props.navigation.navigate('SelectedBet',
    {  token: this.state.token,
       bet: item
    })}
    title={item.home + ' vs '+item.away +' ' +item.rating +' ('+item.countryRating+')' }
  />
);


  render() {
    return (
     <View style={styles.container}>
     {this.state.loading && <Progress.Circle size={50} indeterminate={true} />}
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
  selectedBets(component.state.market, component.state.event, component.state.token)
  .then( data => component.setState({bets : data, loading: false}));
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1be215',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  }
});

export default SelectedBets;
