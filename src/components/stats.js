import React from 'react'
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

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

const Stats = ({countries, regions}) => {
  return (
    <div>
      <BootstrapTable keyField='country' data={ countries } columns={ columns }  
            striped={true}
            condensed={true}
            hover={true}
            defaultSorted= {defaultSorted}/>
    </div>
  )
};

export default Stats