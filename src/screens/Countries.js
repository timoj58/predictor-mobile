import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import {countriesAndCompetitions} from "../api/DataService";
import { ListItem } from 'react-native-elements'
import * as Progress from 'react-native-progress';
import { Dimensions } from 'react-native'

import {styles} from './Styles';



class Countries extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     countriesAndCompetitions: '',
     loading: true
   };

   setDataSource(this);

}

_renderCompetition = ({item}) => (
  <ListItem
    title={item.label}
    titleStyle={styles.listItemSmall}
    containerStyle={{ borderBottomWidth: 0 }}
    onPress={() => this.props.navigation.navigate('Competition',
      {
        competition: item.competition,
        country: item.country,
        label: item.label
      })}
   />
);


_renderItem = ({item}) => (
  <ListItem
    title={item.countryResponse.country}
    titleStyle={styles.titleListItem}
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
     <View style={styles.container}>
     {this.state.loading &&
       <View style={styles.progressContainer}>
       <Progress.Bar
          size={Dimensions.get('window').width/4}
          indeterminate={true}
          color='black'
          height={10}
        //  thickness={20}
          />
        </View>
     }

     {!this.state.loading &&
     <FlatList
       data={this.state.countriesAndCompetitions}
       renderItem={this._renderItem}
       keyExtractor={(item, index) => index.toString()}
     />}
   </View>
    );
  }
}

async function setDataSource(component){
  countriesAndCompetitions().then(
    data => {
      console.log(data);
      component.setState({countriesAndCompetitions : data['body'], loading: false});
    }
    )
    .catch((error) => component.props.navigation.navigate('Splash',{}));

}



export default Countries;
