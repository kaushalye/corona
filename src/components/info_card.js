import React, {Component} from 'react';
import {Jumbotron, Container, Card, Col} from 'react-bootstrap';
class InfoCard extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Jumbotron className={this.props.class} >
        <h4>{this.props.title}</h4>
        <p>{this.props.text}</p>
      </Jumbotron>

    );
  }
}

export default InfoCard;
