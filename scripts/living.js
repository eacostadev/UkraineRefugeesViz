let w4 = 700;
let h4 = 500;

let svg_living = d3.select("#living").attr("width", w4).attr("height", h4),
  margin_living = 200,
  width_living = w4 - margin_living,
  height_living = h4 - margin_living;

svg_living
  .append("text")
  .attr("class", "title")
  .attr("transform", "translate(100,0)")
  .attr("x", -10)
  .attr("y", 40)
  .text("Ukrainian Refugee Support - Living Cost");

  svg_living
  .append("text")
  .attr("class", "smallHeadline")
  .attr("transform", "translate(100,0)")
  .attr("x", -10)
  .attr("y", 70)
  .text("Note: Unfortunately, we could not find a credible source for data into Russia's cost.");

var xScale = d3.scaleBand().range([0, width_living]).padding(0.4),
  yScale = d3.scaleLinear().range([height_living, 0]);

var g = svg_living.append("g").attr("transform", "translate(" + 100 + "," + 100 + ")");

let siteURL = location.href.includes("UkraineRefugeesViz") ? "https://eacostadev.github.io/UkraineRefugeesViz" : location.origin;

d3.csv(
  siteURL + "/data/living.csv",
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
        return d.Cost *1.05;
      }),
    ]);

    g.append("g")
      .attr("transform", "translate(0," + height_living + ")")
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "rotate(-50)")
      .attr("dy", "10px")
      .attr("dx", "-30px")
      .append("text")
      .attr("class", "xaxis")
      .attr("y", height_living - 150)
      .attr("x", width_living - 100)
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
        return height_living - yScale(d.Cost);
      });

       // Add the tooltips
    var tooltip = svg_living
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
    svg_living.selectAll(".bar")
    .on("mouseover", function(d) {  
    tooltip.style("display", null);
    // tooltip.select("text").text(d.Cost);
    })
    svg_living.selectAll(".bar")
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

