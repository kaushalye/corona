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
      // country: this.props.countries.filter(c => c.countryInfo.iso2 === this.props.iso2),
      // regions: this.props.regions.filter(r => r.iso2 === this.props.iso2)
    };
  }

  render() {
    // const id = 'AU';

    const country = this.props.countries;
    const regions = this.props.regions;
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
