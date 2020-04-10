
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
      return ( 
        <Plot
          data={this.props.graphData}
          config = {{displayModeBar: false}}
          layout={ {
            font:{size:6, color: "grey"}, 
            width: (w > 400 )? w * 0.8: w,
            height: h * 0.5,
            xaxis: {showgrid:false},
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