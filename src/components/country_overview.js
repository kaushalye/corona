import React, {Component} from 'react';
import { Card, Container, Row, Col} from 'react-bootstrap';
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
      <Container>
        <Container>
          <Row float="center">
            <Col> <InfoCard title="Confirmed" text="10000"/> </Col>
            <Col> <InfoCard title="Deaths" text="20"/> </Col>
            <Col> <InfoCard title="Recovered" text="5000"/> </Col>
          </Row>
        </Container>

        <Container>
          <Row float="center">
            <Col>
              <Card>
                <Card.Body>
                  <Card.Header align="center">State Overview</Card.Header>
                  <Card.Text>
                    <State regions={this.props.regions}/>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        <Container>
          <Row float="center">
            <Col>
              <Card>
                <Card.Body>
                  <Card.Header align="center">State Comparison</Card.Header>
                  <Card.Text>
                    <Country regions={this.props.regions}/>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

export default CountryOverview;
