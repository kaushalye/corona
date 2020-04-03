import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Stats from './components/stats';
import WorldCoronaMap from './components/world';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
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
        <nav className="nav nav-tabs justify-content-center">
        <a class="nav-link" href="/stats">Stats</a>
        <a class="nav-link" href="/map">Map</a>
          {/* <ul>
            <li>
              <Link to="/stats">Stats</Link>
            </li>
            <li>
              <Link to="/map">Map</Link>
            </li>
          </ul> */}
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/stats">
            <Stats countries={this.state.countries} />
          </Route>
          <Route path="/map">
            <WorldCoronaMap />
          </Route>
        </Switch>
      </div>
    </Router>
    );
  }
}

export default App;
