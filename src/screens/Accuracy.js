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
     key: props.navigation.state.params.key,
     styles: props.navigation.state.params.styles,
     accuracy: ''
   };

   setDataSource(this);
}



_renderItem = ({item}) => (
  <ListItem
    title={item.type}
    badge={{ value:  item.validations[this.state.key]['accuracy'], textStyle: { color: 'orange' }, containerStyle: { marginTop: -20 } }}
    hideChevron
    titleStyle={this.state.styles.listItem}
    subtitle={
      <View style={this.state.styles.listItem}>
          <Text style={this.state.styles.ratingText}>{item.validations[this.state.key]['correct']} / {item.validations[this.state.key]['total']}</Text>
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
        keyExtractor={(item, index) => index}
      />
      </View>
    );
  }
}

function setDataSource(component){
  accuracy(component.state.key, component.state.token)
  .then( data => component.setState({accuracy : data}));
}


export default Accuracy;
