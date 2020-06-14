import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import mapdata from "@highcharts/map-collection/custom/world-robinson-highres.geo.json";
import proj4 from "proj4";

highchartsMap(Highcharts);

class WorldMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorKey: 'cases',
    };
    this.toMapData = this.toMapData.bind(this);
  }

  toMapData(countries, limit) {
    console.log('countries');
    console.log(countries);
    const data = [];

    countries.forEach(c => {
      const elem = {
        code: c.countryInfo.iso2,
        value: c[this.state.colorKey],
        elem: c,
      };

      data.push(elem);
    });

    return data;
  }

  render() {
    if (typeof window !== "undefined") {
      window.proj4 = window.proj4 || proj4;
    }

    const data = this.toMapData(this.props.countries);
    console.log('data');
    console.log(data);

    const mapOptions = {
      chart: {
        map: 'custom/world'
      },
      colorAxis: {
        type: 'logarithmic',
        allowNegativeLog: true,
      },
      title: {
        text: this.state.colorKey.toUpperCase(),
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
        backgroundColor: 'rgba(255,255,255,0.85)',
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
            enabled: true,

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
            pointFormat: `<i>{point.elem.country}</i>
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
        },{
          type: 'map',
          data: data,
        }]
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