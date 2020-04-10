
import React, {Component} from 'react';
import { InputGroup, FormControl, Form, Container, Row, Col, Image} from 'react-bootstrap';
import InfoCard from './info_card';

class StatsHeader extends Component {
  constructor(props) {
    super(props);
  }


  render() {
      return ( 
        <Container>  
            <Row className="countryHeader" >
              <Col sm={3}>
                <Image src={this.props.img}  className={this.props.imgClass} />
                <span className="countryName">{this.props.name} </span> 
              </Col>
              <Col sm={9} align="right"> 
                <InfoCard class="cinfo" title="Confirmed" text={this.props.confirmed}  />  
                <InfoCard class="cdanger" title="Deaths" text={this.props.deaths} /> 
                <InfoCard class="csuccess" title="Recovered" text={this.props.recovered} /> 
              </Col>
          </Row>
        </Container>  
    );
  };
}

export default StatsHeader;