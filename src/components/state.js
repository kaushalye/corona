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
      <Container>
        <Container className="stateInfo">
          <Form.Control as="select" value={this.state.selectedState} onChange={this.handleChange}>
              { this.props.regions.map((r, i) => {
                  return  <option key={i} value={r.state} >{r.state}</option>
              })}
          </Form.Control>
          <Container className="stateDetails">
              <span className="dot bginfo">12345</span>
              <span className="dot bgdanger">34</span>
              <span className="dot bgsuccess">345</span>
          </Container>
        </Container>
        <Container>
          {this.props.regions
            .filter(r =>  r.state === this.state.selectedState)
            .map((region, i) => {
            return <StateGraph key={i} region={region}/>;
          })}
        </Container>
      </Container>
    );
  }
}

export default State;
