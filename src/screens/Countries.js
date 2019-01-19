import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import {countries} from "../api/DataService";
import {expires} from "../util/TokenUtils";
import {refresh} from "../api/AuthService";
import { ListItem } from 'react-native-elements'



class Countries extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     type: props.navigation.state.params.type,
     styles: props.navigation.state.params.styles,
     adUnitID: props.navigation.state.params.adUnitID,
     adUnitRewardsID: props.navigation.state.params.adUnitRewardsID,
     countries: ''
   };

   setDataSource(this);

}

_renderItem = ({item}) => (
  <ListItem
    onPress={() => this.props.navigation.navigate('Country',
    {
      token: this.state.token,
      type: this.state.type,
      styles: this.state.styles,
      country: item.country,
      adUnitID: this.state.adUnitID,
      adUnitRewardsID: this.state.adUnitRewardsID
    })}
    title={item.country}
    titleStyle={this.state.styles.listItem}
   />
);



  render() {
    return (
     <View style={this.state.styles.container}>
     <FlatList
       data={this.state.countries}
       renderItem={this._renderItem}
       keyExtractor={(item, index) => index.toString()}
     />
   </View>
    );
  }
}

async function setDataSource(component){
  countries(component.state.type, component.state.token).then(
    data => component.setState({countries : data}))
    .catch((error) => component.props.navigation.navigate('Splash',{}));

}



export default Countries;
