import React from 'react';
import AppNavigator from './AppNavigator';
import {SplashScreen } from 'expo';

export default class App extends React.Component {
  constructor(props) {
   super(props);
   SplashScreen.preventAutoHide();
 }

  render() {
    return (
      <AppNavigator/>
    );
  }
}
