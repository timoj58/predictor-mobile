import React from 'react';
import { Tile } from 'react-native-elements'
import {
  StackNavigator,
} from 'react-navigation';
import * as Progress from 'react-native-progress';
import { Dimensions } from 'react-native';


export function getImage(item) {
   return item.imageSrc;
}

export function renderTile(component, item) {
  return <Tile
      onPress={() => component.props.navigation.navigate(item.screen,item.props)}
         title={item.title}
         icon={{ name: 'play-circle', type: 'font-awesome' }}
         imageSrc={getImage(item)}
         featured
       />
     }

export function renderProgress() {
  return
  <View style={this.state.styles.progressContainer}>
  <Progress.Circle
     size={Dimensions.get('window').width/2}
     indeterminate={true}
     color='black'
   />
   </View>
}
