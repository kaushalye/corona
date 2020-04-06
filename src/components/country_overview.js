import React, {Component} from 'react';
import { Tabs, Tab, Container, Row, Col} from 'react-bootstrap';
import InfoCard from './info_card';
import State from './state';
import Country from './country';
class CountryOverview extends Component {

  constructor(props) {
    super(props);
    console.log('props');
    console.log(props);

    this.state = {
      regions:[]
    };
  }

  componentDidMount() {
    const url = 'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/timeseries?iso2='+this.props.iso2
    console.log('fetching '+url)
    fetch( url)
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
    // const id = 'AU';

    const country = this.props.countries.filter(c => c.countryInfo.iso2 === this.props.iso2);
    const regions = this.state.regions;
    return (
      <Container className="full-height">
        <Container fluid>
          {country.map((c, i) => {
            return <Row key={i}>
                    <Col> <InfoCard class="cinfo"  title="Confirmed" text={c.cases}/> </Col>
                    <Col> <InfoCard class="cdanger"  title="Deaths" text={c.deaths} /> </Col>
                    <Col> <InfoCard class="csuccess"  title="Recovered" text={c.recovered} /> </Col>
                  </Row>
          })}
       </Container>
       <Container>
          <Row float="center">
          <Col>
            <Tabs defaultActiveKey="compare" className="justify-content-center">
              <Tab eventKey="compare" title="State Comparison">
                <Country regions={regions}/>
              </Tab>
              <Tab eventKey="overview" title="State Overview">
                <State regions={regions}/>
              </Tab>
            </Tabs>
            </Col>
          </Row>
       </Container>
    </Container>
    );
  }
}

export default CountryOverview;
