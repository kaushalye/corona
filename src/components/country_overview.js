import React, {Component} from 'react';
import { Tabs, Tab, Container, Row, Col} from 'react-bootstrap';
import InfoCard from './info_card';
import State from './state';
import Country from './country';

class CountryOverview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedState: 'Victoria',
    };
  }

  render() {
    return (
      <Container className="full-height">
        <Container>
          { this.props.country.map((c) => {
            return <Row float="center">
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
                <Country regions={this.props.regions}/>
              </Tab>
              <Tab eventKey="overview" title="State Overview">
                <State regions={this.props.regions}/>
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
