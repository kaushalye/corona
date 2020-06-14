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
import StatsHeader from './stats_header';
import WorldMap from './world_map';
import StringUtil from '../lib/string_util';
import queryString from 'query-string';

const DEFAULT_FILTER = "usa, brazil";

const modes = {
  ALL: 'all',
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
      sortBy: 'cases',
      sortOrder: -1,
    };
    this.modeChanged = this.modeChanged.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.countryFormatter = this.countryFormatter.bind(this);
    this.toNumString = this.toNumString.bind(this);
    this.compare = this.compare.bind(this);
    this.fetchWorld = this.fetchWorld.bind(this);
    this.setMode = this.setMode.bind(this);
    this.setSortBy = this.setSortBy.bind(this);//
    this.renderTable = this.renderTable.bind(this);
    this.getPosComparedToYesterday = this.getPosComparedToYesterday.bind(this);
  }

  getPosComparedToYesterday(iso2) {
    const checkIso2 = (country) => {
      return country.countryInfo.iso2 === iso2;
    }
    const todayIndex = this.props.countries.findIndex(checkIso2);
    const ydayIndex = this.props.yesterdayCountries.findIndex(checkIso2);
    
    return parseInt(ydayIndex) - parseInt(todayIndex);
  }

  setSortBy(e) {
    console.log('set state sortBy '+e.target.getAttribute('value'));
    this.setState({
      sortBy: e.target.getAttribute('value'),
      sortOrder: -this.state.sortOrder,
    });
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
      localStorage.setItem('world-summary', JSON.stringify(data));
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


  filterAndSort(countries) {
    // Filter
    const filtered = countries
    .filter( 
      c => (this.state.countriesToCompare.length > 1) ? 
        this.state.countriesToCompare.includes(c.country.toLowerCase()): 
        c.country.toLowerCase().startsWith(this.state.textfilter.toLowerCase())
    );

    const comparison = (a, b) => {
      if (a[this.state.sortBy] > b[this.state.sortBy]) {
        return this.state.sortOrder;
      }
      return this.state.sortOrder * -1;
    }

    return filtered.sort(comparison);
  }

  renderTable(filteredCountries) {
    
    return (
      <table class="table table-striped worldTable">
              <thead>
              <tr>
                  <th scope="col"  className="rank">#</th>
                  <th scope="col" className="countryId" onClick={this.setSortBy.bind(this)}>Country</th>
                  { this.state.mode === modes.ALL && 
                    <>
                    <th scope="col" value="cases" onClick={this.setSortBy.bind(this)}>Cases</th>
                    <th scope="col" value="deaths" onClick={this.setSortBy.bind(this)}>Deaths</th>
                    <th scope="col" value="active" onClick={this.setSortBy.bind(this)}>Active</th>
                    <th scope="col" value="recovered" onClick={this.setSortBy.bind(this)}>Recovered</th>
                    <th scope="col" value="critical" onClick={this.setSortBy.bind(this)}>Critical</th>
                    <th scope="col" value="tests" onClick={this.setSortBy.bind(this)}>Tests</th>
                    </>
                  }
                  { this.state.mode === modes.PERMILLION && 
                    <>
                    <th scope="col" value="cases" onClick={this.setSortBy.bind(this)}>Cases</th>
                    <th scope="col" value="deaths" onClick={this.setSortBy.bind(this)}>Deaths</th>
                    <th scope="col" value="active" onClick={this.setSortBy.bind(this)}>Active</th>
                    <th scope="col" value="recovered" onClick={this.setSortBy.bind(this)}>Recovered</th>
                    <th scope="col" value="critical" onClick={this.setSortBy.bind(this)}>Critical</th>
                    <th scope="col" value="tests" onClick={this.setSortBy.bind(this)}>Tests</th>
                    </>
                  }
                </tr>
              </thead>
              <tbody>
              {filteredCountries.map((c, i) => {
                      const gap = this.getPosComparedToYesterday(c.countryInfo.iso2);
                      
                      return (
                        <tr>
                        <th scope="row" className="rank">{i+1}</th>
                        <td className="countryId">
                          <span className="worldLink">
                            <a href={"/corona/country/"+c.countryInfo.iso2}>
                              <Image src={c.countryInfo.flag} className="flagImg"/>&nbsp;{c.country}&nbsp;
                            </a>
                          </span>
                          { gap > 0 && <span className="gapUp">&#9650;{Math.abs(gap)}</span> }
                          { gap < 0 && <span className="gapDown">&#9660;{Math.abs(gap)}</span> }
                        </td>
                        { this.state.mode === modes.ALL && 
                        <>
                        <td>{this.toNumString(c.cases)} <span className="todayStats">{c.todayCases > 0 && "+"+this.toNumString(c.todayCases)}</span></td>
                        <td>{this.toNumString(c.deaths)} <span className="todayStats">{c.todayDeaths > 0 && "+"+this.toNumString(c.todayDeaths)}</span></td>
                        <td>{this.toNumString(c.active)}</td>
                        <td>{this.toNumString(c.recovered)}</td>
                        <td>{this.toNumString(c.critical)}</td>
                        <td>{this.toNumString(c.tests)}</td>
                        </>
                        } 
                        { this.state.mode === modes.PERMILLION && 
                        <>
                        <td>{this.toNumString(c.casesPerOneMillion)}</td>
                        <td>{this.toNumString(c.deathsPerOneMillion)}</td>
                        <td>{this.toNumString(c.activePerOneMillion)}</td>
                        <td>{this.toNumString(c.recoveredPerOneMillion)}</td>
                        <td>{this.toNumString(c.criticalPerOneMillion)}</td>
                        <td>{this.toNumString(c.testsPerOneMillion)}</td>
                        </>
                        } 
                        { this.state.mode === modes.PERTESTS && 
                        <>
                        <td>{this.toNumString(c.cases)}</td>
                        <td>{this.toNumString(c.deaths)}</td>
                        <td>{this.toNumString(c.active)}</td>
                        <td>{this.toNumString(c.recovered)}</td>
                        <td>{this.toNumString(c.critical)}</td>
                        <td>{this.toNumString(c.tests)}</td>
                        </>
                        } 
                      </tr>
                      );
                  })}

                </tbody>
              </table>
    );
  }

  render() {
    const modeDetailsConfig = {}
    modeDetailsConfig[modes.ALL] = '';
    modeDetailsConfig[modes.TODAY] = ' Showing data for today.';
    modeDetailsConfig[modes.PERMILLION] = ' Showing data per one million people.';

    const filteredCountries = this.filterAndSort(this.props.countries);
    const allData = this.state.soFar;
    console.log(`render world view ${this.state.sortBy}`);
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
        <WorldMap countries={this.props.countries} sortKey={this.state.sortBy}/>
          
        <Row float="left" className="worldControlPane">  
          <Col xs={4}>
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
          <Col xs={2} >
            <Button variant="primary" onClick={this.compare.bind(this)}>Compare</Button>
            </Col>
            <Col xs={6}>
              <span>e.g.,</span>
              <span className="compareLink"><a href="/corona/compare?countries=MX,CL">Mexico,Chile</a></span>
              <span className="compareLink"><a href="/corona/compare?countries=IN,IT,ES">India,Italy,Spain</a></span>
            </Col>
          </Row>
          <Row className="textAll">
          <Col xs={7}>
            <span className="helpText"> Select a country to see details.</span >
            <span className="helpText">{modeDetailsConfig[this.state.mode || modes.ALL]}</span >  
          </Col>
          <Col xs={5} align="right">
          {/* <a href={`/corona/map/`}><Image title="Map View" src="/world_icon.png"></Image></a> */}
            <ToggleButtonGroup aria-label="Mode" type="radio"  size="sm" name="mode" onClick={this.modeChanged.bind(this)}>
              <ToggleButton value={modes.ALL} variant="light">All</ToggleButton>
              <ToggleButton value={modes.PERMILLION} variant="light">/Million</ToggleButton>
            </ToggleButtonGroup>   
            </Col>
          </Row>  
          <Row float="center">
          <Col>
            {this.renderTable(filteredCountries)}
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
