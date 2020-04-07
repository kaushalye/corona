import React from 'react';
import Plot from 'react-plotly.js';

const Graph = ({graphData, title}) => {
return ( 
      <Plot
        data={graphData}
        config = {{responsive: true}}
     
        layout={ { 
          title,
          legend: {x: 0.1, y: 0.5}
        } }
      />  

  );
};
export default Graph;