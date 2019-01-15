import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Progress from 'react-native-progress';
import { Dimensions } from 'react-native';
import {globalRatings} from "../api/DataService";
import {allTeams} from "../api/DataService";
import { ListItem, SearchBar } from 'react-native-elements';
import {getBetRatingColor} from "../util/RenderUtils";



class GlobalRatingRanked extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     styles: props.navigation.state.params.styles,
     market: props.navigation.state.params.market,
     type: props.navigation.state.params.type,
     loading: true,
     teams :'',
     searchTeam: '',
     searchTeams: [],
     filteredSearchTeams: [],
     boundaries: []
    };

  setDataSource(this);
  setTeams(this);
}


_renderItem = ({item}) => (
  <ListItem
    onPress={() => this.props.navigation.navigate('GlobalRatings',
    {  token: this.state.token,
       styles: this.state.styles,
       market: this.state.market,
       label: item.title,
       teams: this.state.teams.slice(item.start, item.end)
    })}
    title={item.title}
    titleStyle={this.state.styles.listItem}
  />
);

_renderTeam = ({item}) => (
  <ListItem
    title={item.label}
    onPress={() => this.props.navigation.navigate('GlobalRatings',
    {  token: this.state.token,
       styles: this.state.styles,
       market: this.state.market,
       label: item.label+' ranked '+(this.state.teams.findIndex(t => t.team === item.label)+1),
       teams: [getTeam(this, item.label)]
    })}
    hideChevron
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
          thickness={50}
        />
        </View>
     }
     {!this.state.loading &&
       <View style={this.state.styles.container}>
         <SearchBar
          style={this.state.styles.inputField}
          placeholder='Type for teams'
          onChangeText={(searchTeam) => checkTeamName(this, searchTeam)}
          value={this.state.searchTeam}/>
        <FlatList
         data={this.state.filteredSearchTeams}
         renderItem={this._renderTeam}
         keyExtractor={(item, index) => index.toString()}
        />
        <FlatList
         data={this.state.boundaries}
         renderItem={this._renderItem}
         keyExtractor={(item, index) => index.toString()}
        />
       </View>}
      </View>
    );
  }
}

function checkTeamName(component, searchTeam){

  var filtered =
  component.state.searchTeams
    .filter(team => team.label.toLowerCase().startsWith(searchTeam.toLowerCase()))

   component.setState({filteredSearchTeams: filtered, searchTeam: searchTeam});
}

function getRating(market, marketRatings){
  return marketRatings.filter(f => f.market === market).shift().rating;
}

function setTeams(component){
  allTeams(component.state.type, component.state.token)
  .then(data => component.setState({searchTeams: data}));
}

function setDataSource(component){
  globalRatings(component.state.market, component.state.token)
  .then( data => component.setState({teams : data, loading: false, boundaries: createBoundaries(data.length)}));
}

function getTeam(component, searchTeam){
  return component.state.teams.filter(team => team.team === searchTeam).shift();
}


function createBoundaries(total){
   var boundaries = [];
   var boundaryTotal = 50;

   var noOfBoundaries = Math.ceil(total / boundaryTotal);

   for (var i = 0; i < noOfBoundaries; i++){

    var title = (i*boundaryTotal+1)+' - '+(i*boundaryTotal+boundaryTotal);
    if(i === 0){
      title = 'Top '+boundaryTotal;
    }

     boundaries.push(
       {
         title: title,
         start: i*boundaryTotal,
         end: (i*boundaryTotal) + (boundaryTotal-1)
       });
     }

 return boundaries;
}

export default GlobalRatingRanked;
