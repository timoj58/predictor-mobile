import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';


import { Dimensions, StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { Icon, Tile } from 'react-native-elements'
import {renderTile} from "../util/RenderUtils";
import {machineLoadingStatus} from "../api/DataService";
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Events from './Events';
import Betting from './Betting';
import GlobalRatingsHome from './GlobalRatingsHome';
import Countries from './Countries';

class Home extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     styles: props.navigation.state.params.styles,
     status: false,
     tilesLeft: [
       {
         title: 'Today',
         screen: 'Events',
         icon: 'calendar-check-o',
         props: {
           token: props.navigation.state.params.token,
           styles: props.navigation.state.params.styles,
           today: true,
           country: null,
           competition: null,
           type: props.navigation.state.params.type,
           adUnitID: props.navigation.state.params.adUnitID,
           adUnitRewardsID: props.navigation.state.params.adUnitRewardsID,
           label: 'Todays Events'
         }
       },
       {
         title: 'Betting',
         screen: 'Betting',
         icon: 'dollar',
         props: {
           token: props.navigation.state.params.token,
           styles: props.navigation.state.params.styles,
           type: props.navigation.state.params.type,
           adUnitID: props.navigation.state.params.adUnitID,
           adUnitRewardsID: props.navigation.state.params.adUnitRewardsID
            }
       }
     ],
     tilesRight: [
       {
         title: 'Ratings',
         screen: 'GlobalRatingsHome',
         icon: 'bar-chart-o',
         props: {
           token: props.navigation.state.params.token,
           type: props.navigation.state.params.type,
           adUnitID: props.navigation.state.params.adUnitID,
           adUnitRewardsID: props.navigation.state.params.adUnitRewardsID,
          styles: props.navigation.state.params.styles
         }
       },
       {
         title: 'Leagues',
         screen: 'Countries',
         icon: 'globe',
         props: {
           token: props.navigation.state.params.token,
           styles: props.navigation.state.params.styles,
           type: props.navigation.state.params.type,
           adUnitID: props.navigation.state.params.adUnitID,
           adUnitRewardsID: props.navigation.state.params.adUnitRewardsID
          }
       }
     ]
    };

    statusCheck(this);
}

_renderTile = ({item}) => (
    renderTile(this, item)
);

  render() {
    return (
      <View style={this.state.styles.container}>
      {this.state.status &&
        <Tile
               title={'Machine Training...'}
               titleStyle={{color: 'yellow',fontWeight: 'bold'}}
               icon={{ name: 'info', type: 'font-awesome', color: 'yellow', size: 100 }}
               featured
               width={Dimensions.get('window').width}
               height={Dimensions.get('window').height}
               imageSrc={require('../screens/img/charcoal.png')}
               />}
      {!this.state.status &&
      <FlatList
              data={this.state.tilesLeft.concat(this.state.tilesRight)}
              renderItem={this._renderTile}
              keyExtractor={(item, index) => index.toString()}
            />}
          </View>
    );
  }
}

async function statusCheck(component){
  machineLoadingStatus(component.state.token)
   .then(data => component.setState({status: data.status}));
}



const TabNavigator = createBottomTabNavigator({
  Today:  Events,
  Betting: Betting,
  Ratings: GlobalRatingsHome,
  Countries: Countries
},
{
   defaultNavigationOptions: ({ navigation }) => ({
     tabBarIcon: ({ focused, horizontal, tintColor }) => {
       const { routeName } = navigation.state;
       if (routeName === 'Today') {
         iconName = `calendar-check-o`;
         // Sometimes we want to add badges to some icons.
         // You can check the implementation below.
       } else if (routeName === 'Betting') {
         iconName = `dollar`;
       }else if (routeName === 'Ratings') {
         iconName = `bar-chart-o`;
       }else if (routeName === 'Countries') {
         iconName = `globe`;
       }

       // You can return any component that you like here!
      // return {{ name: iconName, type: 'font-awesome', size: iconSize, color: 'silver' }};

       return <Icon name={iconName} type={'font-awesome'} size={25} color={tintColor} />;
     },
   }),
   tabBarOptions: {
     activeTintColor: 'tomato',
     inactiveTintColor: '#36454f',
     style: {
   backgroundColor: 'silver',
   height: 50
     },
   },
 });


export default createAppContainer(TabNavigator);

//export default Home;
