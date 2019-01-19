import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Progress from 'react-native-progress';
import {team} from "../api/DataService";
import { Tile } from 'react-native-elements'
import {renderTile} from "../util/RenderUtils";
import { Dimensions } from 'react-native'


class Team extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     id: props.navigation.state.params.id,
     disabledButton: true,
     styles: props.navigation.state.params.styles,
     loading: true,
     team: '',
     tiles: []
};

   setDataSource(this);
}


_renderTile = ({item}) => (
  renderTile(this, item));


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
         data={this.state.tiles}
         renderItem={this._renderTile}
         keyExtractor={(item, index) => index.toString()}
       />
      }
      </View>
    );
  }
}

function setDataSource(component){
  team(component.state.id, component.state.token)
  .then(data => update(component, data))
  .catch((error) => component.props.navigation.navigate('Splash',{}));  
}

 function update(component, team){
  component.setState({
    team: team,
    loading: false,
     tiles: [
       {
          title: 'Matches',
          screen: 'MatchYears',
          icon: 'trophy',
          props: {
           token: component.state.token,
           styles: component.state.styles,
           matches: team.matchesByYear,
           label: team.team.label
         }
      },
      {
        title: 'Players',
        screen: 'Players',
        icon: 'group',
        props: {
          token: component.state.token,
          styles: component.state.styles,
          teamId: team.team.id,
          label: team.team.label
      }
    },
    {
      title: 'Accuracy',
      screen: 'Accuracy',
      icon: 'crosshairs',
      props: {
        token: component.state.token,
        styles: component.state.styles,
        key: team.team.label
     }
   }
  ]
    });
}

export default Team;
