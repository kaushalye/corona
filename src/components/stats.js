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
  },
  {
    sort: true,
    dataField: 'casesPerOneMillion',
    text: 'casesPerOneMillion'
  },
  {
    sort: true,
    dataField: 'deathsPerOneMillion',
    text: 'deathsPerOneMillion'
  },
];

const defaultSorted = [{
  dataField: 'cases',
  order: 'desc'
}];
const Stats = ({countries}) => {
  return (
    <div>
      <BootstrapTable keyField='country' data={ countries } columns={ columns }  
      striped={true}
      condensed={true}
      hover={true}
      defaultSorted= {defaultSorted}/>
      {/* <BootstrapTable data={countries} striped={true} condensed={true} hover={true} keyField="country">
        <TableHeaderColumn dataField="country" dataSort={true}>Country</TableHeaderColumn>
        <TableHeaderColumn dataField="cases" dataSort={true}>Cases</TableHeaderColumn>
        <TableHeaderColumn dataField="todayCases" dataSort={true}>Today cases</TableHeaderColumn>
        <TableHeaderColumn dataField="deaths" dataSort={true}>Deaths</TableHeaderColumn>
        <TableHeaderColumn dataField="todayDeaths" dataSort={true}>Today deaths</TableHeaderColumn>
        <TableHeaderColumn dataField="recovered" dataSort={true}>Recovered</TableHeaderColumn>
        <TableHeaderColumn dataField="active" dataSort={true}>Active</TableHeaderColumn>
        <TableHeaderColumn dataField="critical" dataSort={true}>Critical</TableHeaderColumn>
        <TableHeaderColumn dataField="casesPerOneMillion" dataSort={true}>Cases per million</TableHeaderColumn>
        <TableHeaderColumn dataField="deathsPerOneMillion" dataSort={true}>Deaths per million</TableHeaderColumn>
      </BootstrapTable> */}
    </div>
  )
};

export default Stats