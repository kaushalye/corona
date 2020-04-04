import React from 'react';
import Plot from 'react-plotly.js';

const RegionGraph = ({region}) => {
  const regionName = region.name;
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

 
return (
  <Plot
    data={graphData}
    layout={ { title: regionName} }
  />
  );
};
export default RegionGraph;