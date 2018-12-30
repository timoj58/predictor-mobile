import React from 'react';
import { Tile } from 'react-native-elements'
import {
  StackNavigator,
} from 'react-navigation';


export function renderTile(component, item) {
  return <Tile
      onPress={() => component.props.navigation.navigate(item.screen,item.props)}
         title={item.title}
         icon={{ name: item.icon, type: 'font-awesome', size: 150 }}
         featured
         imageSrc={require('../screens/img/tile.png')}
         />
     }
