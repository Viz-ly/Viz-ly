import React from 'react';
// var d3 = require('./d3.min.js');
import * as d3 from 'd3';

export default class Charts extends React.Component {

  constructor(props) {
    super(props);
  }

  makeCharts(list) {
      var w = 800;
      var h = 450;
      var margin = {
        top: 58,
        bottom: 100,
        left: 80,
        right: 40
      };
      var width = w - margin.left - margin.right;
      var height = h - margin.top - margin.bottom;

      // var data = [123, 531, 30, 64, 87, 173, 131];

      // var data = [
      //   {key: 'house',    count: 5},
      //   {key: 'cats',     count: 20},
      //   {key: 'selfie',   count: 80},
      //   {key: 'dogs',     count: 30},
      //   {key: 'nature',   count: 10},
      //   {key: 'computer', count: 12},
      //   {key: 'people',   count: 70},
      //   {key: 'pokemon',  count: 3},
      //   {key: 'cups',     count: 7},
      //   {key: 'keyboards',count: 24},
      //   {key: 'bottles',  count: 15},
      //   {key: 'glasses',  count: 18},
      //   {key: 'walls',    count: 36}
      // ]

      var data = list;

      // debugger;
      var chart = document.getElementById("chart");
      if (!!chart) {
        chart.remove();
        document.getElementById("controls").remove();
      }

      // scale axis based on the count of the data
      var x = d3.scale.ordinal()
                .domain(data.map(function (entry) {
                  return entry.key;
                }))
                .rangeBands([0, width])
      var y = d3.scale.linear()
                .domain([0, d3.max(data, function (d) {
                  return d.count;
                })])
                .range([height, 0])

      //create color scales
      var linearColorScale = d3.scale.linear()
                               .domain([0, data.length])
                               .range(['#572500', '#F67026']);

      var ordinalColorScale = d3.scale.category20();

      //create axis
      var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient('bottom');
      var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient('left');

      //create gridlines
      var yGridlines = d3.svg.axis()
                   .scale(y)
                   .tickSize(-width, 0, 0)
                   .tickFormat('')
                   .orient('left');

      //creates svg element
      // debugger;
      var svg = d3.select("body").append("svg")
                  .attr("id", "chart")
                  .attr("width", w)
                  .attr("height", h);

      //creates the GROUP (element) and add the margins in
      var chart = svg.append('g')
                   .classed('displayed', true)
                   .attr("transform", `translate(${margin.left}, ${margin.top})`)


      //adding a sort button
      var controls = d3.select('body')
                    .append('div')
                    .attr('id', 'controls')

      var sort_btn = controls.append('button')
                    .html('Sort data: ascending')
                    .attr('state', 0)


      function drawAxis(params) {

        //draw gridlines and axes if initialize, or update info
        if (params.initialize) {
          //appends the y axix gridlines
          this.append('g')
              .call(params.gridlines)
              .classed('gridline', true)
              .attr('transform', `translate(0, 0)`)

          //appends the x and y axis
          this.append('g')
              .classed('x axis', true)
              .attr('transform', `translate(0, ${height})`)
              .call(params.axis.x)
                //rotate the x axis text
                .selectAll('text')
                  .classed('x-axis-label', true)
                  .style('text-anchor', 'end')
                  .attr('dx', -8)
                  .attr('dx', 8)
                  //order here matters!!
                  .attr('transform', 'translate(0, 0), rotate(-45)');
          this.append('g')
              .classed('y axis', true)
              .attr('transform', `translate(0, 0)`)
              .call(params.axis.y);

          //adding y axis labels
          //**the selector here is important. class y AND axis
          this.select('.y.axis')
              .append('text')
              .attr('x', 0)
              .attr('y', 0)
              .style('text-anchor', 'middle')
              .attr('transform', `translate(-50, ${height/2}) rotate(-90)`)
              .text('count');
          //adding x axis label
          this.select('.x.axis')
              .append('text')
              .attr('x', 0)
              .attr('y', 0)
              .style('text-anchor', 'middle')
              .attr('transform', `translate(${width/2}, 80)`)
              .text('words')
        } else {
          //update info
          this.selectAll('g.x.axis')
              .transition()
              .duration(500)
              .delay(200)
              .ease('bounce')
              .call(params.axis.x)
          //reapply the labels
          this.selectAll('.x-axis-label')
              .style('text-anchor', 'end')
              .attr('dx', -8)
              .attr('dy', 8)
              .attr('transform', 'translate(0,0) rotate(-45)')
          this.selectAll('g.y.axis')
              .transition()
              .duration(500)
              .delay(200)
              .ease('bounce')
              .call(params.axis.y)
        }
      }

      //plot the bar chart
      function plot(params) {
        //plot the domains for the sort
        x.domain(data.map(function (entry) {
          return entry.key;
        }));
        y.domain([0, d3.max(data, function (d) {
          return d.count;
        })])

        //draw axis and label axis
        drawAxis.call(this, params)

        //enter() phase
        //plots the bars
        this.selectAll('.bar')
          .data(params.data)
          .enter()
            .append("rect")
            // .attr("class", "bar")
            .classed("bar", true)
            .on('mouseover', function (d, i) {
              //this is refering to the bar
              d3.select(this).style('fill', 'yellow');
            })
            .on('mousemove', function (d, i) {
              //add the pop up function here!
            })
            .on('mouseout', function (d, i) {
              d3.select(this).style('fill', ordinalColorScale(i));
            })
        //plots the bar labels
        this.selectAll(".bar-label")
          .data(params.data)
          .enter()
            .append('text')
            .classed('bar-label', true);

        //update
        this.selectAll('.bar')
          .transition()
          .duration(500)
          .ease('bounce')
          .delay(200)
          .attr("x", function (d, i) {
            return x(d.key);
          })
          .attr("y", function (d, i) {
            return y(d.count);
          })
          .attr("width", function (d, i) {
            return x.rangeBand();
            //are using pixels as the number (by default)
          })
          .attr("height", function (d, i) {
            return height - y(d.count);
          })
          .style('fill', function (d, i) {
            // return linearColorScale(i);
            return ordinalColorScale(i);
          })

        this.selectAll('.bar-label')
          .transition()
          .duration(500)
          .delay(200)
          .ease('bounce')
          .attr('x', function (d, i) {
            return x(d.key) + (x.rangeBand()/2)
          })
          .attr('dx', 0)
          .attr('y', function (d, i) {
            return y(d.count);
          })
          .attr('dy', -6)
          .text(function (d, i) {
            return d.count;
          });

        //exit()
        this.selectAll('.bar')
          .data(params.data)
          .exit()
          .remove();
        this.selectAll('.bar-label')
          .data(params.data)
          .exit()
          .remove();

      }

    //d3's event listeners (just like jquery)
    sort_btn.on('click', function (e) {
      var self = d3.select(this);
      //grab the state from the button
      var state = +self.attr('state');

      //sorting functions for the data
      var ascending = function (a, b) {
        return a.count - b.count;
      }
      var descending = function (a, b) {
        return b.count - a.count;
      }

      var txt = 'Sort data: ';
      //change the state and the text in the button
      if (state === 0) {
        //using sorting functions
        data.sort(ascending)
        state = 1;
        txt += 'descending'
      } else if (state === 1) {
        data.sort(descending)
        state = 0;
        txt += 'ascending';
      }

      //sets the state **** WILL BE DIFFERENT IN REACT***???
      self.attr('state', state);
      self.html(txt)

      //re-renders chart
      plot.call(chart, {
        data: data,
        axis: {
          x: xAxis,
          y: yAxis
        },
        gridlines: yGridlines,
        initialize: false
      });

    })

    //invoke the plot fn to render
    //using best practices to refactor
    plot.call(chart, {
      data: data,
      axis: {
        x: xAxis,
        y: yAxis
      },
      gridlines: yGridlines,
      initialize: true
    });

  }

  render() {
    // this.d3stuff();
    // return (
    //   <div id="charts">CHARTS!!!</div>

    // );
    console.log('list', this.props.list);
    if (this.props.list.length > 0) {
      this.makeCharts(this.props.list);
      // return (
      //   <div>CHARTS!</div>
      // );
    }
    return (
      <div></div>
    );
    //  else {
    //   return (
    //     <div>NO CHARTS!</div>
    //   );
    // }
  }
}