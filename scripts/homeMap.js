/* Notes 
Have an outline for the top 10 countries
Different color outline
When the user hovers over the country,
show the circle with the number of refugees
Create a line path from the given country hovered to the circle

*/

const ukraineColor = "#005BBB";
const russiaColor = "#E56B6F";
const polandColor = "#EAAC8B";
const germanyColor = "#7DCFB6";
const czechiaColor = "#00B2CA";
const englandColor = "#F79256";
const italyColor = "#5999e5";
const spainColor = "#6a994e";
const franceColor = "#bb3e03";
const slovakiaColor = "#00f5d4";
const romaniaColor = "#a8dadc";




const width = 1200;
const height = 900;

// Map and projection
const projection = d3.geoNaturalEarth1()   //geoNaturalEarth1
    .translate([250, 800])
    .scale(430);

//https://raw.githubusercontent.com/d3-node/d3node-map-world/master/data/world.json
//https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson

// Load external map data
d3.json("https://raw.githubusercontent.com/d3-node/d3node-map-world/master/data/world.json").then(function (data) {
    //console.log(data.features[0].properties.name);
    // console.log(data.features);
    //console.log(data.features[2].geometry.coordinates);

    let geoGenerator = d3.geoPath().projection(projection);

    let svg = d3.select("#homeMap").attr("width", width).attr("height", height).attr("viewbox", `0 0 900 700`);

    // Draw the map
    svg.append("g")
        .selectAll("path")
        .data(data.features)
        .join("path")
        .attr("fill", "#413F3F")
        .attr("d", geoGenerator)
        .style("stroke", "#515050")
        .attr("id", d => d.properties.name)
        .attr("id2", d => d.id);

    // console.log(data.features)

    let featureRussia = data.features[134];
    let centerRussia = geoGenerator.centroid(featureRussia);

    let featurePoland = data.features[127];
    let centerPoland = geoGenerator.centroid(featurePoland);

    let feature = data.features[134];
    let center = geoGenerator.centroid(feature);

    //41 Germany
    //40 Czech
    //57 England
    //79 Italy
    //49 Spain
    //55 France
    //148 Slovakia
    //133 Romania

    console.log(center)
    console.log(feature.properties.name)
    // console.log(featureRussia.id)


    //Set country outlines
    d3.select("path#Ukraine")
        .style("stroke", "#FFD500")
        .attr("fill", ukraineColor)
        .style("stroke-width", "2")
    // .node();

    d3.select("path#Russia")
        .style("stroke", russiaColor)

    d3.select("path#Poland")
        .style("stroke", polandColor)

    d3.select("path#Germany")
        .style("stroke", germanyColor)

    d3.select("path[id2='CZE']")
        .style("stroke", czechiaColor)

    d3.select("path#England")
        .style("stroke", englandColor)

    d3.select("path#Italy")
        .style("stroke", italyColor)

    d3.select("path#Spain")
        .style("stroke", spainColor)
        .style("stroke-width", "2")

    d3.select("path#France")
        .style("stroke", franceColor)

    d3.select("path#Slovakia")
        .style("stroke", slovakiaColor)

    d3.select("path#Romania")
        .style("stroke", romaniaColor)


    d3.csv("/data/ukrainian-refugees-2023-by-country-MarchReport.csv").then(function (dataRef) {
        console.log("Refugee data", dataRef.slice(0, 10));


        const lines = svg.selectAll("line")
            .data(dataRef.slice(0, 10))
            .enter()
            .append("line")
            .style("stroke-width", "1")
            .style("stroke", "black")
            .attr('x1', function (d) { return d.x })
            .attr('y1', function (d) { return d.y })
            .attr('x2', d => moveCountryLine(d.country))
            .attr('y2', "100")

        const nodes = svg.append("g")
            .selectAll(".circle")
            .data(dataRef.slice(0, 10))
            .enter()
            .append("g")
            .attr("class", d => { return "gr_" + d.country })

        nodes.append("circle")
            .attr("r", 60)
            .attr('cx', d => moveCountryCircle(d.country))
            .attr('cy', "100")
            .attr("fill", d => getFillColor(d.country))

        nodes.append("text")
            .attr('dx', d => moveCountryCircle(d.country))
            .attr('dy', "95")
            .attr("class", "countryLabel")
            .attr("text-anchor", "middle")
            .text(d => d.country)

        nodes.append("text")
            .attr('dx', d => moveCountryCircle(d.country))
            .attr('dy', "118")
            .attr("class", "countryCount")
            .attr("text-anchor", "middle")
            .text(d => d.count)


        function moveCountryLine(country) {
            switch (country) {
                case "Russia":
                    return "900";
                case "Poland":
                    return "900";

            }
        }

        function moveCountryCircle(country) {
            switch (country) {
                case "Russia":
                    return "900";
                    case "Poland":
                    return "900";
            }
        }

        function getFillColor(country) {
            switch (country) {
                case "Russia":
                    return russiaColor;
                    case "Poland":
                    return polandColor;
            }
        }




    });


});





