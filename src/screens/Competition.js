import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button } from 'react-native';


class Competition extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     type: props.navigation.state.params.type,
     country: props.navigation.state.params.country,
     competition: props.navigation.state.params.competition
   };

}

  render() {
    return (
     <View style={styles.container}>
     <Button
       onPress={() => this.props.navigation.navigate('Teams',
       {
         token: this.state.token,
         type: this.state.type,
         country: this.state.country,
         competition: this.state.competition })}
       title='Teams'
     />
     <Button
       onPress={() => this.props.navigation.navigate('Events',
       {
         token: this.state.token,
         type: this.state.type,
         country: this.state.country,
         competition: this.state.competition })}
       title='Events'
     />
     <Button
       onPress={() => this.props.navigation.navigate('Accuracy',
       {
         token: this.state.token,
         key: this.state.competition
       })}
       title='Accuracy'
     />

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1be215',
    alignItems: 'stretch',
    justifyContent: 'center',
  }
});

export default Competition;
