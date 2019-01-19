import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements'
import {competitions} from "../api/DataService";


class Country extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     type: props.navigation.state.params.type,
     country: props.navigation.state.params.country,
     styles: props.navigation.state.params.styles,
     competitions: '',
     adUnitID: props.navigation.state.params.adUnitID,
     adUnitRewardsID: props.navigation.state.params.adUnitRewardsID
   };

   setDataSource(this);
}


_renderItem = ({item}) => (
  <ListItem
    onPress={() => this.props.navigation.navigate('Competition',
    {
      token: this.state.token,
      type: this.state.type,
      country: this.state.country,
      styles: this.state.styles,
      competition: item.competition,
      label: item.label,
      adUnitID: this.state.adUnitID,
      adUnitRewardsID: this.state.adUnitRewardsID
     })}
    title={item.label}
    titleStyle={this.state.styles.listItem}

  />
);


  render() {
    return (
     <View style={this.state.styles.container}>
     <FlatList
        data={this.state.competitions}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      </View>
    );
  }
}

function setDataSource(component){
  competitions(component.state.type, component.state.country, component.state.token)
  .then( data => component.setState({competitions : data}))
  .catch((error) => component.props.navigation.navigate('Splash',{}));

}

export default Country;
