import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Progress from 'react-native-progress';
import { ListItem, Tile } from 'react-native-elements'
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
     country: props.navigation.state.params.country === undefined ?
                  null : props.navigation.state.params.country,
     competition: props.navigation.state.params.competition === undefined ?
                  null : props.navigation.state.params.competition,
     loading: true,
     today: props.navigation.state.params.today === undefined ?
            props.today === undefined ? true : props.today :
            props.navigation.state.params.today,
     events:''
   };

    setDataSource(this);
}


_renderItem = ({item}) => (
  <ListItem
    onPress={() => this.props.navigation.navigate('Event',
    {  token: this.state.token,
       styles: this.state.styles,
       market: 'all',
       label: item.home.label + ' vs '+item.away.label,
       type: this.state.type,
       event: item,
       home: item.home.id,
       away: item.away.id,
       homeLabel: item.home.label,
       awayLabel: item.away.label,
       country: item.home.country,
       competition: item.home.competition
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
          size={Dimensions.get('window').width/4}
          indeterminate={true}
          color='black'
          thickness={20} />
        </View>
     }
     {!this.state.loading &&
       <View style={this.state.styles.container}>
       {this.state.events.length > 0 && <FlatList
        data={this.state.events}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index.toString()}
      />}
      {this.state.events.length == 0 &&
        <Tile
                 title={'No Events Today'}
                 titleStyle={{color: 'silver',fontWeight: 'bold'}}
                 icon={{ name: 'calendar-minus-o', type: 'font-awesome', color: 'silver', size: 100 }}
                 featured
                 width={Dimensions.get('window').width}
                 height={Dimensions.get('window').height}
                 imageSrc={require('../screens/img/charcoal.png')}
      />}
      </View>
     }
      </View>
    );
  }
}
/*
async function rewards(){
  var x = await AdMobRewarded.requestAdAsync();
  var y = await AdMobRewarded.showAdAsync();
}
*/
function setDataSource(component){
  console.log('rendering todays events');
  console.log(component.state.today);
  if(component.state.today === true){
    todaysEvents(component.state.type,component.state.token)
    .then( data => component.setState({events : data, loading: false}))
    .catch((error) => component.props.navigation.navigate('Splash',{}));
  }
  else{
   events(component.state.type, component.state.country, component.state.competition, component.state.token)
   .then( data => component.setState({events : data, loading: false}))
   .catch((error) => component.props.navigation.navigate('Splash',{}));

 }
}


export default Events;
