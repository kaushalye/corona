import React, {Component} from 'react';
import { InputGroup, FormControl, Form, Container, Row, Col} from 'react-bootstrap';
import InfoCard from './info_card';
import BootstrapTable from 'react-bootstrap-table-next';

class WorldOverview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      textfilter: '',
      todayOnly: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleToday = this.toggleToday.bind(this);
  }

  toggleToday(e) {
    console.log( 'toggleToday', e.target.checked);
    this.setState({todayOnly: e.target.checked});
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
        headerAlign: 'right',
        align: 'right',
        dataField: 'cases',
        text: 'Cases'
      },
      {
        sort: true,
        headerAlign: 'right',
        align: 'right',
        dataField: 'deaths',
        text: 'Deaths'
      },
      {
        sort: true,
        headerAlign: 'right',
        align: 'right',
        dataField: 'recovered',
        text: 'Recovered'
      },
      {
        sort: true,
        headerAlign: 'right',
        align: 'right',
        dataField: 'active',
        text: 'Active'
      },
      {
        sort: true,
        headerAlign: 'right',
        align: 'right',
        dataField: 'critical',
        text: 'Critical'
      }
    ];

    const columnsToday = [
      {
        sort: true,
        dataField: 'country',
        text: 'Country'
      },
      {
        sort: true,
        headerAlign: 'right',
        align: 'right',
        dataField: 'todayCases',
        text: 'Today Cases'
      },
      {
        sort: true,
        headerAlign: 'right',
        align: 'right',
        dataField: 'todayDeaths',
        text: 'Today Deaths'
      },
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
          <Col>           
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Today" onChange={this.toggleToday} />
            </Form.Group></Col>
          </Row>
          <Row float="center">
          <Col>
          <BootstrapTable keyField='country' 
            data={ 
              this.props.countries.filter(c=> c.country.toLowerCase().startsWith( this.state.textfilter.toLowerCase())) 
            } 
            columns={ this.state.todayOnly? columnsToday: columns }  
            striped={true}
            condensed={true}
            hover={true}
            bordered={ false }
            classes={'worldTable'}
            defaultSorted= {defaultSorted }/>
          </Col>
          </Row>
          
         
      </Container>
    );
  }
}

export default WorldOverview;
