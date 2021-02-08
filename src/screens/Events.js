import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Progress from 'react-native-progress';
import { ListItem, Tile } from 'react-native-elements'
import { Dimensions } from 'react-native';
import {events} from "../api/DataService";
import {styles} from './Styles';


class Events extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
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


_renderMatch = ({item}) => (
  <ListItem
   onPress={() => this.props.navigation.navigate('Event',
   {  market: 'all',
      label: item.home.label + ' vs '+item.away.label,
      event: item,
      home: item.home.id,
      away: item.away.id,
      selectedBet: false,
      homeLabel: item.home.label,
      awayLabel: item.away.label,
      country: item.home.country,
      competition: item.home.competition
    })}
    title={
      <View>
        <Text style={styles.listItemSmall}>{item.home.label}</Text>
        <Text style={styles.listItemSmall}>{item.away.label}</Text>
      </View>
   }
   titleStyle={styles.listItem}
   containerStyle={{ borderBottomWidth: 0 }}
 />
);

_renderItem = ({item}) => (
  <ListItem
     title={
       <View>
         <Text style={styles.titleListItem}>{item.label}</Text>
       </View>
     }
     titleStyle={styles.listItem}
     containerStyle={{ borderBottomWidth: 0 }}

     subtitle={
       <FlatList
        data={item.upcomingEventResponses}
        renderItem={this._renderMatch}
        keyExtractor={(item, index) => index.toString()}
      />
     }
     hideChevron
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
          //thickness={20}
           />
        </View>
     }
     {!this.state.loading &&
       <View style={styles.container}>
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
    todaysEvents()
    .then( data =>
      component.setState({events : filterEvents(component.state.today, data.map(m => m['body'])), loading: false})
    )
    .catch((error) => {
        console.log(error);
      component.props.navigation.navigate('Splash',{});

    }
    );
  }
  else{
   events(component.state.competition)
   .then( data => component.setState({events : [data['body']], loading: false}))
   .catch((error) => component.props.navigation.navigate('Splash',{}));

 }
}

const toDate = (dateStr) => {
  const [day, month, year] = dateStr.split("-")
  return new Date(year, month - 1, day).setHours(0,0,0,0)
}

const todayFilter = new Date().setHours(0,0,0,0);

function filterEvents(today, events){
  if (today === 'false') {
    return events;
  }else{
    events.forEach((item, i) => {
      events[i].upcomingEventResponses = item.upcomingEventResponses.filter(f => toDate(f.eventDate) == todayFilter);
    });
    return events.filter(f => f.upcomingEventResponses.length > 0);

  }
}

function todaysEvents(){
    return Promise.all([
      events('scotland_1'),
      events('scotland_2'),
      events('scotland_3'),
      events('scotland_4'),
      events('england_1'),
      events('england_2'),
      events('england_3'),
      events('england_4'),
      events('italy_1'),
      events('italy_2'),
      events('spain_1'),
      events('spain_2'),
      events('german_1'),
      events('german_2'),
      events('holland_1'),
      events('belgium_1'),
      events('sweden_1'),
      events('portugal_1'),
      events('turkey_1'),
      events('greece_1'),
      events('denmark_1'),
      events('norway_1')
    ])
}


export default Events;
