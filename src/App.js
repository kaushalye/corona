import React, {Component} from 'react';
import './App.css';
import Stats from './components/stats';
import Country from './components/country';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

class App extends Component {

  state = {
    countries: [],
    regions: [],
  }

 
  componentDidMount() {

    fetch( 'https://corona.lmao.ninja/countries?sort=country')
    .then(res => res.json())
    .then((data) => {
      console.log('fetched from corona.lmao.ninja');
      this.setState({ countries: data });
    })
    .catch(console.log)

    return fetch( 'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/timeseries?iso2=AU')
    .then(res => res.json())
    .then((data) => {
      console.log('fetched from wuhan-coronavirus-api');
      const regions = data.map(r => {
        const ts = Object.keys(r.timeseries);
        return {
          state: r.provincestate,
          country: r.countryregion,
          iso2: r.countrycode ? r.countrycode.iso2: '',
          ts: ts,
          confirmed: ts.map(t => r.timeseries[t].confirmed ),
          deaths:ts.map(t => r.timeseries[t].deaths ),
          recovered:ts.map(t => r.timeseries[t].recovered ),
        };
      });
      console.log('update state for regions', regions.length);
      console.log(regions);
      return this.setState({ regions: regions });
    })
    .catch(console.log)
  
  }

  render() {
    return (
      <Router>
      <div>
        <nav className="nav nnav nav-tabs justify-content-center">
          <a className="nav-link" href="/corona/world">World</a>
          <a className="nav-link" href="/corona/aus">Aus</a>
        </nav>
        <Switch>
          <Route path="/corona/world">
            <Stats countries={this.state.countries} />
          </Route>
          <Route path="/corona/aus">
            <Country  regions={this.state.regions.filter(r => r.iso2 === 'AU')} />
          </Route>
          <Redirect from="/corona" to="/corona/stats" />
        </Switch>
      </div>
    </Router>
    );
  }
}

export default App;
