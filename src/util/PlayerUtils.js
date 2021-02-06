import React from 'react';

/*import {
  StackNavigator,
} from 'react-navigation';
*/
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';
import {styles} from '../screens/Styles';


export function averageRatingIndicator(player){
  var total = player.averages.filter(f => f.fantasyEventKey === player.fantasyEventKey)[0];

  if(total === undefined){
    return 'warning';
  }
  if(total.fantasyEventScore < player.fantasyEventScore){
    return 'arrow-up';
  }
  return 'arrow-down';
}

export function averageRatingIndicatorColor(player){
  var total = player.averages.filter(f => f.fantasyEventKey === player.fantasyEventKey)[0];

  if(total === undefined){
    return 'silver';
  }

  if(total.fantasyEventScore < player.fantasyEventScore){
    return 'green';
  }
  return 'red';
}

export function getCombined(fantasyOutcome){

  var total = 0;

  var keys = Object.keys(fantasyOutcome);

  for(var i=0;i<keys.length;i++){
    total += fantasyOutcome[keys[i]];
  }

  return total;

}

export function currentPepperColor(value, event){

 if(event === 'goals'){
   return value >= 50 ? 'red' : value >= 40 ? 'darkorange': 'limegreen';
 }

 if(event === 'assists'){
   return value >= 30 ? 'red' : value >= 25 ? 'darkorange': 'limegreen';

 }


 if(event === 'yellowCards'){
   return value >= 35 ? 'red' : value >= 30 ? 'darkorange': 'limegreen';

 }

 if(event === 'redCards'){
   return value >= 10 ? 'red' : value >= 7.5 ? 'darkorange': 'limegreen';

 }


return 'green';
};

export function dirtyTrophyYellow(player){
  var avgYellow = (player.yellowCards / player.appearances) * 100;

  if(avgYellow >= 35){
    return 'gold';
  }

  if(avgYellow >=30 ){
    return 'silver';
  }

  return 'peru';
}

export function dirtyTrophyRed(player){
  var avgRed = (player.redCards / player.appearances) * 100;

  if(avgRed >= 10){
    return 'gold';
  }

  if(avgRed >= 7.5){
    return 'silver';
  }

  return 'peru';
}

export function dirtyRed(player){
  if(player.appearances < 10){
    return false;
  }

  var avgRed = (player.redCards / player.appearances) * 100;

  if(avgRed >= 5){
    return true;
  }

  return false;
}

export function dirtyYellow(player){

  if(player.appearances < 10){
    return false;
  }

  var avgYellow = (player.yellowCards / player.appearances) * 100;

  if(avgYellow >= 25){
    return true;
  }

  return false;
}

export function currentDirtyRed(player){

  if(player.appearances < 10){
    return false;
  }


  if(player.hardmanRed !== null && player.hardmanRed >= 5){
      return true;
  }

  return false;
}

export function currentDirtyYellow(player){

  if(player.appearances < 10){
    return false;
  }

  if(player.hardmanYellow !== null && player.hardmanYellow >= 25){
      return true;
  }

  return false;
}


export function wizardTrophy(player){
  var avg = (player.assists / player.appearances) * 100;

  if(avg >= 30){
    return 'gold';
  }


  if(avg >= 25){
    return 'silver';
  }

  return 'peru';
}

export function wizard(player){

  if(player.appearances < 10){
    return false;
  }

  var avg = (player.assists / player.appearances) * 100;

  if(avg >= 20){
    return true;
  }

  return false;
}

export function currentWizard(player){

  if(player.appearances < 10){
    return false;
  }

  if(player.wizard !== null && player.wizard >= 20){
    return true;
  }

  return false;
}

export function marksmanTrophy(player){
  var avg = (player.goals / player.appearances) * 100;

  if(avg >= 50){
    return 'gold';
  }

  if(avg >= 40){
    return 'silver';
  }

  return 'peru';
}

export function currentMarksman(player){

  if(player.appearances < 10){
    return false;
  }


  if(player.marksman !== null && player.marksman >= 33){
    return true;
  }

  return false;
}

export function marksman(player){

  if(player.appearances < 10){
    return false;
  }

  var avg = (player.goals / player.appearances) * 100;

  if(avg >= 33){
    return true;
  }

  return false;
}

