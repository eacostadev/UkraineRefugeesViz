const width = 1000;
const height = 700;

// Map and projection
const projection = d3.geoNaturalEarth1()
  //  .scale(width / 1.3 / Math.PI)
    .translate([width / 2, height / 2]);

//https://raw.githubusercontent.com/d3-node/d3node-map-world/master/data/world.json
//https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson

// Load external map data
d3.json("https://raw.githubusercontent.com/d3-node/d3node-map-world/master/data/world.json").then(function (data) {
    console.log(data);

    let svg = d3.select("#homeMap").attr("width", width).attr("height", height).attr("viewbox", `0 0 ${width} ${height}`);

    // Draw the map
    svg.append("g")
        .selectAll("path")
        .data(data.features)
        .join("path")
        .attr("fill", "#000")
        .attr("d", d3.geoPath()
            .projection(projection)
        )
        .style("stroke", "#3a3a3a")

});