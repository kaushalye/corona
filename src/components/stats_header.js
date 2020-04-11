
import React, {Component} from 'react';
import { InputGroup, FormControl, Form, Container, Row, Col, Image} from 'react-bootstrap';
import InfoCard from './info_card';

class StatsHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
        <Container className="countryHeader2">  
          <Container align="left">  
            <Image src={this.props.img}  className={this.props.imgClass} />
            {this.props.name && 
                <span className="countryName">{this.props.name} </span> 
            }
           </Container>  
          <Container align="right">  
            <InfoCard class="cinfo" title="Cases" text={this.props.confirmed}  />  
            <InfoCard class="cdanger" title="Deaths" text={this.props.deaths} /> 
            <InfoCard class="csuccess" title="Recovered" text={this.props.recovered} /> 
          </Container>  
      </Container>  

    );
  };
}

export default StatsHeader;