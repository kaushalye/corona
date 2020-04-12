import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import StringUtil from '../lib/string_util';

class InfoCard extends Component {

  render() {
    return (
      <Container className="cardContainer">
        <span className={this.props.class}>{this.props.title}:</span><span className="cardText">{StringUtil.formatNumber(this.props.text)}</span>
        </Container>
    );
  }
}

export default InfoCard;
