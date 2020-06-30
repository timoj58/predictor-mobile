import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import {accuracy} from "../api/DataService";
import { ListItem, Avatar } from 'react-native-elements';
import {styles} from './Styles';
import * as Progress from 'react-native-progress';
import { Dimensions } from 'react-native'
import {getAvatarColor} from "../util/RenderUtils";



class Accuracy extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     competition: props.navigation.state.params.competition,
     accuracy: '',
     loading: true
   };

   setDataSource(this);
}



_renderItem = ({item}) => (
  JSON.parse(item.validations[this.state.competition]).hasOwnProperty('accuracy')
  && <ListItem
    title={item.type}
    badge={{ value:  JSON.parse(item.validations[this.state.competition])['accuracy'].toFixed(2)+'%', textStyle: { color: 'green', fontSize: 16 }, containerStyle: {backgroundColor: '#36454f'}}}
    hideChevron
    containerStyle={{ borderBottomWidth: 0 }}
    titleStyle={styles.listItemSmall}
    subtitle={
      <View style={styles.listItem}>
          <Text style={styles.ratingText}>{JSON.parse(item.validations[this.state.competition])['correct']} / {JSON.parse(item.validations[this.state.competition])['total']}</Text>
      </View>
      }
      avatar={<Avatar
             rounded
             icon={{name: JSON.parse(item.validations[this.state.competition])['movement'], color: getAvatarColor(JSON.parse(item.validations[this.state.competition])['movement']), type: 'font-awesome'}}
            />}
      />
);


  render() {
    return (
     <View style={styles.container}>
     {this.state.loading &&
       <View style={styles.progressContainer}>
       <Progress.Bar
          size={Dimensions.get('window').width/4}
          indeterminate={true}
          color='black'
          height={10}
        //  thickness={20}
          />
        </View>
     }
    {!this.state.loading &&
     <FlatList
        data={this.state.accuracy}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index.toString()}
      />}
      </View>
    );
  }
}

function setDataSource(component){
  accuracy(component.state.competition)
  .then( data =>   {
    //console.log(data);
    component.setState({loading: false, accuracy : data.sort(sort(component.state.competition))});})
  .catch((error) => {
    console.log(error);
    component.props.navigation.navigate('Splash',{});
  });

}


function sort(index) {
  return function innerSort(a, b) {

    const varA = JSON.parse(a.validations[index])['accuracy'];
    const varB = JSON.parse(b.validations[index])['accuracy'];


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
