import React, {Component} from 'react';
import CountryGraph from './country_graph';
import { Container, Form} from 'react-bootstrap';
class Country extends Component {


  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 'Confirmed',
    }; 
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.setState({selectedIndex: e.target.value});
  }

  render() {
    const data = {
      Confirmed: this.props.regions.map(r => {
        return {state: r.state, data: r.confirmed, ts: r.ts}
      }),
      Deaths: this.props.regions.map(r => {
        return {state: r.state, data: r.deaths, ts: r.ts}
      }),
      Recovered: this.props.regions.map(r => {
        return {state: r.state, data: r.recovered, ts: r.ts}
      }),
    }

    return (
      <Container>
      <Container className="stateInfo">
        <Form.Control as="select" value={this.state.selectedState} onChange={this.handleChange}>
            {Object.keys(data).map((v, i) => {
                  return  <option key={i} value={v} >{v}</option>
              })}
          </Form.Control>
          <Container></Container>
      </Container>
      <Container>
        <CountryGraph title={this.state.selectedIndex} data={data[this.state.selectedIndex]}/>
      </Container>
    </Container>
    );
  }
}

export default Country;
