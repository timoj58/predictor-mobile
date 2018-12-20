import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Progress from 'react-native-progress';

import {events} from "../api/DataService";


class Events extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     type: props.navigation.state.params.type,
     country: props.navigation.state.params.country,
     competition: props.navigation.state.params.competition,
     loading: true,
     events:''
    };

  setDataSource(this);
}


_renderItem = ({item}) => (
  <Button
    onPress={() => this.props.navigation.navigate('Event',
    {  token: this.state.token,
       event: item
    })}
    title={item.home.label + ' vs '+item.away.label}
  />
);


  render() {
    return (
     <View style={styles.container}>
     {this.state.loading && <Progress.Circle size={50} indeterminate={true} />}
     {!this.state.loading &&
       <FlatList
        data={this.state.events}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index}
      />}
      </View>
    );
  }
}

function setDataSource(component){
  events(component.state.type, component.state.country, component.state.competition, component.state.token)
  .then( data => component.setState({events : data, loading: false}));
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1be215',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  }
});

export default Events;
