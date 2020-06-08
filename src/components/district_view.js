
import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import StringUtil from '../lib/string_util';
import BootstrapTable from 'react-bootstrap-table-next';

class DistrictView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.fetchCountrySpecific = this.fetchCountrySpecific.bind(this);

    this.toNumString = this.toNumString.bind(this);
  }

  componentDidMount() {
    this.fetchCountrySpecific(this.props.iso2);
  }

  toNumString(num) {
    return StringUtil.formatNumber(num);
  }

  fetchCountrySpecific(iso2) {
    if (iso2 === 'LK') {
      const url = 'https://covid-19sl.s3-ap-northeast-1.amazonaws.com/data.json';
      fetch(url)
      .then(res => res.json())
      .then((data) => {
        return this.setState({ data: data.prefectures.filter(p => p.prefecture !== 'Total').map(p => ({
          name: p.prefecture,
          cases: parseInt(p.cases || "0"),
          deaths: parseInt(p.deaths || "0"),
          recovered: parseInt(p.recovered || "0"),
        })) });
      })
      .catch(console.log)
    }

    if (iso2 === 'US') {
      const url = 'https://disease.sh/v2/states?sort=cases';
      fetch(url)
      .then(res => res.json())
      .then((data) => {
        return this.setState({ data: data.map(p => ({
          name: p.state,
          cases: parseInt(p.cases || "0"),
          deaths: parseInt(p.deaths || "0"),
          recovered: parseInt(p.recovered || "0"),
        })) });
      })
      .catch(console.log)
    }

    if (iso2 === 'JP') {
      const url = 'https://covid19-japan-web-api.now.sh/api/v1/prefectures';
      fetch(url)
      .then(res => res.json())
      .then((data) => {
        return this.setState({ data: data.map(p => ({
          name: `${p.name_en} (${p.name_ja})`,
          cases: parseInt(p.cases || "0"),
          deaths: parseInt(p.deaths || "0"),
          recovered: parseInt(p.recovered || "0"),
        })) });
      })
      .catch(console.log)
    }

    if (iso2 === 'IN') {
      const url = 'https://api.covid19india.org/state_district_wise.json';
      fetch(url)
      .then(res => res.json())
      .then((data) => {
        const stateKeys = Object.keys(data);
        const statedata = [];
        stateKeys.forEach(stateKey => {
          const singleState =  data[stateKey];
          const districtData = singleState['districtData'];
          const districtDataKeys = Object.keys(districtData);
          districtDataKeys.forEach(districtDataKey => {
            if (districtDataKey === 'Unknown') {
              console.log(districtDataKey);
              return;
            }
            const singleDistrict = districtData[districtDataKey];
            statedata.push({
              name: stateKey+" - "+districtDataKey,
              cases: singleDistrict.active,
              deaths: singleDistrict.deceased,
              recovered: singleDistrict.recovered,
            })
          })
        });
        return this.setState({ data: statedata});
      })
      .catch(console.log)
    }

  }

  render() {
    const data = this.state.data;
    console.log(data);
    const columns = [ {
      sort: true,
      dataField: 'name',
      headerClasses: 'districtNameCell',
      classes: 'districtNameCell',
      text: 'Region'
    },
    {
      sort: true,
      headerAlign: 'right',
      align: 'right',
      formatter: this.toNumString,
      dataField: 'cases',
      text: 'Cases'
    },{
      sort: true,
      headerAlign: 'right',
      align: 'right',
      dataField: 'deaths',
      text: 'Deaths'
    },{
      sort: true,
      headerAlign: 'right',
      align: 'right',
      dataField: 'recovered',
      text: 'Recovered'
    }];

    const defaultSorted = [{
      dataField: 'name',
      order: 'asc'
    }];

      return (
        <Container className="districtView">   
        {data.length > 0 && <BootstrapTable 
                keyField='country' 
                data = {data}
                columns={ columns }  
                striped={true}
                condensed={true}
                hover={true}
                bordered={ false }
                classes={'worldTable'}
                defaultSorted= {defaultSorted }/> }
              
        </Container>

    );
  };
}

export default DistrictView;