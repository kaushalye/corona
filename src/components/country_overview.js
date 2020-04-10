import React, { Component } from 'react';
import { Image, Tabs, Tab, Container, Row, Col } from 'react-bootstrap';
import InfoCard from './info_card';
import State from './state';
import Country from './country';
import StateGraph from './state_graph';

class CountryOverview extends Component {

  constructor(props) {
    super(props);
    console.log('props');
    console.log(props);

    this.state = {
      regions: [],
    };
  }

  componentDidMount() {
    const url = 'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/timeseries?iso2=' + this.props.iso2
    console.log('fetching ' + url)
    fetch(url)
      .then(res => res.json())
      .then((data) => {
        console.log('fetched from wuhan-coronavirus-api');
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
        console.log('update state for regions', regions.length);
        console.log(regions);
        return this.setState({ regions: regions });
      })
      .catch(console.log)
  }

  render() {
    // const id = 'AU';

    const country = this.props.countries.filter(c => c.countryInfo.iso2 === this.props.iso2);
    const regions = this.state.regions;
    const hasMultipleStates = regions.length > 1;
    
    return (
        <Container className="countryPane">

          {country.map((c, i) => {
            return (
                <Row className="countryHeader" float="center" key={i}>
                  <Col> 
                    <Image src={country.map(c => c.countryInfo.flag).join(',')} rounded className="flagImg"/>
                    <span className="countryName">{country.map(c => c.country).join(',')}</span> 
                  </Col>
                  <Col> 
                    <InfoCard class="cinfo" title="Confirmed" text={c.cases} />  
                    <InfoCard class="cdanger" title="Deaths" text={c.deaths} /> 
                    <InfoCard class="csuccess" title="Recovered" text={c.recovered} /> 
                  </Col>
                </Row>
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
