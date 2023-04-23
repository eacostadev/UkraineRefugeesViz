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
const spainColor = "#90c371";
const franceColor = "#9b71bb";
const slovakiaColor = "#00f5d4";
const romaniaColor = "#a8dadc";

const opacity = ".85";


const homewidth = 1200;
const homeheight = 800;

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

    let svgMain = d3.select("#homeMap").attr("width", homewidth).attr("height", homeheight).attr("viewbox", `0 0 900 700`);

    // Draw the map
    svgMain.append("g")
        .selectAll("path")
        .data(data.features)
        .join("path")
        .attr("fill", "#413F3F")
        .attr("d", geoGenerator)
        .style("stroke", "#515050")
        .attr("id", d => d.properties.name)
        .attr("id2", d => d.id);

    // console.log(data.features)

    // let featureRussia = data.features[134];
    // let centerRussia = geoGenerator.centroid(featureRussia);

    // let featurePoland = data.features[127];
    // let centerPoland = geoGenerator.centroid(featurePoland);

    // let feature = data.features[133];
    // let center = geoGenerator.centroid(feature);

    //134 Russia
    //127 Poland
    //41 Germany
    //40 Czech
    //57 England
    //79 Italy
    //49 Spain
    //55 France
    //148 Slovakia
    //133 Romania

   // console.log(center)
   // console.log(feature.properties.name)
    // console.log(featureRussia.id)


    //Set country outlines
    d3.select("path#Ukraine")
        .style("stroke", "#FFD500")
        .attr("fill", ukraineColor)
        .style("stroke-width", "2")
    // .node();

    d3.select("path#Russia")
        .style("stroke", russiaColor)
        .on('mouseover', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', opacity);
            d3.select(".line_Russia").classed("inactive", false)
            d3.select(".node_Russia").classed("inactive", false)
        })
        .on('mouseout', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '1');
            d3.select(".line_Russia").classed("inactive", true)
            d3.select(".node_Russia").classed("inactive", true)
        });

    d3.select("path#Poland")
        .style("stroke", polandColor)
        .on('mouseover', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', opacity);
            d3.select(".line_Poland").classed("inactive", false)
            d3.select(".node_Poland").classed("inactive", false)
        })
        .on('mouseout', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '1');
            d3.select(".line_Poland").classed("inactive", true)
            d3.select(".node_Poland").classed("inactive", true)
        });

    d3.select("path#Germany")
        .style("stroke", germanyColor)
        .on('mouseover', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', opacity);
            d3.select(".line_Germany").classed("inactive", false)
            d3.select(".node_Germany").classed("inactive", false)
        })
        .on('mouseout', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '1');
            d3.select(".line_Germany").classed("inactive", true)
            d3.select(".node_Germany").classed("inactive", true)
        });

    d3.select("path[id2='CZE']")
        .style("stroke", czechiaColor)
        .on('mouseover', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', opacity);
            d3.select(".line_Czechia").classed("inactive", false)
            d3.select(".node_Czechia").classed("inactive", false)
        })
        .on('mouseout', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '1');
            d3.select(".line_Czechia").classed("inactive", true)
            d3.select(".node_Czechia").classed("inactive", true)
        });

    d3.select("path#England")
        .style("stroke", englandColor)
        .on('mouseover', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', opacity);
            d3.select(".line_United").classed("inactive", false)
            d3.select(".node_United").classed("inactive", false)
        })
        .on('mouseout', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '1');
            d3.select(".line_United").classed("inactive", true)
            d3.select(".node_United").classed("inactive", true)
        });

    d3.select("path#Italy")
        .style("stroke", italyColor)
        .on('mouseover', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', opacity);
            d3.select(".line_Italy").classed("inactive", false)
            d3.select(".node_Italy").classed("inactive", false)
        })
        .on('mouseout', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '1');
            d3.select(".line_Italy").classed("inactive", true)
            d3.select(".node_Italy").classed("inactive", true)
        });

    d3.select("path#Spain")
        .style("stroke", spainColor)
        .style("stroke-width", "2")
        .on('mouseover', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', opacity);
            d3.select(".line_Spain").classed("inactive", false)
            d3.select(".node_Spain").classed("inactive", false)
        })
        .on('mouseout', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '1');
            d3.select(".line_Spain").classed("inactive", true)
            d3.select(".node_Spain").classed("inactive", true)
        });

    d3.select("path#France")
        .style("stroke", franceColor)
        .on('mouseover', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', opacity);
            d3.select(".line_France").classed("inactive", false)
            d3.select(".node_France").classed("inactive", false)
        })
        .on('mouseout', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '1');
            d3.select(".line_France").classed("inactive", true)
            d3.select(".node_France").classed("inactive", true)
        });

    d3.select("path#Slovakia")
        .style("stroke", slovakiaColor)
        .on('mouseover', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', opacity);
            d3.select(".line_Slovakia").classed("inactive", false)
            d3.select(".node_Slovakia").classed("inactive", false)
        })
        .on('mouseout', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '1');
            d3.select(".line_Slovakia").classed("inactive", true)
            d3.select(".node_Slovakia").classed("inactive", true)
        });

    d3.select("path#Romania")
        .style("stroke", romaniaColor)
        .on('mouseover', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', opacity);
            d3.select(".line_Romania").classed("inactive", false)
            d3.select(".node_Romania").classed("inactive", false)
        })
        .on('mouseout', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '1');
            d3.select(".line_Romania").classed("inactive", true)
            d3.select(".node_Romania").classed("inactive", true)
        });

