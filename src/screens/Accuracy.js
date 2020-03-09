import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import {accuracy} from "../api/DataService";
import { ListItem } from 'react-native-elements';


class Accuracy extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     competition: props.navigation.state.params.competition,
     styles: props.navigation.state.params.styles,
     accuracy: ''
   };

   setDataSource(this);
}



_renderItem = ({item}) => (
  item.validations[this.state.competition].hasOwnProperty('accuracy')
  && <ListItem
    title={item.type}
    badge={{ value:  item.validations[this.state.competition]['accuracy'].toFixed(2)+'%', textStyle: { color: 'green', fontSize: 20 }}}
    hideChevron
    containerStyle={{ borderBottomWidth: 0 }}
    titleStyle={this.state.styles.listItem}
    subtitle={
      <View style={this.state.styles.listItem}>
          <Text style={this.state.styles.ratingText}>{item.validations[this.state.competition]['correct']} / {item.validations[this.state.competition]['total']}</Text>
      </View>
      }
      />
);


  render() {
    return (
     <View style={this.state.styles.container}>
     <FlatList
        data={this.state.accuracy}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      </View>
    );
  }
}

function setDataSource(component){
  accuracy(component.state.competition, component.state.token)
  .then( data => component.setState({accuracy : data.sort(sort(component.state.competition))}))
  .catch((error) => component.props.navigation.navigate('Splash',{}));

}

function sort(index) {
  return function innerSort(a, b) {

    const varA = a.validations[index]['accuracy'];
    const varB = b.validations[index]['accuracy'];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return comparison * -1;

  };
}


export default Accuracy;
