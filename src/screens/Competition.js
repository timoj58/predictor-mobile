import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { Tile } from 'react-native-elements'
import {renderTile} from "../util/RenderUtils";


class Competition extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     type: props.navigation.state.params.type,
     country: props.navigation.state.params.country,
     styles: props.navigation.state.params.styles,
     competition: props.navigation.state.params.competition,
     tiles: [
        {
          title: 'Teams',
          screen: 'Teams',
          imageSrc: require('./img/team.jpeg'),
          props: {
            token: props.navigation.state.params.token,
            type: props.navigation.state.params.type,
            country: props.navigation.state.params.country,
            styles: props.navigation.state.params.styles,
            competition: props.navigation.state.params.competition
          }
        },
        {
          title: 'Events',
          screen: 'Events',
          imageSrc: require('./img/calendar.jpg'),
          props: {
            token: props.navigation.state.params.token,
            type: props.navigation.state.params.type,
            country: props.navigation.state.params.country,
            styles: props.navigation.state.params.styles,
            competition: props.navigation.state.params.competition
          }
        },
        {
        title: 'Accuracy',
        screen: 'Accuracy',
        imageSrc: require('./img/target.png'),
        props: {
          token: props.navigation.state.params.token,
          styles: props.navigation.state.params.styles,
          key: props.navigation.state.params.competition
        }
      }
     ]
   };

}


_renderTile = ({item}) => (
  renderTile(this, item));


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


export default Competition;
