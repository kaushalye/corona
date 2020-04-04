import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Stats from './components/stats';
import WorldCoronaMap from './components/world';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

class App extends Component {

  state = {
    countries: []
  }

  componentDidMount() {
    fetch( 'https://corona.lmao.ninja/countries?sort=country')
    .then(res => res.json())
    .then((data) => {
      this.setState({ countries: data })
    })
    .catch(console.log)
  }

  render() {
    return (
      <Router>
      <div>
        <nav className="nav nnav nav-tabs justify-content-center">
          <a className="nav-link" href="/corona/stats">Stats</a>
          <a className="nav-link" href="/corona/map">Map</a>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/corona/stats">
            <Stats countries={this.state.countries} />
          </Route>
          <Route path="/corona/map">
            <WorldCoronaMap />
          </Route>
          <Redirect from="/corona" to="/corona/stats" />
        </Switch>
      </div>
    </Router>
    );
  }
}

export default App;
