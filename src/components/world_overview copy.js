import React, {Component} from 'react';
import {
  withRouter
} from 'react-router-dom'
import { InputGroup, 
  FormControl,
  Container, 
  Row, 
  Col, 
  ToggleButtonGroup,
  ToggleButton,
  Button,
  Image} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import StatsHeader from './stats_header';
import StringUtil from '../lib/string_util';
import queryString from 'query-string';

const DEFAULT_FILTER = "usa, italy";

const modes = {
  ALL: 'all',
  TODAY: 'today',
  PERMILLION: 'permillion',
  PERTESTS: 'pertests'
}

class WorldOverview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      textfilter: '',
      mode: modes.ALL,
      countriesToCompare: [],
      soFar: {},
    };
    this.modeChanged = this.modeChanged.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.countryFormatter = this.countryFormatter.bind(this);
    this.toNumString = this.toNumString.bind(this);
    this.compare = this.compare.bind(this);
    this.createColumns = this.createColumns.bind(this);
    this.fetchWorld = this.fetchWorld.bind(this);
    this.setMode = this.setMode.bind(this);
  }

  setMode(mode) {
    if ( !mode || !modes.hasOwnProperty(mode.toUpperCase()) ) {
      mode = modes.ALL;
    }
    this.setState({
      mode: mode,
    });
  }

  modeChanged(e) {
    this.setMode(e.target.value);
    // this.setState({
    //   mode: e.target.value,
    // });
  }

  compare(e) {
    
    let selected = [];
    if (this.state.countriesToCompare.length > 1) {
      selected = this.state.countriesToCompare 
    } else {

      selected = DEFAULT_FILTER.split(',').map(s => s.trim());
    }
    const codes = this.props.countries
      .filter(c => selected.includes(
        c.country.toLowerCase()
      ))
      .map(c => c.countryInfo.iso2);

    return this.props.history.push('/corona/compare?countries='+codes.join(','));  
  }

  handleChange(e){
    const countriesToCompare = e.target.value.split(',').map(str => str.trim().toLowerCase());
    this.setState({
      textfilter: e.target.value,
      countriesToCompare
    });
  }

  fetchWorld() {
    fetch( 'https://corona.lmao.ninja/v2/all')
    .then(res => res.json())
    .then((data) => {
      this.setState({ 
        soFar: data,
        lastUpdated: data.updated,
      });
    })
    .catch(console.log)
  }

  componentDidMount() {
    this.fetchWorld();
    const params = queryString.parse(this.props.location.search);
    this.setMode(params.mode);
  }

  toNumString(num) {
    return StringUtil.formatNumber(num);
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

  createColumns() {
    const countryColumn = {
      sort: true,
      dataField: 'country',
      formatter: this.countryFormatter,
      text: 'Country'
    };

    const columnsConfig = {};
    columnsConfig[modes.ALL] = ['cases', 'deaths', 'recovered', 'active', 'critical', 'tests', ];
    columnsConfig[modes.TODAY] = ['todayCases', 'todayDeaths', ];
    columnsConfig[modes.PERMILLION] = ['casesPerOneMillion', 'deathsPerOneMillion', 'testsPerOneMillion',];

    const columns = columnsConfig[this.state.mode || modes.ALL].map(col =>  (
      {
        sort: true,
        text: col
                  .replace('PerOneMillion', '')
                  .replace('today', '')
                  .replace(/^\w/, c => c.toUpperCase()),
        dataField: col,
        formatter: this.toNumString,
        headerAlign: 'right',
        align: 'right',
      }
    ));
    // Add country column at the begning
    columns.unshift(countryColumn);

    return columns;
  }

  render() {
    const columns = this.createColumns();

    const defaultSorted = [{
      dataField: 'cases',
      order: 'desc'
    }];

    const modeDetailsConfig = {}
    modeDetailsConfig[modes.ALL] = '';
    modeDetailsConfig[modes.TODAY] = ' Showing data for today.';
    modeDetailsConfig[modes.PERMILLION] = ' Showing data per one million people.';

    const filteredCountries = this.props.countries
    .filter( 
      c => (this.state.countriesToCompare.length > 1) ? 
        this.state.countriesToCompare.includes(c.country.toLowerCase()): 
        c.country.toLowerCase().startsWith(this.state.textfilter.toLowerCase())
    );

    const allData = this.state.soFar;
    return (
      <Container>
        <StatsHeader 
            name="Global"
            img="/corona.png" 
            imgClass="globalImg" 
            data={allData}
            confirmed={allData.cases}
            deaths={allData.deaths}
            recovered={allData.recovered}
        />  

        <Row float="left" className="worldControlPane">  
          <Col>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1" >Filter</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder={DEFAULT_FILTER}
              aria-label="Filter"
              aria-describedby="basic-addon1"
              onInput={this.handleChange}
            />
          </InputGroup>
          </Col>
          <Col>
            <Button variant="primary" onClick={this.compare.bind(this)}>Compare</Button>
            </Col>
          </Row>
          <Row className="textAll">
          <Col xs={7}>
            <span className="helpText"> Select a country to see details.</span >
            <span className="helpText">{modeDetailsConfig[this.state.mode || modes.ALL]}</span >  
          </Col>
          <Col xs={5} align="right">      
            
            <ToggleButtonGroup aria-label="Mode" type="radio"  size="sm" name="mode" onClick={this.modeChanged.bind(this)}>
              <ToggleButton value={modes.ALL} variant="light">All</ToggleButton>
              <ToggleButton value={modes.TODAY} variant="light">Today</ToggleButton>
              <ToggleButton value={modes.PERMILLION} variant="light">/Million</ToggleButton>
            </ToggleButtonGroup>   
            </Col>
          </Row>  
          <Row float="center">
            <Col>
              <BootstrapTable 
                keyField='country' 
                data = {filteredCountries}
                columns={ columns }  
                striped={true}
                condensed={true}
                hover={true}
                bordered={false}
                classes={'worldTable'}
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

export default withRouter(WorldOverview);
