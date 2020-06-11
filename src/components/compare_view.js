import React, { Component } from 'react';
import {Container, Image, Table } from 'react-bootstrap';
import queryString from 'query-string';
import CountryGraph from './country_graph';
import StringUtil from '../lib/string_util';

class CompareView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      lastupdate:'',
    };
    this.getData = this.getData.bind(this);
    this.getValueFromLocalStorage = this.getValueFromLocalStorage.bind(this);
  }

  async getData(countryCode) {
    const url = 'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/timeseries?onlyCountries=true&iso2=' +countryCode
    const res = await fetch(url);
    const data = await res.json();

    const countries = data.map(r => {
      const ts = Object.keys(r.timeseries);
      return {
          state: r.provincestate,
          country: r.countryregion,
          iso2: r.countrycode ? r.countrycode.iso2 : '',
          ts: ts,
          confirmed: ts.map(t => r.timeseries[t].confirmed),
          deaths: ts.map(t => r.timeseries[t].deaths),
          recovered: ts.map(t => r.timeseries[t].recovered),
        };
    });
    if (countries.length > 0) {
      this.state.countries.push(countries[0]);
      // This is required to wake up render method
      this.setState({lastupdate:countries[0].lastupdate});
    }
  }

  componentDidMount() {
    const params = queryString.parse(this.props.location.search);
    const countryCodes = (params.countries || '')
      .split(',')
      .map(code=> code.trim().toUpperCase());

    return countryCodes.slice(0, 5).map(this.getData);
  }

  getValueFromLocalStorage(iso2, field) {
    const localData = localStorage.getItem("world-c19") ? JSON.parse(localStorage.getItem("world-c19")) : [];
    const country = localData.filter(c => c.countryInfo.iso2 === iso2);
    if (!country) {
      return undefined;
    }
    return country[0][field];
  }

  render() {
    const data = {
      Confirmed: this.state.countries.map(c => {
        return {state: c.country, data: c.confirmed, ts: c.ts}
      }),
      Deaths: this.state.countries.map(c => {
        return {state: c.country, data: c.deaths, ts: c.ts}
      }),
      Recovered: this.state.countries.map(c => {
        return {state: c.country, data: c.recovered, ts: c.ts}
      }),
    }

    const countriesText = this.state.countries.map(c => c.country).join(' vs ');
    return (
        <Container className="countryComparePane">
          <Container className="countryHeader">  
              <Container align="left">
              {this.state.countries.map(c => {
                const imgSrc= StringUtil.flagImg(c.iso2);
                console.log(imgSrc);
                return (
                  <Image src={imgSrc} className="flagImg" /> 
                );
              })}
                <span className="cardText">&nbsp;{countriesText}</span>
              </Container> 
          </Container>  
          <Container className="compareTablePane">  
          <Table hover responsive variant="dark" size="sm" >
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th className="cinfo text-right">Cases</th>
                <th className="cdanger text-right">Deaths</th>
                <th className="csuccess text-right">Recovered</th>
                <th className="text-right">Tests</th>
                <th className="text-right">Population</th>
              </tr>
            </thead>
            <tbody>
              {this.state.countries.map(c => {
                const imgSrc = StringUtil.flagImg(c.iso2);
                return (
                  <tr>
                    <td><Image className="flagImg" src={imgSrc}></Image></td>
                    <td>{c.country}</td>
                    <td className="text-right" >{StringUtil.formatNumber(c.confirmed[c.confirmed.length-1])}</td>
                    <td className="text-right" >{StringUtil.formatNumber(c.deaths[c.deaths.length-1])}</td>
                    <td className="text-right" >{StringUtil.formatNumber(c.recovered[c.recovered.length-1])}</td>
                    <td className="text-right" >{StringUtil.formatNumber(this.getValueFromLocalStorage(c.iso2, 'tests'))}</td>
                    <td className="text-right" >{StringUtil.formatNumber(this.getValueFromLocalStorage(c.iso2, 'population'))}</td>
                  </tr>
                );
              })}

            </tbody>
          </Table>
          </Container>  
          <CountryGraph title='Confirmed' data={data['Confirmed']}/>
          <CountryGraph title='Deaths' data={data['Deaths']}/>
          <CountryGraph title='Recovered' data={data['Recovered']}/>
        </Container>
    );
  }
}

export default CompareView;
