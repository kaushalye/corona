
import React, {Component} from 'react';
import {Container, Image} from 'react-bootstrap';
import InfoCard from './info_card';
import SubHeader from './sub_header';
class StatsHeader extends Component {

  render() {
    const allData = this.props.data;
      return (
        <Container>
        <Container className="countryHeader">  
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
      <SubHeader 
          critical={allData.critical}
          active={allData.active}
          tests={allData.tests}
          todayCases={allData.todayCases}
          todayDeaths={allData.todayDeaths}
          casesPerOneMillion={allData.casesPerOneMillion}
          deathsPerOneMillion={allData.deathsPerOneMillion}
          testsPerOneMillion={allData.testsPerOneMillion}
        />  
      </Container>

    );
  };
}

export default StatsHeader;