let w = 600;
let h = 500;

let svg_total = d3.select("#totalCost").attr("width", w).attr("height", h),
  margin_total = 200,
  width_total = w - margin_total,
  height_total = h - margin_total;

svg_total
  .append("text")
  .attr("class", "title")
  .attr("transform", "translate(100,0)")
  .attr("x", -10)
  .attr("y", 50)
  .text("Ukrainian Refugee Support Total Cost");

let xScale = d3.scaleBand().range([0, width_total]).padding(0.4),
  yScale = d3.scaleLinear().range([height_total, 0]);

let g = svg_total.append("g").attr("transform", "translate(" + 100 + "," + 100 + ")");

d3.csv(
  location.href + "/data/cost-by-country.csv",
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
        return d.Cost;
      }),
    ]);

    g.append("g")
      .attr("transform", "translate(0," + height_total + ")")
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "rotate(-50)")
      .attr("dy", "10px")
      .attr("dx", "-30px")
      .append("text")
      .attr("class", "xaxis")
      .attr("y", height_total - 250)
      .attr("x", width_total - 100)
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
      .attr("dy", "-3.1em")
      .attr("text-anchor", "end")
      .attr("fill", "black")
      .text("Cost (Billion Euros)")


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
        return height_total - yScale(d.Cost);
      });

    // Add the tooltips
    var tooltip = svg_total
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
    svg_total.selectAll(".bar")
      .on("mouseover", function (d) {
        tooltip.style("display", null);
        // tooltip.select("text").text(d.Cost);
      })
    svg_total.selectAll(".bar")
      .on("mousemove", function (d) {
        var xposition = d3.mouse(this)[0] - 85;
        var yposition = d3.mouse(this)[1] - 55;
        tooltip.attr("transform", "translate(" + xposition + "," + yposition + ")");
        tooltip.select("text").text("€ " + d.Cost)
      })

      // Hide the tooltip on mouseout
      .on("mouseout", function () {
        tooltip.style("display", "none");
      });

  }
);

