import React, {Component} from 'react';
import { InputGroup, 
  FormControl,
  Container, 
  Row, 
  Col, 
  ButtonGroup,
  Button,
  Image} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import StatsHeader from './stats_header';
class WorldOverview extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      textfilter: '',
      mode: '0',
      countriesToCompare: [],
      soFar: {},
    };
    this.modeChanged = this.modeChanged.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.countryFormatter = this.countryFormatter.bind(this);
    this.toNumString = this.toNumString.bind(this);
  }

  modeChanged(e) {
    this.setState({
      mode: e.target.value,
    });
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
    const countryColumn = {
      sort: true,
      dataField: 'country',
      formatter: this.countryFormatter,
      text: 'Country'
    };

    const columnsConfig = {
      '0': ['cases', 'deaths', 'recovered', 'active', 'critical', 'tests', ],
      '1': ['todayCases', 'todayDeaths', ],
      '2': ['casesPerOneMillion', 'deathsPerOneMillion', 'testsPerOneMillion',],
    };
    const columns = columnsConfig[this.state.mode || '0'].map(col =>  (
      {
        sort: true,
        text: col.replace(/^\w/, c => c.toUpperCase()),
        dataField: col,
        formatter: this.toNumString,
        headerAlign: 'right',
        align: 'right',
      }
    ));
    columns.unshift(countryColumn);

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
            <ButtonGroup aria-label="Mode" onClick={this.modeChanged.bind(this)}>
              <Button value='0'>all</Button>
              <Button value='1'>today</Button>
              <Button value='2'>/population</Button>
            </ButtonGroup>   
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
                columns={ columns }  
                striped={true}
                condensed={true}
                hover={true}
                bordered={ false }
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

export default WorldOverview;
