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
     loading: true,
     team: ''
};

   setDataSource(this);
}


  render() {
    return (
     <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1be215',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  }
});

export default Team;
