import {
      createStackNavigator,
      createAppContainer
    } from 'react-navigation';

    import Splash from "./src/screens/Splash";
    import Home from "./src/screens/Home";
    import LoginUsername from "./src/screens/LoginUsername";
    import LoginPassword from "./src/screens/LoginPassword";
    import RegisterUsername from "./src/screens/RegisterUsername";
    import RegisterPassword from "./src/screens/RegisterPassword";
    import Country from "./src/screens/Country";
    import Competition from "./src/screens/Competition";
    import Teams from "./src/screens/Teams";
    import Team from "./src/screens/Team";
    import Match from "./src/screens/Match";
    import Matches from "./src/screens/Matches";
    import MatchYears from "./src/screens/MatchYears";
    import MatchMonths from "./src/screens/MatchMonths";
    import Players from "./src/screens/Players";
    import Player from "./src/screens/Player";
    import Events from "./src/screens/Events";
    import Event from "./src/screens/Event";
    import Accuracy from "./src/screens/Accuracy";
    import GlobalRatings from "./src/screens/GlobalRatings";
    import TeamRating from "./src/screens/TeamRating";
    import Countries from "./src/screens/Countries";
    import Betting from "./src/screens/Betting";
    import SelectedBets from "./src/screens/SelectedBets";
    import SelectedBetHistory from "./src/screens/SelectedBetHistory";
    import SelectedBetsHome from "./src/screens/SelectedBetsHome";
    import SelectedResultsBets from "./src/screens/SelectedResultsBets";
    import SelectedGoalsBets from "./src/screens/SelectedGoalsBets";
    import GlobalRatingsHome from "./src/screens/GlobalRatingsHome";
    import CompetitionRatings from "./src/screens/CompetitionRatings";

    const AppNavigator = createStackNavigator({
      Splash: {
       screen: Splash
     },
      RegisterUsername: {
       screen: RegisterUsername,
       navigationOptions: ({ navigation }) => ({
        title: 'Register',
      })
     },
     RegisterPassword: {
       screen: RegisterPassword,
       navigationOptions: ({ navigation }) => ({
        title: 'Register',
      })
     },
     LoginUsername: {
      screen: LoginUsername,
      navigationOptions: ({ navigation }) => ({
       title: 'Login',
     })
    },
    LoginPassword: {
      screen: LoginPassword,
      navigationOptions: ({ navigation }) => ({
       title: 'Login',
     })
    },
    Home: {
      screen: Home
    },
    Countries: {
      screen: Countries,
      navigationOptions: ({ navigation }) => ({
       title: 'Countries',
       headerStyle: { backgroundColor: 'orange' }
     })
    },
    Country: {
      screen: Country,
      navigationOptions: ({ navigation }) => ({
       title: `${navigation.state.params.country}`,
       headerStyle: { backgroundColor: 'orange' }
     })
    },
    Competition: {
      screen: Competition,
      navigationOptions: ({ navigation }) => ({
       title: `${navigation.state.params.competition}`,
       headerStyle: { backgroundColor: 'orange' }
     })
    },
    CompetitionRatings: {
      screen: CompetitionRatings,
      navigationOptions: ({ navigation }) => ({
       title: 'Competition Ranking',
       headerStyle: { backgroundColor: 'orange' }
     })
    },
    Events: {
      screen: Events,
      navigationOptions: ({ navigation }) => ({
       title: `${navigation.state.params.label}`,
       headerStyle: { backgroundColor: 'orange' }
     })
    },
    Event: {
      screen: Event,
      navigationOptions: ({ navigation }) => ({
       title: `${navigation.state.params.label}`,
       headerStyle: { backgroundColor: 'orange' }
     })
    },
    Teams: {
      screen: Teams,
      navigationOptions: ({ navigation }) => ({
       title: `${navigation.state.params.competition}`,
       headerStyle: { backgroundColor: 'orange' }
     })
    },
    Team: {
      screen: Team,
      navigationOptions: ({ navigation }) => ({
       title: `${navigation.state.params.label}`,
       headerStyle: { backgroundColor: 'orange' }
     })
    },
    Match: {
      screen: Match,
      navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.label}`,
      headerStyle: { backgroundColor: 'orange' }
     })
    },
    Matches: {
      screen: Matches,
      navigationOptions: ({ navigation }) => ({
       title: `${navigation.state.params.label}`,
       headerStyle: { backgroundColor: 'orange' }
     })
    },
    MatchYears: {
      screen: MatchYears,
      navigationOptions: ({ navigation }) => ({
       title: `${navigation.state.params.label}`,
       headerStyle: { backgroundColor: 'orange' }
     })
    },
    MatchMonths: {
      screen: MatchMonths,
      navigationOptions: ({ navigation }) => ({
       title: `${navigation.state.params.label}`,
       headerStyle: { backgroundColor: 'orange' }
     })
    },
    Players: {
      screen: Players,
      navigationOptions: ({ navigation }) => ({
       title: `${navigation.state.params.label}`,
       headerStyle: { backgroundColor: 'orange' }
     })
    },
    Player: {
      screen: Player,
      navigationOptions: ({ navigation }) => ({
       title: `${navigation.state.params.label}`,
       headerStyle: { backgroundColor: 'orange' }
     })
    },
    GlobalRatings: {
      screen: GlobalRatings,
      navigationOptions: ({ navigation }) => ({
       title: `${navigation.state.params.label}`,
       headerStyle: { backgroundColor: 'orange' }
     })
    },
    GlobalRatingsHome: {
      screen: GlobalRatingsHome
    },
    SelectedBets: {
      screen: SelectedBets,
      navigationOptions: ({ navigation }) => ({
       title: `${navigation.state.params.label}`,
       headerStyle: { backgroundColor: 'orange' }
     })
    },
    SelectedBetHistory: {
      screen: SelectedBetHistory
    },
    SelectedBetsHome: {
      screen: SelectedBetsHome,
      navigationOptions: ({ navigation }) => ({
       title: 'Selected Bets',
       headerStyle: { backgroundColor: 'orange' }
     })
    },
    SelectedResultsBets: {
      screen: SelectedResultsBets,
      navigationOptions: ({ navigation }) => ({
       title: 'Selected Results Bets',
       headerStyle: { backgroundColor: 'orange' }
     })
    },
    SelectedGoalsBets: {
      screen: SelectedGoalsBets,
      navigationOptions: ({ navigation }) => ({
       title: 'Selected Goals Bets',
       headerStyle: { backgroundColor: 'orange' }
     })
    },
    SelectedBetsHome: {
      screen: SelectedBetsHome,
      navigationOptions: ({ navigation }) => ({
       title: 'Selected Bets',
       headerStyle: { backgroundColor: 'orange' }
     })
    },
    TeamRating: {
      screen: TeamRating,
      navigationOptions: ({ navigation }) => ({
       title: `${navigation.state.params.teamRating.team}`+ ' - '+`${navigation.state.params.market}`,
       headerStyle: { backgroundColor: 'orange' }
     })
  },
    Accuracy: {
      screen: Accuracy,
      navigationOptions: ({ navigation }) => ({
       title: `${navigation.state.params.key}`,
       headerStyle: { backgroundColor: 'orange' }
     })
    },
    Betting: {
      screen: Betting,
      navigationOptions: ({ navigation }) => ({
       title: 'Betting',
       headerStyle: { backgroundColor: 'orange' }
     })
    }});

const App = createAppContainer(AppNavigator);

export default App;
