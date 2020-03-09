   import {
    createAppContainer
  }  from 'react-navigation';
   import { createStackNavigator } from 'react-navigation-stack'
   import Splash from "./src/screens/Splash";
    import Home from "./src/screens/Home";
    import Competition from "./src/screens/Competition";
    import EventRating from "./src/screens/EventRating";
    import Events from "./src/screens/Events";
    import Accuracy from "./src/screens/Accuracy";
    import Countries from "./src/screens/Countries";
    import SelectedBets from "./src/screens/SelectedBets";
    import PreviousFixtures from "./src/screens/PreviousFixtures";


  /*  const Stack = createStackNavigator();

    export default function App() {
     return (
      <NavigationContainer>
       <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Countries" component={Countries} />
      //  <Stack.Screen name="Competition" component={Competition} />
        <Stack.Screen name="Events" component={Events} />
        <Stack.Screen name="EventRating" component={EventRating} />
        <Stack.Screen name="PreviousFixtures" component={PreviousFixtures} />
        <Stack.Screen name="SelectedBets" component={SelectedBets} />
        <Stack.Screen name="Accuracy" component={Accuracy} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
*/

    const AppNavigator = createStackNavigator({
      Splash: {
       screen: Splash,
       navigationOptions: ({ navigation }) => ({
        headerShown: false
       })
      },
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
       title: 'Tabiiki AI',
       headerStyle: { backgroundColor: 'silver' }
     })
   },
    Countries: {
      screen: Countries,
      navigationOptions: ({ navigation }) => ({
       title: 'Countries',
       headerStyle: { backgroundColor: 'silver' }
     })
    },
    Competition: {
      screen: Competition,
      navigationOptions: ({ navigation }) => ({
       title: `${navigation.state.params.label}`,
       headerStyle: { backgroundColor: 'silver' }
     })
    },
    Events: {
      screen: Events,
      navigationOptions: ({ navigation }) => ({
       title: `${navigation.state.params.label}`,
       headerStyle: { backgroundColor: 'silver' }
     })
    },
    EventRating: {
      screen: EventRating,
      navigationOptions: ({ navigation }) => ({
       title: `${navigation.state.params.label}`,
       headerStyle: { backgroundColor: 'silver' }
     })
    },
    PreviousFixtures: {
      screen: PreviousFixtures,
      navigationOptions: ({ navigation }) => ({
       title: `${navigation.state.params.label}`,
       headerStyle: { backgroundColor: 'silver' }
     })
    },
    SelectedBets: {
      screen: SelectedBets,
      navigationOptions: ({ navigation }) => ({
       title: `${navigation.state.params.label}`,
       headerStyle: { backgroundColor: 'silver' }
     })
    },
    Accuracy: {
      screen: Accuracy,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.label}`,
        headerStyle: { backgroundColor: 'silver' }
     })
   }});


  const App = createAppContainer(AppNavigator);

  export default App;
