let w2 = 600;
let h2 = 500;

let svg_edu = d3.select("#edu").attr("width", w2).attr("height", h2),
  margin_edu = 200,
  width_edu = w2 - margin_edu,
  height_edu = h2 - margin_edu;

  svg_edu
  .append("text")
  .attr("class", "title")
  .attr("transform", "translate(100,0)")
  .attr("x", -50)
  .attr("y", 50)
  .text("Ukrainian Refugee Support Education Cost");

var xScale = d3.scaleBand().range([0, width_edu]).padding(0.4),
  yScale = d3.scaleLinear().range([height_edu, 0]);

var g = svg_edu.append("g").attr("transform", "translate(" + 100 + "," + 100 + ")");

d3.csv(
  location.href + "/data/education.csv",
  function (error, data) {
    if (error) {
      throw error;
    }

    xScale.domain(
      data.map(function (d) {
        return d.Country;
      })
    );
    yScale.domain([
      0,
      d3.max(data, function (d) {
        return d.Cost *1.01;
      }),
    ]);

    g.append("g")
      .attr("transform", "translate(0," + height_edu + ")")
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "rotate(-50)")
      .attr("dy", "10px")
      .attr("dx", "-30px")
      .append("text")
      .attr("class", "xaxis")
      .attr("y", height_edu - 150)
      .attr("x", width_edu - 100)
      .attr("text-anchor", "end")
      .attr("stroke", "black")
      .text("Countries"); //problem! not show up

    g.append("g")
      .call(
        d3
          .axisLeft(yScale)
          .tickFormat(function (d) {
            return "€ " + d;
          })
          .ticks(12)
      )
      .append("text")
      .attr("class", "axisTitle")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "-4.1em")
      .attr("text-anchor", "end")
      .attr("fill", "black")
      .text("Cost (Million Euros)")
  

    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", function (d) {
        return `bar bar${d.Country}`
      })
      .attr("x", function (d) {
        return xScale(d.Country);
      })
      .attr("y", function (d) {
        return yScale(d.Cost);
      })
      // .attr("width", xScale.bandwidth())
      .attr("width", 25)
      .attr("height", function (d) {
        return height_edu - yScale(d.Cost);
      });

       // Add the tooltips
    var tooltip = svg_edu
    .append("g")
    .attr("class", "tooltip")
    .style("display", "none");

    // tooltip.append("rect")
    // .attr("width", 60)
    // .attr("height", 20)
    // .attr("fill", "purple")
    // .style("opacity", 0.8)
    // .style("position", "relative")
  

    tooltip.append("text")
    .attr("class", "tooltext")
    .attr("x", 200)
    .attr("dy", "7em")
    .style("text-anchor", "middle");

    // Show the tooltip on mouseover
    svg_edu.selectAll(".bar")
    .on("mouseover", function(d) {  
    tooltip.style("display", null);
    // tooltip.select("text").text(d.Cost);
    })
    svg_edu.selectAll(".bar")
    .on("mousemove", function(d){
      var xposition= d3.mouse(this)[0] - 85;
      var yposition= d3.mouse(this)[1] - 55;
      tooltip.attr("transform", "translate(" +xposition + "," + yposition + ")");
      tooltip.select("text").text("€ "+ d.Cost)
    })

    // Hide the tooltip on mouseout
    .on("mouseout", function() {
     tooltip.style("display", "none");
    });

    }
);

