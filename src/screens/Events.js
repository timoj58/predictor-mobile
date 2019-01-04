import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Progress from 'react-native-progress';
import { ListItem } from 'react-native-elements'
import { Dimensions } from 'react-native';
import {events} from "../api/DataService";
import {todaysEvents} from "../api/DataService";
import {expires} from "../util/TokenUtils";
import {refresh} from "../api/AuthService";


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
     today: props.navigation.state.params.today,
     events:''
    };

  refreshToken(this);
  setDataSource(this);
}


_renderItem = ({item}) => (
  <ListItem
    onPress={() => this.props.navigation.navigate('Event',
    {  token: this.state.token,
       styles: this.state.styles,
       market: 'all',
       label: item.home.label + ' vs '+item.away.label,
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
        keyExtractor={(item, index) => index.toString()}
      />}
      </View>
    );
  }
}

function setDataSource(component){
  if(component.state.today === true){
    todaysEvents(component.state.type,component.state.token)
    .then( data => {
      console.log(data);
      component.setState({events : data, loading: false});
    });
  }
  else{
   events(component.state.type, component.state.country, component.state.competition, component.state.token)
   .then( data => component.setState({events : data, loading: false}));
 }
}

async function refreshToken(component){
  if(expires(component.state.start)){
    refresh(component.state.token).then(token => component.setState({token: token}) )
  }
}


export default Events;
