import React, { Component } from 'react';
import {Container, Image } from 'react-bootstrap';
import queryString from 'query-string';
import CountryGraph from './country_graph';

class CompareView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      lastupdate:'',
    };
    this.getData = this.getData.bind(this);
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
    console.log('CompareView.componentDidMount');
    console.log(this.props);
    const params = queryString.parse(this.props.location.search);
    console.log(params);
    const countryCodes = (params.countries || '').split(',').map(code=> code.trim());//['AU,LK'];
    return countryCodes.slice(0, 3).map(this.getData);
  }

  render() {
    console.log('this.state.countries');
    console.log(this.state.countries);
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
    // console.log('CompareView .graph data');
    // console.log(data);

    const countriesText = this.state.countries.map(c => c.country).join(' vs ');
    return (
        <Container className="countryComparePane">
          
          <Container className="countryHeader">  
              <Container align="left">  
                <Image src={this.props.img}  className={this.props.imgClass} />
                <span className="cardText">{countriesText}</span>
              </Container> 
          </Container>  


          <CountryGraph title='Confirmed' data={data['Confirmed']}/>
          <CountryGraph title='Deaths' data={data['Deaths']}/>
          <CountryGraph title='Recovered' data={data['Recovered']}/>
        </Container>
    );
  }
}

export default CompareView;
