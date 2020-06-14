import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import mapdata from "@highcharts/map-collection/custom/world-robinson-highres.geo.json";
import proj4 from "proj4";
import StringUtil from '../lib/string_util';

highchartsMap(Highcharts);

class WorldMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortKey: this.props.sortKey || 'cases',
    };
    this.toMapData = this.toMapData.bind(this);
    this.navigate = this.navigate.bind(this);
  }
  navigate(e) {
    window.location = "/corona/country/"+e.point.code;
  }

  toMapData(countries) {
    return countries.map(c => {
      return {
        code: c.countryInfo.iso2,
        value: c[this.state.sortKey],
        elem: c,
      };
    });
  }
  // For some reason the map becomes black
  // componentDidUpdate() {
  //   console.log('>>> componentDidUpdate map with '+ this.props.sortKey);
  //   if (this.state.sortKey === this.props.sortKey) {
  //     return
  //   }
  //   this.setState({
  //     sortKey: this.props.sortKey,
  //   });
  // }
  render() {

    if (typeof window !== "undefined") {
      window.proj4 = window.proj4 || proj4;
    }

    const data = this.toMapData(this.props.countries);
    // console.log(JSON.stringify(data[0]));
    const mapOptions = {
      chart: {
        map: 'custom/world'
      },
      colorAxis: {
        type: 'logarithmic',
        allowNegativeLog: true,
        maxColor:'#ff0000',
        minColor: '#fff899',

      },
      title: {
        text:StringUtil.capitalizeFirstLetter(this.state.sortKey),
        style: { color: "#333333", fontSize: "10px" },
      },

      credits: {
        enabled: false
      },
      mapNavigation: {
        enabled: true
      },
      legend: {
        layout: 'vertical',
        borderWidth: 0,
        padding: 0,
        symbolPadding:0,
        //backgroundColor: 'rgba(255,255,255,0.85)',
        floating: true,
        verticalAlign: 'bottom',
        align:'left',
      },
      plotOptions: {
        map: {
          allAreas: false,
          joinBy: ['iso-a2', 'code'],
          colorKey: 'value',
          dataLabels: {
            enabled: false,

            color: 'orange',
            format: "{point.elem.country}",
            style: {
              fontSize: '9px',
              textOutline: '1px'
            }
          },
          mapData: mapdata,
          tooltip: {
            headerFormat: '',
            pointFormat: `‣<i>{point.elem.country}</i>
              <br/>-----------
              <br/> <b>Cases</b>:{point.elem.cases} <span class="todayStats">(+{point.elem.todayCases})</span>
              <br/> <b>Deaths</b>:{point.elem.deaths}
              <br/> <b>Critical</b>:{point.elem.critical}
              <br/> <b>Active</b>:{point.elem.active}
              <br/> <b>Cases/Million</b>:{point.elem.casesPerOneMillion}
              <br/> <b>Deaths/Million</b>:{point.elem.deathsPerOneMillion}
              `
          }

        }
      },

      series: [
        {
          // Use the gb-all map with no data as a basemap
          name: "Basemap",
          mapData: mapdata,
          borderColor: "#A0A0A0",
          nullColor: "rgba(200, 200, 200, 0.3)",
          showInLegend: false,
        },
        {
          type: 'map',
          data: data,
          events: {
            click: this.navigate,
          },
        },
      ]
    }

    return (
      <Container>
        <HighchartsReact
          constructorType={"mapChart"}
          highcharts={Highcharts}
          options={mapOptions}
        />
      </Container>
    );
  };
}

export default WorldMap;