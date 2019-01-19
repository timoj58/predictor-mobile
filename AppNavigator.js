import {
      createStackNavigator,
      createAppContainer
    } from 'react-navigation';

    import Splash from "./src/screens/Splash";
    import Home from "./src/screens/Home";
    import LoginPassword from "./src/screens/LoginPassword";
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
    import GlobalRatingsRanked from "./src/screens/GlobalRatingsRanked";
    import BetHistoryBatch from "./src/screens/BetHistoryBatch";

    const AppNavigator = createStackNavigator({
      Splash: {
       screen: Splash,
       navigationOptions: ({ navigation }) => ({
        title: 'Welcome',
        headerStyle: { backgroundColor: 'silver' }
       })
      },
     RegisterPassword: {
       screen: RegisterPassword,
       navigationOptions: ({ navigation }) => ({
        title: 'Register',
        headerStyle: { backgroundColor: 'silver' }
      })
     },
    LoginPassword: {
      screen: LoginPassword,
      navigationOptions: ({ navigation }) => ({
       title: 'Login',
       headerStyle: { backgroundColor: 'silver' }
     })
    },
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
       title: 'Predictor - Football',
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
    Country: {
      screen: Country,
      navigationOptions: ({ navigation }) => ({
       title: `${navigation.state.params.country}`,
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
    CompetitionRatings: {
      screen: CompetitionRatings,
      navigationOptions: ({ navigation }) => ({
       title: 'Competition Ranking (by market)',
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
    Event: {
      screen: Event,
      navigationOptions: ({ navigation }) => ({
       title: `${navigation.state.params.label}`,
       headerStyle: { backgroundColor: 'silver' }
     })
    },
    Teams: {
      screen: Teams,
      navigationOptions: ({ navigation }) => ({
       title: `${navigation.state.params.label}`,
       headerStyle: { backgroundColor: 'silver' }
     })
    },
    Team: {
      screen: Team,
      navigationOptions: ({ navigation }) => ({
       title: `${navigation.state.params.label}`,
       headerStyle: { backgroundColor: 'silver' }
     })
    },
    Match: {
      screen: Match,
      navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.label}`,
      headerStyle: { backgroundColor: 'silver' }
     })
    },
    Matches: {
      screen: Matches,
      navigationOptions: ({ navigation }) => ({
       title: `${navigation.state.params.label}`,
       headerStyle: { backgroundColor: 'silver' }
     })
    },
    MatchYears: {
      screen: MatchYears,
      navigationOptions: ({ navigation }) => ({
       title: `${navigation.state.params.label}`,
       headerStyle: { backgroundColor: 'silver' }
     })
    },
    MatchMonths: {
      screen: MatchMonths,
      navigationOptions: ({ navigation }) => ({
       title: `${navigation.state.params.label}`,
       headerStyle: { backgroundColor: 'silver' }
     })
    },
    Players: {
      screen: Players,
      navigationOptions: ({ navigation }) => ({
       title: `${navigation.state.params.label}`,
       headerStyle: { backgroundColor: 'silver' }
     })
    },
    Player: {
      screen: Player,
      navigationOptions: ({ navigation }) => ({
       title: `${navigation.state.params.label}`,
       headerStyle: { backgroundColor: 'silver' }
     })
    },
    GlobalRatings: {
      screen: GlobalRatings,
      navigationOptions: ({ navigation }) => ({
       title: `${navigation.state.params.label}`,
       headerStyle: { backgroundColor: 'silver' }
     })
    },
    GlobalRatingsRanked: {
      screen: GlobalRatingsRanked,
      navigationOptions: ({ navigation }) => ({
       title: `${navigation.state.params.label}`,
       headerStyle: { backgroundColor: 'silver' }
     })
    },
    GlobalRatingsHome: {
      screen: GlobalRatingsHome,
      navigationOptions: ({ navigation }) => ({
       title: 'Global Ratings',
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
    SelectedBetHistory: {
      screen: SelectedBetHistory,
      navigationOptions: ({ navigation }) => ({
       title: 'Selected Bets History',
       headerStyle: { backgroundColor: 'silver' }
     })
    },
    BetHistoryBatch: {
      screen: BetHistoryBatch,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.label}`,
        headerStyle: { backgroundColor: 'silver' }
     })
    },
    SelectedBetsHome: {
      screen: SelectedBetsHome,
      navigationOptions: ({ navigation }) => ({
       title: 'Selected Bets',
       headerStyle: { backgroundColor: 'silver' }
     })
    },
    SelectedResultsBets: {
      screen: SelectedResultsBets,
      navigationOptions: ({ navigation }) => ({
       title: 'Selected Results Bets',
       headerStyle: { backgroundColor: 'silver' }
     })
    },
    SelectedGoalsBets: {
      screen: SelectedGoalsBets,
      navigationOptions: ({ navigation }) => ({
       title: 'Selected Goals Bets',
       headerStyle: { backgroundColor: 'silver' }
     })
    },
    SelectedBetsHome: {
      screen: SelectedBetsHome,
      navigationOptions: ({ navigation }) => ({
       title: 'Selected Bets',
       headerStyle: { backgroundColor: 'silver' }
     })
    },
    TeamRating: {
      screen: TeamRating,
      navigationOptions: ({ navigation }) => ({
       title: `${navigation.state.params.teamRating.team}`+ ' - '+`${navigation.state.params.market}`,
       headerStyle: { backgroundColor: 'silver' }
     })
  },
    Accuracy: {
      screen: Accuracy,
      navigationOptions: ({ navigation }) => ({
       title: `${navigation.state.params.label}`,
       headerStyle: { backgroundColor: 'silver' }
     })
    },
    Betting: {
      screen: Betting,
      navigationOptions: ({ navigation }) => ({
       title: 'Betting',
       headerStyle: { backgroundColor: 'silver' }
     })
    }});

const App = createAppContainer(AppNavigator);

export default App;
