import React, {Component} from 'react';
import StateGraph from './state_graph';
import { Container, Row, Col, Form, InputGroup} from 'react-bootstrap';
class State extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedState: 'Tasmania',
    }; 
    this.handleChange = this.handleChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    if (this.props.regions.length > 0 ) {
      this.setState({selectedState:this.props.regions[0].state});
    }
  }

  handleChange(e){
    this.setState({selectedState: e.target.value});
  }

  render() {
    return (
      <Container className="statePane">
        <Row align="center">
          <Col className="form-inline">
          <Form.Group>
            <Form.Label >State:</Form.Label>
            <Form.Control as="select" value={this.state.selectedState} onChange={this.handleChange}>
              { this.props.regions.map((r, i) => {
                  return  <option key={i} value={r.state} >{r.state}</option>
              })}
            </Form.Control>
          </Form.Group>
          </Col>
        </Row>
        <Row align="center">
            <Col>
              {this.props.regions
                .filter(r =>  r.state === this.state.selectedState)
                .map((region, i) => {
                return <StateGraph key={i} region={region}/>;
              })}
          </Col>
        </Row>
      </Container>
      
    );
  }
}

export default State;
