import React from 'react';
import { Dimensions } from 'react-native';
import { Tile } from 'react-native-elements'
import {
  StackNavigator,
} from 'react-navigation';



export function renderTile(
  component,
  item,
  iconSize=100,
  width=Dimensions.get('window').width,
  height=Dimensions.get('window').height/2) {

  return <Tile
      onPress={() => component.props.navigation.navigate(item.screen,item.props)}
         title={item.title}
         titleStyle={{color: 'silver',fontWeight: 'bold'}}
         icon={{ name: item.icon, type: 'font-awesome', size: iconSize, color: 'silver' }}
         featured
         width={width}
         height={height}
         imageSrc={require('../screens/img/charcoal.png')}
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
