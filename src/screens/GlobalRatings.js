import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Progress from 'react-native-progress';
import { Dimensions } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import {getBetRatingColor} from "../util/RenderUtils";
import {getAvatarColor} from "../util/RenderUtils";
import {
  PublisherBanner
} from 'expo';



class GlobalRatings extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     styles: props.navigation.state.params.styles,
     market: props.navigation.state.params.market,
     teams : props.navigation.state.params.teams,
     adUnitID: props.navigation.state.params.adUnitID,
     adUnitRewardsID: props.navigation.state.params.adUnitRewardsID
  };

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
    avatar={<Avatar
             rounded
             icon={{name: item.movement, color: getAvatarColor(item.movement), type: 'font-awesome'}}
            />}
    badge={{ value:  getRating(this.state.market, item.marketRatings).toFixed(2), textStyle: { color: getBetRatingColor(getRating(this.state.market, item.marketRatings)) }, containerStyle: { marginTop: -5 } }}
    titleStyle={this.state.styles.listItem}
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
       <PublisherBanner
         bannerSize="fullBanner"
         adUnitID={this.state.adUnitID}
         onDidFailToReceiveAdWithError={this.bannerError}
         onAdMobDispatchAppEvent={this.adMobEvent} />
       <FlatList
        data={this.state.teams}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
     </View>
    }
      </View>
    );
  }
}

function getRating(market, marketRatings){
  return marketRatings.filter(f => f.market === market).shift().rating;
}


export default GlobalRatings;
