// in App.js
import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import SinglemoviePage from './SinglemoviePage';
import Movieboard from './Movieboard.js'
class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="movieboard" component={Movieboard} title="Movieboard" initial={true} />
          <Scene key="singlemovie" component={SinglemoviePage} title="Singlemovie" />
        </Scene>
      </Router>
    )
  }
}
export default App;


//in Movieboard.js
_onPressButton(rowID) {
  const {movies} = this.state.data;
}