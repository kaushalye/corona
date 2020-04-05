import React, {Component} from 'react';
import { InputGroup, FormControl, Tabs, Tab, Container, Row, Col} from 'react-bootstrap';
import InfoCard from './info_card';
import BootstrapTable from 'react-bootstrap-table-next';

class WorldOverview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      textfilter: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    console.log( 'handleChange', e.target.value);
    this.setState({textfilter: e.target.value});
  }

  render() {
    const columns = [
      {
        sort: true,
        dataField: 'country',
        text: 'Country'
      },
      {
        sort: true,
        dataField: 'cases',
        text: 'Cases'
      },
      {
        sort: true,
        dataField: 'todayCases',
        text: 'todayCases'
      },
      {
        sort: true,
        dataField: 'deaths',
        text: 'deaths'
      },
      {
        sort: true,
        dataField: 'todayDeaths',
        text: 'todayDeaths'
      },
      {
        sort: true,
        dataField: 'recovered',
        text: 'recovered'
      },
      {
        sort: true,
        dataField: 'active',
        text: 'active'
      },
      {
        sort: true,
        dataField: 'critical',
        text: 'critical'
      }
    ];
    
    const defaultSorted = [{
      dataField: 'cases',
      order: 'desc'
    }];

    return (
      <Container className="full-height">
        <Row float="center">
          <Col>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1" >Filter</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Start typing here"
              aria-label="Filter"
              aria-describedby="basic-addon1"
              onInput={this.handleChange}
            />
          </InputGroup>
          </Col>
          </Row>
          <Row float="center">
          <Col>
          <BootstrapTable keyField='country' 
            data={ 
              this.props.countries.filter(c=> c.country.startsWith( this.state.textfilter)) 
            } columns={ columns }  
            striped={true}
            condensed={true}
            hover={true}
            defaultSorted= {defaultSorted}/>
          </Col>
          </Row>
          
         
      </Container>
    );
  }
}

export default WorldOverview;
