import React, { Component } from 'react';
import * as d3 from "d3";
import './App.css';


class CountryGraph extends Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps = (nextProps, nextState) => {
    if(nextProps.countryData && nextProps.countryData.length){
      this.loadBarChart(nextProps.countryData);
    }
  }

  /**
   * Function to load the chart 
   * using d3 library 
   * by passing @data params
   */

  loadBarChart = (data) => {

    d3.select("#chart").html("");


    var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 1120 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    // Parse the date / time
    var parseDate = d3.isoParse

    var x = d3.scaleBand().rangeRound([0, width], .05).padding(0.1);

    var y = d3.scaleLinear().range([height, 0]);

    var xAxis = d3.axisBottom()
        .scale(x)
        .tickFormat(d3.timeFormat("%Y-%m-%d"))
        .ticks(10);

    var yAxis = d3.axisLeft()
        .scale(y)
        .ticks(5);

    var svg = d3.select("#chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    data.forEach(function(d) {
        d.date = parseDate(d[0]);
        d.value = +d[1];
    });

    x.domain(data.map(function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)" );

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Value");

    svg.selectAll("bar")
        .data(data)
      .enter().append("rect")
        .style("fill", "steelblue")
        .attr("x", function(d) { return x(d.date); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); });

  }


  componentDidMount = () => {
  }

  /**
   * render the view of the App compoent  
   * and the state has binded in the view 
   */

  render() {
    return (
      <div id="chart">Graph</div>
    )
  } 
}

export default CountryGraph;
