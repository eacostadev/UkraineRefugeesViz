const width_2 = 900;
const height_2 = 550;

// Map and projection
const distance_projection = d3.geoOrthographic()
    .translate([200, 1000])
    .scale(1000);


let geoURL = location.href.includes("UkraineRefugeesViz") ? "https://eacostadev.github.io/UkraineRefugeesViz" : location.origin;

// Load external map data
d3.json(geoURL + "/data/distance.geo.json").then(function (data) {

    let geoGenerator2 = d3.geoPath().projection(distance_projection);

    let svg_distance = d3.select("#distanceMap").attr("width", width_2).attr("height", height_2).attr("viewbox", `0 0 900 700`);

    // Draw the map
    svg_distance.append("g")
        .selectAll("path")
        .data(data.features)
        .join("path")
        .attr("fill", "white")
        .attr("d", geoGenerator2)
        .style("stroke", "#000")
        .attr("data-name", d => d.properties.name)
        .attr("data-code", d => d.id);


    d3.select("path[data-name='Ukraine']")
        .style("stroke", ukraineColor)
        .attr("fill", "#FFD500")
        .style("stroke-width", "2")


    let ukrFeature = data.features[0];
    let ukrCenter = geoGenerator2.centroid(ukrFeature);

    // console.log(ukrCenter)
    // console.log(ukrFeature.properties.name)

    let siteURL = location.href.includes("UkraineRefugeesViz") ? "https://eacostadev.github.io/UkraineRefugeesViz" : location.origin;

    d3.csv(siteURL + "/data/distance.csv").then(function (dataDist) {
        let areas = svg_distance.append("g")
            .selectAll(".area")
            .data(dataDist)
            .enter()
            .append("g")
            .attr("class", d => { return "mapArea_" + d.country + " " })

        areas.append("text")
            .attr('dx', d => moveCountryNameX(d.country))
            .attr('dy', d => moveCountryNameY(d.country))
            .attr("class", "countryLabel")
            .attr("text-anchor", "middle")
            .text(d => d.country)

        areas.append("text")
            .attr('dx', d => moveDISTX(d.country))
            .attr('dy', d => moveDISTY(d.country))
            .attr("class", d => { return "dist_" + d.country + " smallHeadline distStyle inactive" })
            .attr("text-anchor", "middle")
            .text(d => d.distance + "km")

        function moveCountryNameX(country) {
            switch (country) {
                case "Russia":
                    return "600";
                case "Poland":
                    return "400";
                case "Germany":
                    return "300";
                case "Czechia":
                    return "370";
                case "United Kingdom":
                    return "120";
                case "Italy":
                    return "323";
                case "Spain":
                    return "50";
                case "France":
                    return "100";
                case "Slovakia":
                    return "450";
                case "Romania":
                    return "500";
            }
        }

        function moveCountryNameY(country) {
            switch (country) {
                case "Russia":
                    return "160";
                case "Poland":
                    return "170";
                case "Germany":
                    return "205";
                case "Czechia":
                    return "230";
                case "United Kingdom":
                    return "150";
                case "Italy":
                    return "299";
                case "Spain":
                    return "340";
                case "France":
                    return "260";
                case "Slovakia":
                    return "240";
                case "Romania":
                    return "325";
            }
        }

        function moveDISTX(country) {
            switch (country) {
                case "Russia":
                    return "610";
                case "Poland":
                    return "430";
                case "Germany":
                    return "300";
                case "Czechia":
                    return "410";
                case "United Kingdom":
                    return "90";
                case "Italy":
                    return "300";
                case "Spain":
                    return "110";
                case "France":
                    return "120";
                case "Slovakia":
                    return "420";
                case "Romania":
                    return "530";
            }
        }

        function moveDISTY(country) {
            switch (country) {
                case "Russia":
                    return "190";
                case "Poland":
                    return "210";
                case "Germany":
                    return "170";
                case "Czechia":
                    return "280";
                case "United Kingdom":
                    return "200";
                case "Italy":
                    return "360";
                case "Spain":
                    return "360";
                case "France":
                    return "290";
                case "Slovakia":
                    return "300";
                case "Romania":
                    return "300";
            }
        }

        d3.select("path[data-name='Russia']")
            .on('mouseover', function (d, i) {
                d3.select(this).transition()
                    .style("stroke", russiaColor)
                    .style("fill", russiaColor)
                    .style("stroke-width", "2")
                d3.select(".dist_Russia").classed("inactive", false)
            })
            .on('mouseout', function (d, i) {
                d3.select(this).transition()
                    .style("stroke", "black")
                    .style("stroke-width", "1")
                d3.select(".dist_Russia").classed("inactive", true)
            });

        d3.select("path[data-name='Poland']")
            .on('mouseover', function (d, i) {
                d3.select(this).transition()
                    .style("stroke", polandColor)
                    .style("fill", polandColor)
                    .style("stroke-width", "2")
                d3.select(".dist_Poland").classed("inactive", false)
            })
            .on('mouseout', function (d, i) {
                d3.select(this).transition()
                    .style("stroke", "black")
                    .style("stroke-width", "1")
                d3.select(".dist_Poland").classed("inactive", true)
            });

        d3.select("path[data-name='Germany']")
            .on('mouseover', function (d, i) {
                d3.select(this).transition()
                    .style("stroke", germanyColor)
                    .style("fill", germanyColor)
                    .style("stroke-width", "2")
                d3.select(".dist_Germany").classed("inactive", false)
            })
            .on('mouseout', function (d, i) {
                d3.select(this).transition()
                    .style("stroke", "black")
                    .style("stroke-width", "1")
                d3.select(".dist_Germany").classed("inactive", true)
            });

        d3.select("path[data-name='Czech-Republic']")
            .on('mouseover', function (d, i) {
                d3.select(this).transition()
                    .style("stroke", czechiaColor)
                    .style("fill", czechiaColor)
                    .style("stroke-width", "2")
                d3.select(".dist_Czechia").classed("inactive", false)
            })
            .on('mouseout', function (d, i) {
                d3.select(this).transition()
                    .style("stroke", "black")
                    .style("stroke-width", "1")
                d3.select(".dist_Czechia").classed("inactive", true)
            });

        d3.select("path[data-name='England']")
            .on('mouseover', function (d, i) {
                d3.select(this).transition()
                    .style("stroke", englandColor)
                    .style("fill", englandColor)
                    .style("stroke-width", "2")
                d3.select(".dist_United").classed("inactive", false)
            })
            .on('mouseout', function (d, i) {
                d3.select(this).transition()
                    .style("stroke", "black")
                    .style("stroke-width", "1")
                d3.select(".dist_United").classed("inactive", true)
            });

        d3.select("path[data-name='Italy']")
            .on('mouseover', function (d, i) {
                d3.select(this).transition()
                    .style("stroke", italyColor)
                    .style("fill", italyColor)
                    .style("stroke-width", "2")
                d3.select(".dist_Italy").classed("inactive", false)
            })
            .on('mouseout', function (d, i) {
                d3.select(this).transition()
                    .style("stroke", "black")
                    .style("stroke-width", "1")
                d3.select(".dist_Italy").classed("inactive", true)
            });

        d3.select("path[data-name='Spain']")
            .on('mouseover', function (d, i) {
                d3.select(this).transition()
                    .style("stroke", spainColor)
                    .style("fill", spainColor)
                    .style("stroke-width", "2")
                d3.select(".dist_Spain").classed("inactive", false)
            })
            .on('mouseout', function (d, i) {
                d3.select(this).transition()
                    .style("stroke", "black")
                    .style("stroke-width", "1")
                d3.select(".dist_Spain").classed("inactive", true)
            });

        d3.select("path[data-name='France']")
            .on('mouseover', function (d, i) {
                d3.select(this).transition()
                    .style("stroke", franceColor)
                    .style("fill", franceColor)
                    .style("stroke-width", "2")
                d3.select(".dist_France").classed("inactive", false)
            })
            .on('mouseout', function (d, i) {
                d3.select(this).transition()
                    .style("stroke", "black")
                    .style("stroke-width", "1")
                d3.select(".dist_France").classed("inactive", true)
            });

        d3.select("path[data-name='Slovakia']")
            .on('mouseover', function (d, i) {
                d3.select(this).transition()
                    .style("stroke", slovakiaColor)
                    .style("fill", slovakiaColor)
                    .style("stroke-width", "2")
                d3.select(".dist_Slovakia").classed("inactive", false)
            })
            .on('mouseout', function (d, i) {
                d3.select(this).transition()
                    .style("stroke", "black")
                    .style("stroke-width", "1")
                d3.select(".dist_Slovakia").classed("inactive", true)
            });

        d3.select("path[data-name='Romania']")
            .on('mouseover', function (d, i) {
                d3.select(this).transition()
                    .style("stroke", romaniaColor)
                    .style("fill", romaniaColor)
                    .style("stroke-width", "2")
                d3.select(".dist_Romania").classed("inactive", false)
            })
            .on('mouseout', function (d, i) {
                d3.select(this).transition()
                    .style("stroke", "black")
                    .style("stroke-width", "1")
                d3.select(".dist_Romania").classed("inactive", true)
            });



    });
});