let siteURL = location.href.includes("UkraineRefugeesViz") ? "https://eacostadev.github.io/UkraineRefugeesViz" : location.origin;

    d3.csv(siteURL + "/data/ukrainian-refugees-2023-by-country-MarchReport.csv").then(function (dataRef) {
       // console.log("Refugee data", dataRef.slice(0, 10));


        const lines = svgMain.selectAll("line")
            .data(dataRef.slice(0, 10))
            .enter()
            .append("line")
            .style("stroke-width", "1")
            .style("stroke", "black")
            .attr('x1', function (d) { return d.x })
            .attr('y1', function (d) { return d.y })
            .attr('x2', d => moveCountryLine(d.country))
            .attr('y2', "100")
            .attr("class", d => { return "line_" + d.country + " inactive" })

        const nodes = svgMain.append("g")
            .selectAll(".circle")
            .data(dataRef.slice(0, 10))
            .enter()
            .append("g")
            .attr("class", d => { return "node_" + d.country + " inactive" })

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
                    return "750";
                case "Germany":
                    return "600";
                case "Czechia":
                    return "450";
                case "United Kingdom":
                    return "310";
                case "Italy":
                    return "180";
                case "Spain":
                    return "140";
                case "France":
                    return "100";
                case "Slovakia":
                    return "350";
                case "Romania":
                    return "500";
            }
        }

        function moveCountryCircle(country) {
            switch (country) {
                case "Russia":
                    return "900";
                case "Poland":
                    return "750";
                case "Germany":
                    return "600";
                case "Czechia":
                    return "450";
                case "United Kingdom":
                    return "310";
                case "Italy":
                    return "180";
                case "Spain":
                    return "140";
                case "France":
                    return "100";
                case "Slovakia":
                    return "350";
                case "Romania":
                    return "500";
            }
        }

        function getFillColor(country) {
            switch (country) {
                case "Russia":
                    return russiaColor;
                case "Poland":
                    return polandColor;
                case "Germany":
                    return germanyColor;
                case "Czechia":
                    return czechiaColor;
                case "United Kingdom":
                    return englandColor;
                case "Italy":
                    return italyColor;
                case "Spain":
                    return spainColor;
                case "France":
                    return franceColor;
                case "Slovakia":
                    return slovakiaColor;
                case "Romania":
                    return romaniaColor;
            }
        }




    });


});





