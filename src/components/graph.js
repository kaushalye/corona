import React from 'react';
import Plot from 'react-plotly.js';

const Graph = ({graphData, title}) => {
return ( 
      <Plot
        data={graphData}
        config = {{responsive: true}}
     
        layout={ {
          font:{size:8}, 
          xaxis: {showgrid:false},
          autosize:true,
          title,
          legend: {x: 1, y: 1}
        } }
      />  

  );
};
export default Graph;