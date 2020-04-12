
import React, {Component} from 'react';
import Plot from 'react-plotly.js';

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    const w = this.state.width;
    const h = this.state.height;
    const title = this.props.title;
    const selectorOptions = {
        buttons: [{
            step: 'day',
            stepmode: 'backward',
            count: 7,
            label: '1w'
        }, {
            step: 'month',
            stepmode: 'backward',
            count: 1,
            label: '1m'
        }, {
            step: 'all',
        }],
    };
    const graphData = this.props.graphData.map(trace => {
      return {
        name:trace.name,
        y: trace.y,
        type: trace.type,
        x: trace.x.map(val => new Date(val)),
      }
    })
    
    return ( 
        <Plot
          
          data={graphData}
          config = {{displayModeBar: false, staticPlot: true, displaylogo: false}}
          layout={ {
            title,
            xaxis: {
              showgrid: false,
              rangeselector: selectorOptions,
            },
            font:{size:6, color: "grey"}, 
            width: (w > 470 )? (w*.7): w,
            height: h * 0.5,
            padding: {l:0, t:0, r:0, b:0},
            autosize:true,
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            legend: {x: 1, y: 1}
          } }
        />  
    );
  };
}

export default Graph;