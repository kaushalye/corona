import React, {Component} from 'react';
import {Jumbotron, Container, Card, Col} from 'react-bootstrap';
class InfoCard extends Component {

  constructor(props) {
    super(props);
  }

  toNumString(num) {
    if (!num) {
      return "0";
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
  
  render() {
    return (
      <Container className="cardContainer">
        <span className={this.props.class}>{this.props.title}:</span><span className="cardText">{this.toNumString(this.props.text)}</span>
        </Container>
    );
  }
}

export default InfoCard;
