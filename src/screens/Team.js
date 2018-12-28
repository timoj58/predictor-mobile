import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Progress from 'react-native-progress';
import {team} from "../api/DataService";


class Team extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     id: props.navigation.state.params.id,
     disabledButton: true,
     styles: props.navigation.state.params.styles,
     loading: true,
     team: ''
};

   setDataSource(this);
}


  render() {
    return (
     <View style={this.state.styles.container}>
     {this.state.loading && <Progress.Circle size={50} indeterminate={true} />}

     {!this.state.loading &&
       <Button
       onPress={() => this.props.navigation.navigate('MatchYears',
       {
          token: this.state.token,
          matches: this.state.team.matchesByYear
       })}
       disabled={this.state.disabledButton}
       title='Matches'
     />}
     {!this.state.loading &&
       <Button
       onPress={() => this.props.navigation.navigate('Players',
       {
         token: this.state.token,
         teamId: this.state.team.team.id
       })}
       disabled={this.state.disabledButton}
       title='Players'
     />}
     {!this.state.loading &&
       <Button
       onPress={() => this.props.navigation.navigate('Accuracy',
       {
         token: this.state.token,
         key: this.state.team.team.label
       })}
       disabled={this.state.disabledButton}
       title='Accuracy'
     />}
      </View>
    );
  }
}

function setDataSource(component){
  team(component.state.id, component.state.token)
  .then(data =>
    component.setState({team : data, disabledButton: false, loading: false})
  )
}

export default Team;
