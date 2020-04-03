import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const Stats = ({countries}) => {
  return (
    <div>
      <BootstrapTable data={countries} striped={true} condensed={true} hover={true} keyField="country">
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
      </BootstrapTable>
    </div>
  )
};

export default Stats