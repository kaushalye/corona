import React, {Component} from 'react';
import {Jumbotron, Container, Card, Col} from 'react-bootstrap';
class InfoCard extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container className="cardContainer">
        <span className={this.props.class}>{this.props.title}:</span><span className="cardText">{this.props.text}</span>
        </Container>
    );
  }
}

export default InfoCard;
