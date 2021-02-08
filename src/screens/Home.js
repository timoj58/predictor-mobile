import React from 'react';

import {
  StackNavigator,
} from 'react-navigation';

import { Dimensions, StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { Icon, Tile } from 'react-native-elements'
import {renderTile} from "../util/RenderUtils";
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Events from './Events';
import SelectedBets from './SelectedBets';
import Countries from './Countries';

import {styles} from './Styles';

//const Tab = createBottomTabNavigator();

class Home extends React.Component {
  constructor(props) {
   super(props);

}

_renderTile = ({item}) => (
    renderTile(this, item)
);

  render() {
    return (
      <View style={styles.container}>
      <FlatList
              data={this.state.tilesLeft.concat(this.state.tilesRight)}
              renderItem={this._renderTile}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
    );
  }
}


const TabNavigator = createBottomTabNavigator({
  Today:  Events,
  Selected: SelectedBets,
  Leagues: Countries
},
{
   defaultNavigationOptions: ({ navigation }) => ({
     tabBarIcon: ({ focused, horizontal, tintColor }) => {
       const { routeName } = navigation.state;
       if (routeName === 'Today') {
         iconName = `calendar-check-o`;
         // Sometimes we want to add badges to some icons.
         // You can check the implementation below.
       } else if (routeName === 'Selected') {
         iconName = `dollar`;
       }else if (routeName === 'Leagues') {
         iconName = `globe`;
       }

       // You can return any component that you like here!
      // return {{ name: iconconfiguration for a stack navigator, we'll learn how to configure those later.

  //  The casing of the route name doesn't matter -- you can use lowercase home or capitalized Home, it's up to you. Name, type: 'font-awesome', size: iconSize, color: 'silver' }};

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

 /*export default function HomeNavigator() {
   return (
     <NavigationContainer>
       <Tab.Navigator>
         <Tab.Screen name="Today" component={Today} />
         <Tab.Screen name="SelectedBets" component={SelectedBets} />
         <Tab.Screen name="Countries" component={Countries} />
       </Tab.Navigator>
     </NavigationContainer>
   );
 }
*/
export default createAppContainer(TabNavigator);

//export default Home;
