import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import {accuracy} from "../api/DataService";


class Accuracy extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     key: props.navigation.state.params.key,
     accuracy: ''
   };

   setDataSource(this);
}



_renderItem = ({item}) => (
  <View style={styles.container}>
  <Text>{item.type}</Text>
  <Text>{item.validations[this.state.key]['correct']} / {item.validations[this.state.key]['total']} {item.validations[this.state.key]['accuracy']}%</Text>
  </View>
);


  render() {
    return (
     <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1be215',
    alignItems: 'stretch',
    justifyContent: 'center',
  }
});

export default Accuracy;
