import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import {countriesAndCompetitions} from "../api/DataService";
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
     countriesAndCompetitions: ''
   };

   setDataSource(this);

}

_renderCompetition = ({item}) => (
  <ListItem
    title={item.label}
    titleStyle={this.state.styles.listItem}
    containerStyle={{ borderBottomWidth: 0 }}
    onPress={() => this.props.navigation.navigate('Competition',
      {
        token: this.state.token,
        type: this.state.type,
        styles: this.state.styles,
        competition: item.competition,
        country: item.country,
        label: item.label
      })}
   />
);


_renderItem = ({item}) => (
  <ListItem
    title={item.countryResponse.country}
    titleStyle={this.state.styles.titleListItem}
    hideChevron
    containerStyle={{ borderBottomWidth: 0 }}
    subtitle={
      <View>
      <FlatList
        data={item.competitionResponses}
        renderItem={this._renderCompetition}
        keyExtractor={(item, index) => index.toString()}
      />
      </View>
    }
   />
);



  render() {
    return (
     <View style={this.state.styles.container}>
     <FlatList
       data={this.state.countriesAndCompetitions}
       renderItem={this._renderItem}
       keyExtractor={(item, index) => index.toString()}
     />
   </View>
    );
  }
}

async function setDataSource(component){
  countriesAndCompetitions(component.state.type, component.state.token).then(
    data => component.setState({countriesAndCompetitions : data}))
    .catch((error) => component.props.navigation.navigate('Splash',{}));

}



export default Countries;
