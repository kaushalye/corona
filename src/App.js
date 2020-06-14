import React, {Component} from 'react';
import './App.css';
import CountryOverview from './components/country_overview';
import { Container, Nav, Navbar, Image} from 'react-bootstrap';
import WorldOverview from './components/world_overview'
import CompareView from './components/compare_view';
import WorldMap from './components/world_map';
import StringUtil from './lib/string_util';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

class App extends Component {

  state = {
    countries: [],
    yesterdayCountries: [],
    freqCountries: [],
    regions: [],
  }

  componentDidMount() {
    // Get today data
    fetch( 'https://corona.lmao.ninja/v2/countries?sort=cases')
    .then(res => res.json())
    .then((data) => {
      localStorage.setItem('world-c19', JSON.stringify(data));
      this.setState({ 
        countries: data,
      });
    })
    .catch(console.log)

    // Get yesterday data
    fetch( 'https://corona.lmao.ninja/v2/countries?sort=cases&yesterday=true')
    .then(res => res.json())
    .then((data) => {
      localStorage.setItem('world-c19-yesterday', JSON.stringify(data));
      this.setState({ 
        yesterdayCountries: data,
      });
    })
    .catch(console.log)

    // Get frequentlyt accessed coutnries from local storage
    this.setState({ 
      freqCountries: StringUtil.getFreqCountries() || [],
    });
    

  }

  render() {

    return (
      <Router>
      <Container className="full-height">
      <Navbar className="justify-content" bg="primary" variant="dark" >
        <Nav >
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
        <Nav className="mr-auto">
          <Nav.Link href="/corona/world">      
            <span className="pageTitle" >COVID-19 statistics</span>
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Item className="justify-content-end">  
            <Container className="recentyAccessed">
              {this.state.freqCountries.slice(0, 5).reverse().map(fc => {
                const imgSrc = StringUtil.flagImg(fc);//`https://corona.lmao.ninja/assets/img/flags/${c.iso2.toLowerCase()}.png`;
                return (
                  <a href={`/corona/country/${fc}`}><Image src={imgSrc}></Image></a>
                  
                );
              })}
            </Container>
         
          </Nav.Item>
        </Nav>
      </Navbar>

      <Switch>
          <Route path="/corona/world">
            <WorldOverview countries={this.state.countries} yesterdayCountries={this.state.yesterdayCountries}/>
          </Route>
          <Route path="/corona/map">
            <WorldMap countries={this.state.countries} yesterdayCountries={this.state.yesterdayCountries}/>
          </Route>
          {/* <Route path="/corona/compare">
            <CompareView/>
          </Route> */}
          <Route path="/corona/compare" component={CompareView} />
          <Route path="/corona/country/:id" render={({match}) => (
                       <CountryOverview 
                       iso2={match.params.id.toUpperCase()}
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
