import React, {Component} from 'react';
import RegionGraph from './region';

class Country extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedState: 'Victoria',
    }; 
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount - country view');
  }

  handleChange(e){
    console.log( 'handleChange', e.target.value);
    this.setState({selectedState: e.target.value});
  }

  render() {
    return (
      <div className="container.fluid">
        <div className="row">
          <div className="col">
          <select className="custom-select" value={this.state.selectedState}  onChange={this.handleChange} >
            {this.props.regions.map((r) => {
                return  <option value={r.state} >{r.state}</option>
            })}
          </select>
          </div>
          
        </div>
        <div className="row">
            <div className="col">
              {this.props.regions
                .filter(r =>  r.state === this.state.selectedState)
                .map((region) => {
                return <RegionGraph region={region}/>;
              })}
          </div>
        </div>
      </div>
      
    );
  }
}

export default Country;
