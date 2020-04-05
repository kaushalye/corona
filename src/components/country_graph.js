import React from 'react';
import Plot from 'react-plotly.js';

const CountryGraph = ({title, data}) => {

  const graphData = data.map(stateData => {
    return {
      name: stateData.state,
      x: stateData.ts,
      y: stateData.data,
      type: 'scatter',
    }
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
export default CountryGraph;