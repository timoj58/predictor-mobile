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
     type: props.navigation.state.params.type,
     styles: props.navigation.state.params.styles,
     loading: true,
     history:''
    };

  setDataSource(this);
}


_renderItem = ({item}) => (
  <Button
    onPress={() => this.props.navigation.navigate('BetHistoryBatch',
    {  token: this.state.token,
       styles: this.state.styles,
       batch: item
    })}
    title={item.batchStartDate+ ' - '+item.batchEndDate}
  />
);


  render() {
    return (
     <View style={this.state.styles.container}>
     {this.state.loading &&
       <View style={this.state.styles.progressContainer}>
         <Progress.Circle
          size={Dimensions.get('window').width/2}
          indeterminate={true}
          color='black'
          thickness={20} />
        </View>
      }
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
  betHistory(component.state.type, component.state.token)
  .then( data => component.setState({history : data, loading: false}));
}


export default SelectedBetHistory;
