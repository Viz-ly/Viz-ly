import React from 'react';
// var d3 = require('./d3.min.js');
import * as d3 from 'd3';

export default class Charts extends React.Component {

  constructor(props) {
    super(props);
  }

  makeBarChart(list) {
    var chart = document.getElementById('bar-chart');
    if (!!chart) {
      chart.remove();
      document.getElementById('bar-controls').remove();
    }

    var w = 1080;
    var h = 600;
    var margin = {
      top: 58,
      bottom: 100,
      left: 80,
      right: 40
    };
    var width = w - margin.left - margin.right;
    var height = h - margin.top - margin.bottom;

    var data = list;

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
    var svg = d3.select('body').append('svg')
            .attr('id', 'bar-chart')
            .attr('width', w)
            .attr('height', h)
            .style('background-color', '#F5F2EB')
            .style('border', '1px solid #CCC')

    //creates the GROUP (element) and add the margins in
    var chart = svg.append('g')
           .classed('displayed', true)
           .attr('transform', `translate(${margin.left}, ${margin.top})`)

    //adding a sort button
    var controls = d3.select('body')
          .append('div')
          .attr('id', 'bar-controls')

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
        // **the selector here is important. class y AND axis
        this.select('.y.axis')
          .append('text')
          .attr('x', 0)
          .attr('y', 0)
          .style('text-anchor', 'middle')
          .attr('transform', `translate(-50, ${height/2}) rotate(-90)`)
          .text('count');
        //adding x axis label
        // this.select('.x.axis')
        //   .append('text')
        //   .attr('x', 0)
        //   .attr('y', 0)
        //   .style('text-anchor', 'middle')
        //   .attr('transform', `translate(${width/2}, 80)`)
        //   .text('words')
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
          .style({
            'text-anchor': 'end',
            'font-family': 'Tahoma, Geneva, sans-serif'
          })
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
          .append('rect')
          // .attr('class', 'bar')
          .classed('bar', true)
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
      this.selectAll('.bar-label')
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
        .attr('x', function (d, i) {
          return x(d.key);
        })
        .attr('y', function (d, i) {
          return y(d.count);
        })
        .attr('width', function (d, i) {
          return x.rangeBand();
          //are using pixels as the number (by default)
        })
        .attr('height', function (d, i) {
          return height - y(d.count);
        })
        .style('fill', function (d, i) {
          // return linearColorScale(i);
          return ordinalColorScale(i);
        })
        .style('shape-rendering', 'crispEdges')

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


/************************BUBBLE CHART*******************************/

  makeBubbleChart(data) {
    var chart = document.getElementById('bubble-chart');
    if (!!chart) {
      chart.remove();
    }

    function bubbleChart() {
      var width = 1080;
      var height = 600;

      var center = { x: width / 2, y: height / 2 };

      // Used when setting up force and
      // moving around nodes
      var damper = 0.102;

      // These will be set in create_nodes and create_vis
      var svg = null;
      var bubbles = null;
      var nodes = [];

      function charge(d) {
        return -Math.pow(d.radius, 1.95) / 8;
      }

      var force = d3.layout.force()
        .size([width, height])
        .charge(charge)
        .gravity(-0.01)
        .friction(0.9);

      //sets color of the bubbles
      var fillColor = d3.scale.category20()
        // .domain(['low', 'medium', 'high'])
        // .range(['#d84b2a', '#beccae', '#7aa25c']);

      // Sizes bubbles based on their area instead of raw radius
      var radiusScale = d3.scale.pow()
        .exponent(0.5)
        .range([5, 95]);

      //manipulates raw data into each node
      function createNodes(rawData) {
        var myNodes = rawData.map(function (d) {
          return {
            radius: radiusScale(+d.count),
            count: d.count,
            word: d.key
          };
        });

        return myNodes;
      }

       //function to add chart into the DOM
      var chart = function chart(selector, rawData) {
        // console.log(selector);
        var maxAmount = d3.max(rawData, function (d) { return +d.count; });
        radiusScale.domain([0, maxAmount]);

        nodes = createNodes(rawData);
        // Set the force's nodes to our newly created nodes array.
        force.nodes(nodes);

        //creates svg element
        svg = d3.select(selector).append('svg')
          .attr('id', 'bubble-chart')
          .attr('width', width)
          .attr('height', height)
          .style('border', '1px solid #CCC')
          .style('background-color', '#F5F2EB')

        // Bind nodes data to what will become DOM elements to represent them.
        bubbles = svg.selectAll('.bubble')
          .data(nodes)
          .enter()
          .append('g').call(force.start)

        // Create new circle elements each with class `bubble`.
        // There will be one circle.bubble for each object in the nodes array.
        bubbles.append('circle')
          .classed('bubble', true)
          .attr('r', function (d) { return d.radius; })
          .attr('fill', function (d, i) { return fillColor(i); })
          .attr('stroke', function (d, i) { return d3.rgb(fillColor(i)).darker(); })
          .attr('stroke-width', 2)
          .call(force.drag)
          .on('mouseover', function (d, i) {
            //this is refering to the bar
            d3.select(this).style('fill', 'yellow');
          })
          .on('mouseout', function (d, i) {
            d3.select(this).style('fill', fillColor(i));
          });

        bubbles.append('text')
          .attr('text-anchor', 'middle')
          .text(function (d) { return d.word; })
          .style({
              'fill':'black',
              'font-size': '12px',
              'font-family': 'Tahoma, Geneva, sans-serif'
          })
          .call(force.drag)

        // Fancy transition to make bubbles appear, ending with the
        // correct radius
        bubbles.transition()
          .duration(1000)
          .attr('r', function (d) { return d.radius; })

        groupBubbles();
      };

      function groupBubbles() {
        force.on('tick', function (e) {
          bubbles.each(moveToCenter(e.alpha))
            .attr('transform', function (d) {
              return `translate(${d.x}, ${d.y})`;
            })
        });
        force.start();
      }

      function moveToCenter(alpha) {
        return function (d) {
          d.x = d.x + (center.x - d.x) * damper * alpha;
          d.y = d.y + (center.y - d.y) * damper * alpha;
        };
      }
      // return the chart function from closure.
      return chart;
    }

    //initialization code
    var myBubbleChart = bubbleChart();

    function display(data) {
      myBubbleChart('body', data);
    }

    //calls display with the passed in data
    display(data)
  }

  render() {
    return (
      <div>
        <div className="bubble-chart">
          {this.makeBubbleChart(this.props.list)}
        </div>

        <div className="bar-chart">
          {this.makeBarChart(this.props.list)}
        </div>

      </div>
    );
  }
}
