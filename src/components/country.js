import React, {Component} from 'react';
import CountryGraph from './country_graph';
import { Container, Row, Col} from 'react-bootstrap';
class Country extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 'Confirmed',
    }; 
    this.handleChange = this.handleChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount - country view');
  }

  handleChange(e){
    console.log( 'handleChange', e.target.value);
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
        <Row align="center">
          <Col>
          <select value={this.state.selectedState}  onChange={this.handleChange} >
            {Object.keys(data).map((key) => {
                return  <option value={key} >{key}</option>
            })}
          </select>
          </Col>
          
        </Row>
        <Row align="center">
        {/* <Col>
          <p>{JSON.stringify(data[this.state.selectedIndex])}</p>
          </Col> */}
            <Col> 
              <CountryGraph title={this.state.selectedIndex} data={data[this.state.selectedIndex]}/>
          </Col>
        </Row>
      </Container>
      
    );
  }
}

export default Country;
