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
    this.countryFormatter = this.countryFormatter.bind(this);
    this.toNumString = this.toNumString.bind(this);
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
      this.setState({ 
        soFar: data,
        lastUpdated: data.updated,
      });
    })
    .catch(console.log)

  }

  toNumString(num) {
    if (!num) {
      return "0";
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  countryFormatter(cell, row, rowIndex, formatExtraData)  {
    return (
    <span className="worldLink">
      <a href={"/corona/country/"+row.countryInfo.iso2}>
        <Image src={row.countryInfo.flag} className="flagImg" />&nbsp;{row.country}
      </a>
    </span>
    );
  }

  render() {

    const columns = [
      {
        sort: true,
        dataField: 'country',
        formatter: this.countryFormatter,
        text: 'Country'
      },
      {
        sort: true,
        headerAlign: 'right',
        align: 'right',
        dataField: 'cases',
        formatter: this.toNumString,
        text: 'Cases'
      },
      {
        sort: true,
        headerAlign: 'right',
        align: 'right',
        dataField: 'deaths',
        formatter: this.toNumString,
        text: 'Deaths'
      },
      {
        sort: true,
        headerAlign: 'right',
        align: 'right',
        dataField: 'recovered',
        formatter: this.toNumString,
        text: 'Recovered'
      },
      {
        sort: true,
        headerAlign: 'right',
        align: 'right',
        dataField: 'active',
        formatter: this.toNumString,
        text: 'Active'
      },
      {
        sort: true,
        headerAlign: 'right',
        align: 'right',
        dataField: 'critical',
        formatter: this.toNumString,
        text: 'Critical'
      },
      {
        sort: true,
        headerAlign: 'right',
        align: 'right',
        dataField: 'tests',
        formatter: this.toNumString,
        text: 'Tests'
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
        formatter: this.toNumString,
        text: 'Today Cases'
      },
      {
        sort: true,
        headerAlign: 'right',
        align: 'right',
        dataField: 'todayDeaths',
        formatter: this.toNumString,
        text: 'Today Deaths'
      },
    ];
    
    const defaultSorted = [{
      dataField: 'cases',
      order: 'desc'
    }];

    const countriesToCompare = this.state.textfilter.split(',').map(str => str.trim().toLowerCase());
    const filteredCountries = this.props.countries.filter( c => (countriesToCompare.length > 1) ? countriesToCompare.includes(c.country.toLowerCase()): c.country.toLowerCase().startsWith(this.state.textfilter.toLowerCase()))
           
    return (
      <Container>
        <StatsHeader 
            name="Global"
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
            <label className="switch">
              <input type="checkbox" onChange={this.toggleToday}/> 
              <span className="slider"></span>
            </label> <span>Show today</span>
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
              <BootstrapTable 
                keyField='country' 
                data = {filteredCountries}
                columns={ this.state.todayOnly? columnsToday: columns }  
                striped={true}
                condensed={true}
                hover={true}
                bordered={ false }
                classes={'worldTable'}
                // pagination={ paginationFactory({ paginationSize: 20}) }
                defaultSorted= {defaultSorted }/>
            </Col>
          </Row>
          <Row>
            <Col className="dataSource">Data source: <a href="https://github.com/CSSEGISandData/COVID-19" target="_blank" rel="noopener noreferrer" >Johns Hopkins University</a></Col>
          </Row>
      </Container>
    );
  }
}

export default WorldOverview;
