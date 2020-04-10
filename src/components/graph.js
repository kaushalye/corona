import React from 'react';
import Plot from 'react-plotly.js';

const Graph = ({graphData, title}) => {

return ( 
      <Plot
        data={graphData}
        config = {{responsive: true, displayModeBar: false}}
        layout={ {
          font:{size:6}, 
          width: 420,
          height: 300,
          xaxis: {showgrid:false},
          autosize:true,

          legend: {x: 1, y: 1}
        } }
      />  

  );
};
export default Graph;