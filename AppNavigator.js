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
    import Teams from "./src/screens/Teams";
    import Team from "./src/screens/Team";
    import Match from "./src/screens/Match";

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
    Country: {
      screen: Country
    },
    Teams: {
      screen: Teams
    },
    Team: {
      screen: Team
    },
    Match: {
      screen: Match
    }
    });

const App = createAppContainer(AppNavigator);

export default App;
