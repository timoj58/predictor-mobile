import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#36454f',
    alignItems: 'stretch',
    justifyContent: 'center',
   },
   containerRow: {
     flex: 1,
     flexDirection: 'row',
     backgroundColor: '#36454f',
     alignItems: 'flex-start',
     justifyContent: 'flex-start',
    },
   tileContainer: {
     flex: 1,
     flexDirection: 'row',
     flexWrap: 'wrap',
     backgroundColor: '#36454f',
     alignItems: 'stretch',
     justifyContent: 'center',
    },
   scrollViewContainer: {
     flex: 1,
     backgroundColor: '#36454f'
  },
   progressContainer: {
     flex: 1,
     backgroundColor: '#36454f',
     alignItems: 'center',
     justifyContent: 'center',
    },
   listItem: {
    color: 'silver',
     fontSize: 16,
    fontWeight: 'bold'
  },
  listItemNormal: {
   color: 'silver',
    fontSize: 16
 },
 listItemWithSize: {
   color: 'silver',
   fontSize: 18,
   fontWeight: 'bold'
 },
  listItemSmall: {
   color: 'silver',
   fontSize: 14
 },
 listItemNormal: {
  color: 'silver',
  fontSize: 16
},
 listItemSmallGrey: {
  color: 'grey',
  fontSize: 14
},
 listItemSmallRed: {
  color: 'orangered',
  fontSize: 15
},
listItemSmallGreen: {
 color: 'green',
 fontSize: 15
},
listItemSuccess: {
   color: 'silver',
   fontWeight: 'bold',
   backgroundColor: 'green'
 },
 listItemFail: {
  color: 'silver',
  fontWeight: 'bold',
  backgroundColor: 'red'
},
listItemAboveAverage: {
 color: 'silver',
 fontWeight: 'bold',
 backgroundColor: 'darkorange'
},
listItemBelowAverage: {
 color: 'silver',
 fontWeight: 'bold',
 backgroundColor: 'lightyellow'
},
  titleListItem: {
   color: 'grey',
   fontWeight: 'bold',
   fontSize: 30
 },
 titleListItemMedium: {
  color: 'grey',
  fontWeight: 'bold',
  fontSize: 25
},
 overlayItem: {
  color: 'black',
  fontWeight: 'bold',
  fontSize: 50,
  backgroundColor: 'grey'
},
splashTitle: {
 color: 'black',
 fontWeight: 'bold',
 fontSize: 25
},
overlayItemSuccess: {
 color: 'black',
 fontWeight: 'bold',
 fontSize: 50,
 backgroundColor: 'grey'
},

  ratingText: {
   color: 'grey',
   fontWeight: 'bold'
 },
 ratingTextPlus: {
  color: 'green',
  fontWeight: 'bold'
},
ratingTextLMinus: {
 color: 'red',
 fontWeight: 'bold'
},
  inputField: {
      height: 40,
      alignSelf: 'stretch',
      textAlign: "center",
      borderColor:  'gray',
      fontSize: 20,
      borderWidth: 1,
      color: "black",
      backgroundColor: 'white'
  }
});
