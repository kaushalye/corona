import React, {Component} from 'react';
import StateGraph from './state_graph';
import { Container, Row, Col, Form, InputGroup} from 'react-bootstrap';
class State extends Component {

  constructor(props) {
    super(props);
    console.log('constructor...');
    this.state = {
      selectedState: '',
      stateLatest: {
        cases: 0,
        deaths: 0,
        recovered: 0,
      }
    }; 
    this.handleChange = this.handleChange.bind(this);
    this.setCurrentState = this.setCurrentState.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const state = this.props.regions.length > 0 ? this.props.regions[0].state: 'bbb';
    this.setCurrentState(state);
  }

  setCurrentState(state) {
    this.setState({selectedState: state});
    this.props.regions
    .filter(r =>  r.state === state)
    .map(region => {
      const cases = region.confirmed.length > 0 ? region.confirmed.slice(-1)[0] : 0;
      const deaths = region.deaths.length > 0 ? region.deaths.slice(-1)[0] : 0;
      const recovered = region.recovered.length > 0 ? region.recovered.slice(-1)[0] : 0;
      const latest = {
        cases, deaths, recovered
      }
      this.setState({stateLatest: latest});
    })
  }

  handleChange(e){
    this.setCurrentState(e.target.value);
  }

  render() {
    console.log('render...');
    return (
      <Container>
          <Container className="stateInfo">
            <Form.Control as="select" value={this.state.selectedState} onChange={this.handleChange}>
                { this.props.regions.map((r, i) => {
                    return  <option key={i} value={r.state} >{r.state}</option>
                })}
            </Form.Control>
            <Container className="stateDetails">
              <span className="dot bginfo">{this.state.stateLatest.cases}</span>
                <span className="dot bgdanger">{this.state.stateLatest.deaths}</span>
                <span className="dot bgsuccess">{this.state.stateLatest.recovered}</span>
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
