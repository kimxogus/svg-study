(function() {
  'use strict';

  var svg = d3.select("#svg");

  var g = svg.append("g")
    .call(d3.zoomer()); // d3-zoomer for easy pan-zoom behavior.

  // define line.
  var line = d3.line()
    .curve(d3.curveBasis)
    .x(function(d) {
      return d.x;
    })
    .y(function(d) {
      return d.y;
    });

  // draw line as path with data.
  var path = g.append('path')
    .attr('d', line(data));

  // get Path DOM
  var pathNode = path.node();

  // get Total Length of path.
  var pathLength = pathNode.getTotalLength();

  // Animation duration 2 sec.
  var duration = 2000;

  // add token as circle.
  var token = g.append("circle")
    .attr("r", 5)
    .attr("fill", "red");

  var tick = 0;
  function update() {
    if (tick >= duration) {
      tick -= duration;
    }
    tick += 1000 / 60;  // 60 frames per one second.

    var current = tick / duration;

    var point = pathNode.getPointAtLength( current * pathLength);

    token.attr("transform", "translate(" + [point.x, point.y] + ")");

    requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}());