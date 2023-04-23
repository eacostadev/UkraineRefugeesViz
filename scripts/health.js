let w3 = 600;
let h3 = 500;

let svg_health = d3.select("#health").attr("width", w3).attr("height", h3),
  margin_health = 200,
  width_health = w3 - margin_health,
  height_health = h3 - margin_health;

  svg_health
  .append("text")
  .attr("class", "title")
  .attr("transform", "translate(100,0)")
  .attr("x", -60)
  .attr("y", 50)
  .text("Ukrainian Refugee Support - Health Care Cost");

var xScale = d3.scaleBand().range([0, width_health]).padding(0.4),
  yScale = d3.scaleLinear().range([height_health, 0]);

var g = svg_health.append("g").attr("transform", "translate(" + 100 + "," + 100 + ")");

let siteURL = location.href.includes("UkraineRefugeesViz") ? "https://eacostadev.github.io/UkraineRefugeesViz" : location.origin;

d3.csv(
  siteURL + "/data/health.csv",
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
        return d.Cost *1.03;
      }),
    ]);

    g.append("g")
      .attr("transform", "translate(0," + height_health + ")")
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "rotate(-50)")
      .attr("dy", "10px")
      .attr("dx", "-30px")
      .append("text")
      .attr("class", "xaxis")
      .attr("y", height_health - 150)
      .attr("x", width_health - 100)
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
        return height_health - yScale(d.Cost);
      });

       // Add the tooltips
    var tooltip = svg_health
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
    svg_health.selectAll(".bar")
    .on("mouseover", function(d) {  
    tooltip.style("display", null);
    // tooltip.select("text").text(d.Cost);
    })
    svg_health.selectAll(".bar")
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

