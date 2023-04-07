/* Notes 
Have an outline for the top 10 countries
Different color outline
When the user hovers over the country,
show the circle with the number of refugees
Create a line path from the given country hovered to the circle

*/




const width = 1000;
const height = 700;

// Map and projection
const projection = d3.geoNaturalEarth1()
    // .scale(width / 3.)
    .translate([width / 2, height / 2]);

//https://raw.githubusercontent.com/d3-node/d3node-map-world/master/data/world.json
//https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson

// Load external map data
d3.json("https://raw.githubusercontent.com/d3-node/d3node-map-world/master/data/world.json").then(function (data) {
    //console.log(data.features[0].properties.name);
    // console.log(data.features);
    //console.log(data.features[2].geometry.coordinates);

    let geoGenerator = d3.geoPath().projection(projection);

    let svg = d3.select("#homeMap").attr("width", width).attr("height", height).attr("viewbox", `0 0 ${width} ${height}`);

    // Draw the map
    svg.append("g")
        .selectAll("path")
        .data(data.features)
        .join("path")
        .attr("fill", "#000")
        .attr("d", geoGenerator)
        .style("stroke", "#3a3a3a")
        // .append("svg")
        .attr("id", d => d.properties.name)

    let feature = data.features[0];

    let center = geoGenerator.centroid(feature);
    console.log(feature.properties.name)
    console.log(center)

    //const canvas = svg.append("g").attr("class", canvas)
    //const states = [...new Set(data.map(d => d.state))]

    // states.forEach (d => {})


});




//Add Refugee Data
d3.csv("/data/ukrainian-refugees-2023-by-country.csv").then(function (dataRef) {
    console.log("Refugee data", dataRef);

    let lines = d3.select("#lines");

    lines.append("g")
        .selectAll()
        .data(dataRef)
        .enter()
        .append("line")
        .attr("stroke", "#39ff14")
        .style("stroke-width", 10)
    // .attr("x1", 0)
    // .attr("y1", 0)
    // .attr("x2", 200)
    // .attr("y2", 200)






    // let countrySVG = d3.selectAll("svg#" + dataRef[0].country);
    // console.log("This is svg", countrySVG)

    //  let path = document.getElementById(dataRef[0].country);
    //  console.log(path)

    //  let gLines = svg.append("g").attr("class", "lines");

    //   countrySVG
    //         .append("line")
    //         .attr("stroke", "#39ff14")
    //         .style("stroke-width", 10)
    //      .attr("x1", 0)
    //      .attr("y1", 0)
    //      .attr("x2", 100)
    //      .attr("y2", 100)
    // });


    // if (paths.attr("id") == dataRef[0].country) {
    //     console.log("liz")
    // }

    // if (svg   dataRef[0].country == data.features[2].properties.name) {
    //     
    // }

});