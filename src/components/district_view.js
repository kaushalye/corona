
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
  }

  render() {
    const data = this.state.data;
    const columns = [ {
      sort: true,
      dataField: 'name',
      text: 'District'
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
      dataField: 'cases',
      order: 'desc'
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