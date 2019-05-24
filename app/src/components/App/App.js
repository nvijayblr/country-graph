import React, { Component } from 'react';
import * as d3 from "d3";
import './App.css';
import CountryGraph from './CountryGraph'
import CountryInfo from './CountryInfo'


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      country: '',
      status: '',
      hVal: '',
      lVal: '',
      countryList: [],
      countryData: []
    }
  }

  /**
   * Function to get the country list 
   * from the country-list api 
   */

  getCountryList = () => {
    fetch("http://localhost:3000/country-list").then(res => res.json()).then((data) => {
      console.log(data);
      this.setState({
        countryList: data
      });
    }, (error) => {
      console.log('Error fetching data.')
    });
  }

  
  /**
   * While changing the country to load the 
   * country specifi information and call the 
   * loadBarChart method to render the chart
   */

  changeCountry = (event) => {
    let countryId = event.target.value;
    if (countryId === '0') {
      this.setState({
        country: ''
      });
      d3.select("#chart").html("");
      return;
    };
    fetch("http://localhost:3000/country-data/"+countryId).then(res => res.json()).then((data) => {
      this.setState({
        country: this.state.countryList.find((country)=>{return country.id === countryId}).title,
        status: data.status,
        hVal: Math.max(...data.timeseries.map(c => c[1])),
        lVal: Math.min(...data.timeseries.map(c => c[1])),
        countryData: data.timeseries
      });
    }, (error) => {
      console.log('Error fetching data.')
    });
  }


  componentDidMount = () => {
    this.getCountryList();
  }

  /**
   * render the view of the App compoent  
   * and the state has binded in the view 
   */

  render() {
    return (
      <div className="App">
        <div className="container">
          <header className="App-header">
            <h3>Liberty Global</h3>
          </header>
          <div className="row">
            <div className="col-md-6">
              <div className="select-container">
                <div className="from-group">
                  <label className="form-label">Select Country</label>
                  <select className="form-control" onChange={(e)=>{this.changeCountry(e)}} >
                    <option value="0">Select Country</option>
                    {
                      this.state.countryList.map((item, index) => {
                        return <option value={item.id} key={item.id}>{item.title}</option>
                      })
                    }
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              {
                this.state.country && 
                <CountryInfo countryInfo={this.state}></CountryInfo>
              }
            </div>
          </div>

          <div className="graph-wrapper">
            <CountryGraph countryData={this.state.countryData}></CountryGraph>
          </div>

        </div>
      </div>
    )
  } 
}

export default App;
