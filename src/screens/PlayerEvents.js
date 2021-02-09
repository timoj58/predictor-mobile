
import React from 'react';

/*import {
  StackNavigator,
} from 'react-navigation';
*/
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import { Icon, Card, ListItem, Avatar, Tile, Rating } from 'react-native-elements';
import * as Progress from 'react-native-progress';
import { Dimensions } from 'react-native';

import {getCombined} from "../util/PlayerUtils";
import {renderTrophies} from "../util/PlayerUtils";
import {matchSelections}  from "../api/DataService";
import {averageRatingIndicator} from "../util/PlayerUtils";
import {averageRatingIndicatorColor} from "../util/PlayerUtils";


import {styles} from './Styles';



//const Tab = createBottomTabNavigator();

class PlayerEvents extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     loading: true,
     notApplicable: false,
     competition:  props.navigation.state.params.competition,
     home:  props.navigation.state.params.home,
     away:  props.navigation.state.params.away,
     data: [],
     blink: false
   }

   setInterval(() => {
     this.setState(previousState => {
       return { blink: !previousState.blink };
     });
   },
   // Define any blinking time.
   400);

   setDataSource(this);

 }


 _renderItem = ({item}) => (
   <ListItem
   title={
   <View style={{flexDirection: 'row'}}>
     <Text style={styles.listItem}>{item.label}</Text>
     <Rating style={{paddingTop: 2}}
       type='custom'
       imageSize={18}
       readonly
       ratingColor= {getRatingBackground(this.state.blink)}
       ratingBackgroundColor='#36454f'
       startingValue={parseFloat(getRating(item.fantasyEventScore))}/>
   </View>}
   hideChevron
   containerStyle={{ height: 25, borderBottomWidth: 0 }}
     />
 );



 _renderEvent = ({item}) => (
   <ListItem
     title={item.event.replace('_',' ')} //saves should  not have %
     titleStyle={styles.titleListItem}
     containerStyle={{ borderBottomWidth: 0 }}
    hideChevron
     subtitle={
       <FlatList
         data={item.playerResponses.slice(0,6)}
         renderItem={this._renderItem}
         keyExtractor={(item, index) => index.toString()}
       />
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
          data={this.state.data.filter(f => f.event != 'saves')}
          renderItem={this._renderEvent}
          keyExtractor={(item, index) => index.toString()}
        />
        }
       {!this.state.loading && this.state.notApplicable &&
          <Tile
                   title={'No player data for league'}
                   titleStyle={{color: 'silver',fontWeight: 'bold'}}
                   icon={{ name: 'info', type: 'font-awesome', color: 'silver', size: 100 }}
                   featured
                   width={Dimensions.get('window').width}
                   height={Dimensions.get('window').height}
                   imageSrc={require('../screens/img/charcoal.png')}
          />}
   </View>
     );
  }
}


function blinkLabel(blink, rating){
  if(rating < 35){
    return 'silver';
  }

  if(rating >= 35 && blink){
    return 'silver';
  }

  return '#36454f';

};

function getRatingBackground(blinkRating){
  if(!blinkRating){
    return "#36454f";
  }
    return 'green';
  }


function getRating(rating){
   return (rating / 100 * 5).toFixed(2);
}


async function setDataSource(component){
   matchSelections(component.state.competition, component.state.home, component.state.away)
   .then( data => {
     if(data['body'].data.length > 0){
     component.setState({data: data['body'].data[0].matchSelectionResponses, loading: false});
   }else{
     component.setState({data: [], loading: false});
   }
   })
   .catch((error) => {
     console.log(error);
     component.setState({data: [], loading: false, notApplicable: true})
   });
}




//export default createAppContainer(TabNavigator);

export default PlayerEvents;