export function renderPlayerSpecific(player){
  return <Card
    containerStyle={{elevation:0, borderWidth: 0, backgroundColor: "#36454f"}}
    title={player.label}
    titleStyle={styles.listItem}>
    <ListItem
      title="Expected (%)"
      titleStyle={styles.listItemSmall}
      containerStyle={styles.cardListItem}
  //    badge={{ value:   getCombined(fantasyOutcome).toFixed(2), textStyle: { color: 'limegreen', fontSize: 25 }, containerStyle:{ position: 'absolute',  right: -4 },badgeStyle: {backgroundColor: "#36454f", borderWidth: 0}}}
    />
   </Card>
}


export function renderFantasy(fantasyOutcome){
  return <Card
    title={fantasyOutcome.opponent+(fantasyOutcome.isHome ? " (H)" : " (A)")}
    titleStyle={styles.listItem}
    containerStyle={styles.card}>
    <ListItem
      title="Expected Minutes Played"
      titleStyle={styles.listItemSmall}
      containerStyle={styles.cardListItemNarrow}
      badge={{ value:  fantasyOutcome.minutes.toFixed(0), textStyle: { color: 'limegreen',fontSize: 16  }, containerStyle:{ position: 'absolute', right: -4 },badgeStyle: {backgroundColor: "#36454f", borderWidth: 0} }}
    />
    <ListItem
      title="Expected Goals Conceded"
      titleStyle={styles.listItemSmall}
      containerStyle={styles.cardListItemNarrow}
      badge={{ value:  fantasyOutcome.conceded.toFixed(2), textStyle: { color: 'limegreen',fontSize: 16  }, containerStyle:{ position: 'absolute', right: -4 }, badgeStyle: {backgroundColor: "#36454f", borderWidth: 0} }}
    />
    <ListItem
      title="Expected Goal (%)"
      titleStyle={styles.listItemSmall}
      containerStyle={styles.cardListItemNarrow}
      badge={{ value:  Object.keys(fantasyOutcome.goals).length === 0  ? 0 : getCombined(fantasyOutcome.goals).toFixed(2), textStyle: { color: 'limegreen', fontSize: 16 }, containerStyle:{ position: 'absolute',  right: -4 },badgeStyle: {backgroundColor: "#36454f", borderWidth: 0}}}
    />
    <ListItem
      title="Expected Assist (%)"
      titleStyle={styles.listItemSmall}
      containerStyle={styles.cardListItemNarrow}
      badge={{ value:  Object.keys(fantasyOutcome.assists).length === 0  ? 0 : getCombined(fantasyOutcome.assists).toFixed(2), textStyle: { color: 'limegreen',fontSize: 16  }, containerStyle:{ position: 'absolute', right: -4 },badgeStyle: {backgroundColor: "#36454f", borderWidth: 0} }}
    />
    <ListItem
      title="Expected Yellow Card (%)"
      titleStyle={styles.listItemSmall}
      containerStyle={styles.cardListItemNarrow}
      badge={{ value: Object.keys(fantasyOutcome.yellowCards).length === 0  ? 0 : fantasyOutcome.yellowCards[1], textStyle: { color: 'limegreen',fontSize: 16  }, containerStyle:{ position: 'absolute',  right: -4 },badgeStyle: {backgroundColor: "#36454f", borderWidth: 0} }}
    />
    <ListItem
      title="Expected Red Card (%)"
      titleStyle={styles.listItemSmall}
      containerStyle={styles.cardListItemNarrow}
      badge={{ value:  Object.keys(fantasyOutcome.redCards).length === 0  ? 0.01 : fantasyOutcome.redCards[1], textStyle: { color: 'limegreen',fontSize: 16  }, containerStyle:{ position: 'absolute',  right: -4 },badgeStyle: {backgroundColor: "#36454f", borderWidth: 0} }}
    />
   </Card>

}


