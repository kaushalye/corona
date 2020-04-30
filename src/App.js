import React, {Component} from 'react';
import './App.css';
import CountryOverview from './components/country_overview';
import { Container, Nav, Navbar} from 'react-bootstrap';
import WorldOverview from './components/world_overview'
import CompareView from './components/compare_view';

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

    fetch( 'https://corona.lmao.ninja/v2/countries?sort=country')
    .then(res => res.json())
    .then((data) => {
      this.setState({ 
        countries: data,
      });
    })
    .catch(console.log)

  }

  render() {

    return (
      <Router>
      <Container className="full-height">
      <Navbar className="justify-content" bg="primary" variant="dark" >
        <Nav>
          <Nav.Link eventKey="1" href="/corona/world">      
            <img
              src="/logo192.png"
              width="25"
              height="25"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            /> 
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Item>      
            <span className="pageTitle">COVID-19 statistics</span>
          </Nav.Item>
        </Nav>
      </Navbar>
        <Switch>
          <Route path="/corona/world">
            <WorldOverview countries={this.state.countries} />
          </Route>
          {/* <Route path="/corona/compare">
            <CompareView/>
          </Route> */}
          <Route path="/corona/compare" component={CompareView} />
          <Route path="/corona/country/:id" render={({match}) => (
                       <CountryOverview 
                       iso2={match.params.id}
                       countries={this.state.countries.filter(c => c.countryInfo.iso2 === match.params.id)} 
                       />
              )}/>
          <Redirect from="/corona" to="/corona/world" />
          <Redirect from="/" to="/corona/world" />
        </Switch>
        <Container className="footer fixed-bottom center">
          <span>© malindoz.com   - All rights reserved</span>
        </Container>
      </Container>
    </Router>
    );
  }
}

export default App;
