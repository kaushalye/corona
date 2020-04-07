import React from 'react';
import Graph from './graph';

const StateGraph = ({region}) => {
  const title = region.state;
  const graphData = [];
  graphData.push({
    name: "Confirmed",
    x: region.ts,
    y: region.confirmed,
    type: 'scatter'
  });
  graphData.push({
    name: "Deaths",
    x: region.ts,
    y: region.deaths,
    type: 'scatter'
  });
  graphData.push({
    name: "Recovered",
    x: region.ts,
    y: region.recovered,
    type: 'scatter'
  });

 
return (<Graph graphData={graphData} title={title}/>);
};
export default StateGraph;