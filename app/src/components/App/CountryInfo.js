import React, { Component } from 'react';
import './App.css';


class CountryInfo extends Component {

  constructor(props) {
    super(props);
    console.log(this.props.countryInfo)
  }

  componentWillReceiveProps = (nextProps, nextState) => {
    console.log(nextProps)
  }

  render() {
    return (
      <div className="country-info">
        Country: {this.props.countryInfo.country} |  
        Status:  {this.props.countryInfo.status} |  
        High:  {this.props.countryInfo.hVal} |  
        Low:  {this.props.countryInfo.lVal}
      </div>
    )
  } 
}

export default CountryInfo;
