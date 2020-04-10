import React, {Component} from 'react';
import { InputGroup, FormControl, Form, Container, Row, Col, Image} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import StatsHeader from './stats_header';
class WorldOverview extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      textfilter: '',
      todayOnly: false,
      countriesToCompare: [],
      soFar: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleToday = this.toggleToday.bind(this);
  }

  toggleToday(e) {
    this.setState({todayOnly: e.target.checked});
  }
  handleChange(e){
    this.setState({
      textfilter: e.target.value,
    });
  }

  componentDidMount() {

    fetch( 'https://corona.lmao.ninja/all')
    .then(res => res.json())
    .then((data) => {
      console.log('fetched from corona.lmao.ninja all');
      this.setState({ 
        soFar: data,
        lastUpdated: data.updated,
      });
    })
    .catch(console.log)

  }

  render() {

    const rankFormatter = (cell, row, rowIndex, formatExtraData) => {
      return (
      <span className="worldLink"><a href={"/corona/country/"+row.countryInfo.iso2}>{row.country}</a></span>
      );
    }

    const columns = [
      {
        sort: true,
        dataField: 'country',
        formatter: rankFormatter,
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

    const countriesToCompare = this.state.textfilter.split(',').map(str => str.trim().toLowerCase());
    const filteredCountries = this.props.countries.filter( c => (countriesToCompare.length > 1) ? countriesToCompare.includes(c.country.toLowerCase()): c.country.toLowerCase().startsWith(this.state.textfilter.toLowerCase()))
    
    console.log('advanced', filteredCountries);
           
    return (
      <Container>
        <StatsHeader 
            name="Golbal"
            img="/corona.png" 
            imgClass="globalImg" 
            confirmed={this.state.soFar.cases}
            deaths={this.state.soFar.deaths}
            recovered={this.state.soFar.recovered}
        />
        <Row float="center" className="worldControlPane">
    
          <Col>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1" >Filter</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="usa, uk, italy"
              aria-label="Filter"
              aria-describedby="basic-addon1"
              onInput={this.handleChange}
            />
          </InputGroup>
          </Col>
          <Col>           
            <Form.Group controlId="formBasicCheckbox">
            <label class="switch">
              <input type="checkbox" onChange={this.toggleToday}/> 
              <span class="slider"></span>
            </label> <span>Show today</span>
              {/* <Form.Check type="checkbox" id="switch" label="Today" onChange={this.toggleToday} /> */}
            </Form.Group> 
            
            </Col>
          </Row>
          <Row float="center"  className="textAll">
            <Col>
    <span>Select a country to see details</span>
            </Col>
          </Row>
          <Row float="center">
            <Col>
              <BootstrapTable keyField='country' 
                data = {filteredCountries}
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
