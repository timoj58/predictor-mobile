import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { Tile } from 'react-native-elements'
import {renderTile} from "../util/RenderUtils";


const type = 'FOOTBALL';

class Home extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     styles: props.navigation.state.params.styles,
     tiles: [
       {
         title: 'Betting',
         screen: 'Betting',
         imageSrc: require('./img/money.jpeg'),
         props: {
           token: props.navigation.state.params.token,
           styles: props.navigation.state.params.styles,
           type: type
         }
       },
       {
         title: 'Ratings',
         screen: 'GlobalRatingsHome',
         imageSrc: require('./img/stock-market-3.jpg'),
         props: {
           token: props.navigation.state.params.token,
           styles: props.navigation.state.params.styles
         }
       },
       {
         title: 'Countries',
         screen: 'Countries',
         imageSrc: require('./img/un-flags.jpg'),
         props: {
           token: props.navigation.state.params.token,
           styles: props.navigation.state.params.styles,
           type: type
         }
       }
     ]
    };

}

_renderTile = ({item}) => (
    renderTile(this, item)
);

  render() {
    return (
      <View style={this.state.styles.container}>
      <FlatList
        data={this.state.tiles}
        renderItem={this._renderTile}
        keyExtractor={(item, index) => index}
      />
      </View>
    );
  }
}


export default Home;
