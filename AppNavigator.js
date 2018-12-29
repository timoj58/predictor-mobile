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
    import SelectedBet from "./src/screens/SelectedBet";



    const AppNavigator = createStackNavigator({
      Splash: {
       screen: Splash
     },
      RegisterUsername: {
       screen: RegisterUsername
     },
     RegisterPassword: {
       screen: RegisterPassword
     },
     LoginUsername: {
      screen: LoginUsername
    },
    LoginPassword: {
      screen: LoginPassword
    },
    Home: {
      screen: Home
    },
    Countries: {
      screen: Countries
    },
    Country: {
      screen: Country
    },
    Competition: {
      screen: Competition
    },
    Events: {
      screen: Events
    },
    Event: {
      screen: Event
    },
    Teams: {
      screen: Teams
    },
    Team: {
      screen: Team
    },
    Match: {
      screen: Match
    },
    Matches: {
      screen: Matches
    },
    MatchYears: {
      screen: MatchYears
    },
    MatchMonths: {
      screen: MatchMonths
    },
    Players: {
      screen: Players
    },
    Player: {
      screen: Player
    },
    GlobalRatings: {
      screen: GlobalRatings
    },
    GlobalRatingsHome: {
      screen: GlobalRatingsHome
    },
    SelectedBets: {
      screen: SelectedBets
    },
    SelectedBet: {
      screen: SelectedBet
    },
    SelectedBetHistory: {
      screen: SelectedBetHistory
    },
    SelectedBetsHome: {
      screen: SelectedBetsHome
    },
    SelectedResultsBets: {
      screen: SelectedResultsBets
    },
    SelectedGoalsBets: {
      screen: SelectedGoalsBets
    },
    SelectedBetsHome: {
      screen: SelectedBetsHome
    },
    TeamRating: {
      screen: TeamRating
    },
    Accuracy: {
      screen: Accuracy
    },
    Betting: {
      screen: Betting
    }});

const App = createAppContainer(AppNavigator);

export default App;
