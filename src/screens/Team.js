import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import {teamForm} from "../api/DataService";


class Team extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     id: props.navigation.state.params.id,
     team: {
      id: '',
      matches: [
     {
       date: "2018-12-13T19:39:03.697Z",
       headline: "string",
       matchId: "string",
       others: [
         "string"
       ],
       starting: [
         {
           duration: 0,
           events: [
             {
               label: "string",
               time: "string"
             }
           ],
           name: "string"
         }
       ],
       subs: [
         {
           duration: 0,
           event: [
             {
               label: "string",
               time: "string"
             }
           ],
           name: "string"
         }
       ],
       teamStats: {}
     }
   ],
   team: {
     competition: "string",
     country: "string",
     id: "string",
     label: "string",
     latLng: {
       latitude: 0,
       longitude: 0
     },
     type: "string"
   },
   type: "string"
 }
};

   setDataSource(this);
}


_renderItem = ({item}) => (
  <Button
   id={item.id}
    onPress={() => this.props.navigation.navigate('Team',
    {
      token: this.state.token,
      id: item.id
    })}
    title={item.label}
  />
);


  render() {
    return (
     <View style={styles.container}>
     <Text>{this.state.team.team.label}</Text>
      </View>
    );
  }
}

function setDataSource(component){
  teamForm(component.state.id, component.state.token)
  .then( data => component.setState({team : data}))
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1be215',
    alignItems: 'stretch',
    justifyContent: 'center',
  }
});

export default Team;
