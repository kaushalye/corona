
import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import StringUtil from '../lib/string_util';
import BootstrapTable from 'react-bootstrap-table-next';
import Trans from '../lib/trans';

class DistrictView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.trans = new Trans();
    this.toNumString = this.toNumString.bind(this);
    this.countrySpecificData = this.countrySpecificData.bind(this);
  }

  componentDidMount() {
    this.countrySpecificData(this.trans[this.props.iso2.toLowerCase()]);
  }

  toNumString(num) {
    return StringUtil.formatNumber(num);
  }

  countrySpecificData(trans) {
    fetch(trans.url)
    .then(res => res.json())
    .then((rawData) => {
      return this.setState({ data: trans.fn(rawData) });
    })
    .catch(console.log)
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