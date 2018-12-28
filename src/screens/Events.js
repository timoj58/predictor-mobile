import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Progress from 'react-native-progress';
import { ListItem } from 'react-native-elements'
import { Dimensions } from 'react-native';
import {events} from "../api/DataService";


class Events extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     type: props.navigation.state.params.type,
     styles: props.navigation.state.params.styles,
     country: props.navigation.state.params.country,
     competition: props.navigation.state.params.competition,
     loading: true,
     events:''
    };

  setDataSource(this);
}


_renderItem = ({item}) => (
  <ListItem
    onPress={() => this.props.navigation.navigate('Event',
    {  token: this.state.token,
       styles: this.state.styles,
       event: item
    })}
    title={item.home.label + ' vs '+item.away.label}
    titleStyle={this.state.styles.listItem}
  />
);


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


export default Events;
