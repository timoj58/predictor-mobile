import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';


import { Dimensions, StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { Tile } from 'react-native-elements'
import {renderTile} from "../util/RenderUtils";
import {machineLoadingStatus} from "../api/DataService";

const type = 'FOOTBALL';
//const adUnitID = 'ca-app-pub-3940256099942544/6300978111';
const adUnitID = 'ca-app-pub-8745028067803834/5416520976';
const adUnitRewardsID = 'ca-app-pub-3940256099942544/5224354917';

class Home extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     styles: props.navigation.state.params.styles,
     status: false,
     tilesLeft: [
       {
         title: 'Today',
         screen: 'Events',
         icon: 'calendar-check-o',
         props: {
           token: props.navigation.state.params.token,
           styles: props.navigation.state.params.styles,
           today: true,
           country: null,
           competition: null,
           type: type,
           adUnitID: adUnitID,
           adUnitRewardsID: adUnitRewardsID,
           label: 'Todays Events'
         }
       },
       {
         title: 'Betting',
         screen: 'Betting',
         icon: 'dollar',
         props: {
           token: props.navigation.state.params.token,
           styles: props.navigation.state.params.styles,
           type: type,
           adUnitID: adUnitID,
           adUnitRewardsID: adUnitRewardsID
         }
       }
     ],
     tilesRight: [
       {
         title: 'Ratings',
         screen: 'GlobalRatingsHome',
         icon: 'bar-chart-o',
         props: {
           token: props.navigation.state.params.token,
           type: type,
           adUnitID: adUnitID,
           adUnitRewardsID: adUnitRewardsID,
           styles: props.navigation.state.params.styles
         }
       },
       {
         title: 'Leagues',
         screen: 'Countries',
         icon: 'globe',
         props: {
           token: props.navigation.state.params.token,
           styles: props.navigation.state.params.styles,
           adUnitID: adUnitID,
           adUnitRewardsID: adUnitRewardsID,
           type: type
         }
       }
     ]
    };

    statusCheck(this);
}

_renderTile = ({item}) => (
    renderTile(this, item)
);

  render() {
    return (
      <View style={this.state.styles.container}>
      {this.state.status &&
        <Tile
               title={'Machine Training...'}
               titleStyle={{color: 'yellow',fontWeight: 'bold'}}
               icon={{ name: 'info', type: 'font-awesome', color: 'yellow', size: 100 }}
               featured
               width={Dimensions.get('window').width}
               height={Dimensions.get('window').height}
               imageSrc={require('../screens/img/charcoal.png')}
               />}
      {!this.state.status &&
      <FlatList
              data={this.state.tilesLeft.concat(this.state.tilesRight)}
              renderItem={this._renderTile}
              keyExtractor={(item, index) => index.toString()}
            />}
          </View>
    );
  }
}

async function statusCheck(component){
  machineLoadingStatus(component.state.token)
   .then(data => component.setState({status: data.status}));
}


export default Home;
