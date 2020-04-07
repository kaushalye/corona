import React from 'react';
import Graph from './graph';

const CountryGraph = ({title, data}) => {

  const graphData = data.map(stateData => {
    return {
      name: stateData.state,
      x: stateData.ts,
      y: stateData.data,
      type: 'scatter',
    }
  });

return (<Graph graphData={graphData} title={title}/>);
};
export default CountryGraph;