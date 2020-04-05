import React from 'react';
import Plot from 'react-plotly.js';

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

 
return ( 
      <Plot
        data={graphData}
        config = {{responsive: true}}
        style={{ width: '100%', height: '100%' }}
        layout={ { 
          title,
          autosize: true,
        } }
      />  

  );
};
export default StateGraph;