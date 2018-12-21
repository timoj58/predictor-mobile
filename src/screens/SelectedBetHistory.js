import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Progress from 'react-native-progress';

import {betHistory} from "../api/DataService";


class SelectedBetHistory extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     token: props.navigation.state.params.token,
     loading: true,
     history:''
    };

  setDataSource(this);
}


_renderItem = ({item}) => (
  <Button
    onPress={() => this.props.navigation.navigate('BetHistoryBatch',
    {  token: this.state.token,
       batch: item
    })}
    title={item.batchStartDate+ ' - '+item.batchEndDate}
  />
);


  render() {
    return (
     <View style={styles.container}>
     {this.state.loading && <Progress.Circle size={50} indeterminate={true} />}
     {!this.state.loading &&
       <FlatList
        data={this.state.history}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index}
      />}
      </View>
    );
  }
}

function setDataSource(component){
  betHistory( component.state.token)
  .then( data => component.setState({history : data, loading: false}));
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1be215',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  }
});

export default SelectedBetHistory;
