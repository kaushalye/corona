import React, { Component } from 'react';
import {Container, Row, Col } from 'react-bootstrap';
import State from './state';
import Country from './country';
import StateGraph from './state_graph';
import StatsHeader from './stats_header';
import CountrySummary from './country_summary';

class CountryOverview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      regions: [],
    };
  }

  componentDidMount() {
    const url = 'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/timeseries?iso2=' + this.props.iso2
    fetch(url)
      .then(res => res.json())
      .then((data) => {
        const regions = data.map(r => {
          const ts = Object.keys(r.timeseries);
          return {
            state: r.provincestate,
            country: r.countryregion,
            iso2: r.countrycode ? r.countrycode.iso2 : '',
            ts: ts,
            confirmed: ts.map(t => r.timeseries[t].confirmed),
            deaths: ts.map(t => r.timeseries[t].deaths),
            recovered: ts.map(t => r.timeseries[t].recovered),
          };
        });
        return this.setState({ regions: regions });
      })
      .catch(console.log)
  }

  render() {
    const country = this.props.countries.filter(c => c.countryInfo.iso2 === this.props.iso2);
    const regions = this.state.regions;
    const hasMultipleStates = regions.length > 1;
    
    return (
        <Container className="countryPane">

          {country.map((c, i) => {
            return (
              <StatsHeader 
                name={c.country}
                img={c.countryInfo && c.countryInfo.flag} 
                imgClass="flagImg" 
                confirmed={c.cases}
                deaths={c.deaths}
                recovered={c.recovered}
              />
            )
          })}
                
          {country.map((c, i) => {
            return (
              <CountrySummary 
                critical={c.critical}
                active={c.active}
                tests={c.tests}
                todayCases={c.todayCases}
                todayDeaths={c.todayDeaths}
                casesPerOneMillion={c.casesPerOneMillion}
                deathsPerOneMillion={c.deathsPerOneMillion}
                testsPerOneMillion={c.testsPerOneMillion}
              />
            )
          })}
                <Row float="center" className="countryGraphPane">
                  <Col>
                    {!hasMultipleStates &&
                      <Container >
                        {regions.map((region, i) => {
                          return <StateGraph key={i} region={region} />;
                        })}
                      </Container>
                    }

                    {hasMultipleStates &&
                        <Container >
                          <State regions={regions} />
                        </Container>
                    }
      
                    {hasMultipleStates &&
                      <Container>
                        <Country regions={regions} />
                      </Container>
                    }
                  </Col>
                </Row>
        </Container>
    );
  }
}

export default CountryOverview;