export function renderPlayer(player){
  return <Card
    containerStyle={styles.card}>
    <ListItem
      title="Appearances"
      titleStyle={styles.listItemSmall}
      containerStyle={styles.cardListItem}
      badge={{ value:  player.appearances, textStyle: { color: 'gold',fontSize: 20  }, containerStyle:{ position: 'absolute', right: -4 },badgeStyle: {backgroundColor: "#36454f", borderWidth: 0} }}
    />
    <ListItem
      title="Goals"
      titleStyle={styles.listItemSmall}
      containerStyle={styles.cardListItem}
      badge={{ value:  player.goals, textStyle: { color: 'gold',fontSize: 20  }, containerStyle:{ position: 'absolute', right: -4 }, badgeStyle: {backgroundColor: "#36454f", borderWidth: 0} }}
      subtitle={
        <View style={{flexDirection: 'row'}}>
        {marksman(player) && <Icon
          name='trophy'
          type='font-awesome-5'
          size={15}
          color={marksmanTrophy(player)} />}
          {currentMarksman(player) && <Icon
            name='pepper-hot'
            type='font-awesome-5'
            size={15}
            color={currentPepperColor(player.marksman, 'goals')} />
          }
          </View>
      }
    />
    <ListItem
      title="Assists"
      titleStyle={styles.listItemSmall}
      containerStyle={styles.cardListItem}
      badge={{ value:  player.assists, textStyle: { color: 'gold', fontSize: 20 }, containerStyle:{ position: 'absolute',  right: -4 },badgeStyle: {backgroundColor: "#36454f", borderWidth: 0}}}
      subtitle={
        <View style={{flexDirection: 'row'}}>
        {wizard(player) && <Icon
          name='trophy'
          type='font-awesome-5'
          size={15}
          color={wizardTrophy(player)} />
        }
        {currentWizard(player) && <Icon
          name='pepper-hot'
          type='font-awesome-5'
          size={15}
          color={currentPepperColor(player.wizard, 'assists')} />
        }
        </View>
      }  />
    <ListItem
      title="Yellow Cards"
      titleStyle={styles.listItemSmall}
      containerStyle={styles.cardListItem}
      badge={{ value:  player.yellowCards, textStyle: { color: 'gold',fontSize: 20  }, containerStyle:{ position: 'absolute', right: -4 },badgeStyle: {backgroundColor: "#36454f", borderWidth: 0} }}
      subtitle={
        <View style={{flexDirection: 'row'}}>
        {dirtyYellow(player) && <Icon
          name='trophy'
          type='font-awesome-5'
          size={15}
          color={dirtyTrophyYellow(player)} />}
          {currentDirtyYellow(player) && <Icon
            name='pepper-hot'
            type='font-awesome-5'
            size={15}
            color={currentPepperColor(player.hardmanYellow, 'yellowCards')} />
          }
        </View>
      }/>
    <ListItem
      title="Red Cards"
      titleStyle={styles.listItemSmall}
      containerStyle={styles.cardListItem}
      badge={{ value:  player.redCards, textStyle: { color: 'gold',fontSize: 20  }, containerStyle:{ position: 'absolute',  right: -4 },badgeStyle: {backgroundColor: "#36454f", borderWidth: 0} }}
      subtitle={
        <View style={{flexDirection: 'row'}}>
        {dirtyRed(player) && <Icon
          name='trophy'
          type='font-awesome-5'
          size={15}
          color={dirtyTrophyRed(player)} />}
          {currentDirtyRed(player) && <Icon
            name='pepper-hot'
            type='font-awesome-5'
            size={15}
            color={currentPepperColor(player.hardmanRed, 'redCards')} />
          }
        </View>
      }/>
   </Card>
}


export function renderTrophies(item){
  return <View style={{flex: 1,  flexDirection: 'row'}}>
    {marksman(item) && <Icon
      name='trophy'
      type='font-awesome-5'
      size={15}
      color={marksmanTrophy(item)} />}
    {wizard(item) && <Icon
      name='trophy'
      type='font-awesome-5'
      size={15}
      color={wizardTrophy(item)} />}
      { dirtyRed(item) && <Icon
        name='trophy'
        type='font-awesome-5'
        size={15}
        color={dirtyTrophyRed(item)} />}
        { dirtyYellow(item) && <Icon
          name='trophy'
          type='font-awesome-5'
          size={15}
          color={dirtyTrophyYellow(item)} />}
        {currentMarksman(item) && <Icon
          name='pepper-hot'
          type='font-awesome-5'
          size={15}
          color={currentPepperColor(item.marksman, 'goals')} />}
        {currentWizard(item) && <Icon
          name='pepper-hot'
          type='font-awesome-5'
          size={15}
          color={currentPepperColor(item.wizard, 'assists')} />}
          { currentDirtyYellow(item) && <Icon
            name='pepper-hot'
            type='font-awesome-5'
            size={15}
            color={currentPepperColor(item.hardmanYellow, 'yellowCards')} />}
            { currentDirtyRed(item) && <Icon
              name='pepper-hot'
              type='font-awesome-5'
              size={15}
              color={currentPepperColor(item.hardmanRed, 'redCards')} />}
    </View>
}
