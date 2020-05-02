
import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import StringUtil from '../lib/string_util';

class SubHeader extends Component {

  render() {
      return (
        <Container className="countrySummary">   
          <Container align="right"> 
            <span><strong>Active:</strong>{StringUtil.formatNumber(this.props.active)}&nbsp;</span>
            <span><strong>Critical:</strong>{StringUtil.formatNumber(this.props.critical)}&nbsp;</span>
            <span><strong>Tests:</strong>{StringUtil.formatNumber(this.props.tests)}&nbsp;</span>
            <span>|&nbsp;</span>
            <span><strong>CasesToday:</strong>{StringUtil.formatNumber(this.props.todayCases)}&nbsp;</span>
            <span><strong>DeathsToday:</strong>{StringUtil.formatNumber(this.props.todayDeaths)}&nbsp;</span> 
          </Container>  
      </Container>

    );
  };
}

export default SubHeader;