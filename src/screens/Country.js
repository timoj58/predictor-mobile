import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import {competitions} from "../api/DataService";


class Country extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     type: props.navigation.state.params.type,
     country: props.navigation.state.params.country,
     competitions: ''
   };

   setDataSource(this);
}


_renderItem = ({item}) => (
  <Button
    onPress={() => this.props.navigation.navigate('Teams',
    {
      token: this.state.token,
      type: this.state.type,
      country: this.state.country,
      competition: item })}
    title={item}
  />
);


  render() {
    return (
     <View style={styles.container}>
     <FlatList
        data={this.state.competitions}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index}
      />
      </View>
    );
  }
}

function setDataSource(component){
  competitions(component.state.type, component.state.country, component.state.token)
  .then( data => component.setState({competitions : data}));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1be215',
    alignItems: 'stretch',
    justifyContent: 'center',
  }
});

export default Country;
