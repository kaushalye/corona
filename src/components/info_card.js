import React, {Component} from 'react';
import {Card, Col} from 'react-bootstrap';
class InfoCard extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Header align="center">{this.props.title}</Card.Header>
          <Card.Text>
            <p align="center">{this.props.text}</p>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default InfoCard;
