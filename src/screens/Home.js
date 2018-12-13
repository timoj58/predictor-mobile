import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import {countries} from "../api/DataService";

const type = 'FOOTBALL';


class Home extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     countries: null
   };

   setDataSource(this, type);
}


_renderItem = ({item}) => (
  <Button
    onPress={() => this.props.navigation.navigate('Country',
    {
      token: this.state.token,
      type: type,
      country: item.country
    })}
    title={item.country}
  />
);


  render() {
    return (
      <View style={styles.container}>
      <FlatList
        data={this.state.countries}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index}
      />
      </View>
    );
  }
}

function setDataSource(component, type){
  countries(type, component.state.token).then(
    data => component.setState({countries : data}));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1be215',
    alignItems: 'stretch',
    justifyContent: 'center',
  }
});

export default Home;
