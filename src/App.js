import React, {Component} from 'react';
import './App.css';
import CountryOverview from './components/country_overview';
import { Container, Nav, Navbar} from 'react-bootstrap';
import WorldOverview from './components/world_overview'
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
  
  }

  render() {
    return (
      <Router>
      <Container className="full-height">
      <Navbar className="justify-content-center" bg="primary" variant="dark" >
        <Nav  >
          <Nav.Link eventKey="1" href="/corona/world">World</Nav.Link>
          <Nav.Link eventKey="2" href="/corona/country/AU">Australia</Nav.Link>
        </Nav>
      </Navbar>
        <Switch>
          <Route path="/corona/world">
            <WorldOverview countries={this.state.countries} />
          </Route>
          <Route path="/corona/country/:id" render={({match}) => (
                       <CountryOverview 
                       iso2={match.params.id}
                       countries={this.state.countries.filter(c => c.countryInfo.iso2 === match.params.id)} 
                       />
              )}/>
          <Redirect from="/corona" to="/corona/world" />
        </Switch>
      </Container>
    </Router>
    );
  }
}

export default App;
