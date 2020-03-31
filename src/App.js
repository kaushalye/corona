import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Stats from './components/stats';

class App extends Component {

  state = {
    countries: []
  }

  componentDidMount() {
    fetch( 'https://corona.lmao.ninja/countries?sort=country')
    .then(res => res.json())
    .then((data) => {
      this.setState({ countries: data })
    })
    .catch(console.log)
  }

  render() {
    return (
      <Stats countries={this.state.countries} />
    );
  }
}

export default App;
