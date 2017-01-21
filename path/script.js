(function() {
  'use strict';

  var svg = d3.select("#svg");

  var g = svg.append("g")
    .call(d3.zoomer());

  var line = d3.line()
    .curve(d3.curveBasis)
    .x(function(d) {
      return d.x;
    })
    .y(function(d) {
      return d.y
    });

  g.append('path')
    .attr('d', line(data));
}());