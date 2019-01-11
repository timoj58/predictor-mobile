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

export function getBetRatingColor(value){
       if (value >= 40){
         return 'limegreen';
       }

       if(value < 40 && value >= 15){
         return 'yellow';
       }

       return 'red';
}

export function getAvatarColor(movement){
  if(movement === 'arrow-up'){
    return 'green';
  }

  if(movement === 'arrow-down'){
    return 'red';
  }

  return 'orange';
}
