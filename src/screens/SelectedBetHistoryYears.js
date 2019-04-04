import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList, ScrollView } from 'react-native';
import * as Progress from 'react-native-progress';

import { ListItem } from 'react-native-elements'
import { Dimensions } from 'react-native';
import {betHistory} from "../api/DataService";
import {getBetRatingColor} from "../util/RenderUtils";


class SelectedBetHistoryYears extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     type: props.navigation.state.params.type,
     styles: props.navigation.state.params.styles,
     loading: true,
     history: '',
     adUnitID: props.navigation.state.params.adUnitID,
     adUnitRewardsID: props.navigation.state.params.adUnitRewardsID
    };

  /*  AdMobRewarded.setAdUnitID(this.state.adUnitRewardsID); // Test ID, Replace with your-admob-unit-id
    rewards();
*/
    setDataSource(this);
}


_renderItem = ({item}) => (
  <ListItem
    onPress={() => this.props.navigation.navigate('SelectedBetHistoryMonths',
    {  token: this.state.token,
       styles: this.state.styles,
       title: item.year,
       history: item.betHistoryMonths
    })}
    title={item.year}
    titleStyle={this.state.styles.titleListItem}
    subtitle={
      <View style={this.state.styles.listItem}>
      <FlatList
        data={item.betHistoryAccuracies}
        renderItem={this._renderAccuracyItem}
        keyExtractor={(item, index) => index.toString()}
      />
      </View>
    }
  />
);


_renderAccuracyItem = ({item}) => (
  <ListItem
    title={item.market+' '+item.event }
    titleStyle={this.state.styles.listItem}
    containerStyle={{ borderBottomWidth: 0 }}
    badge={{ value: getAverage(item).toFixed(2), textStyle: { color: getBetRatingColor(getAverage(item)) }, containerStyle: { marginTop: -5 } }}
    hideChevron
  />
);


  render() {
    return (
     <ScrollView style={this.state.styles.scrollViewContainer}>
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
      <View>
      <View>
      <ListItem
       title={'Overall'}
       titleStyle={this.state.styles.titleListItem}
       hideChevron
      />
      <FlatList
        data={this.state.history.betHistoryAccuracies}
        renderItem={this._renderAccuracyItem}
        keyExtractor={(item, index) => index.toString()}
      />
      </View>
      <ListItem
       title={'Breakdown By Year'}
       hideChevron
       titleStyle={this.state.styles.titleListItem}
       />
      <FlatList
        data={this.state.history.betHistoryYears}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
       </View>}
      </View>
      </ScrollView>
    );
  }
}

function getAverage(item){
  return (item.success / item.total) * 100;
}

function setDataSource(component){
  betHistory(component.state.type, component.state.token)
  .then( data => component.setState({history : data,
                                    loading: false}))
  .catch((error) => component.props.navigation.navigate('Splash',{}));
}

/*
async function rewards(){
  var x = await AdMobRewarded.requestAdAsync();
  var y = await AdMobRewarded.showAdAsync();
}
*/

export default SelectedBetHistoryYears;
