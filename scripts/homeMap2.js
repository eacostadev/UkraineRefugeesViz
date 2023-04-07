




d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then(function (data) {
    console.log(data.objects.country)

    // define projection
    const projection = d3.geoMercator();
    // define geojson
    const geojson = topojson.feature(data, data.objects.country);
    // define path generator
    const path = d3.geoPath().projection(projection);
    // get center
    const center = projection(d3.geoCentroid(geojson));
    console.log(center); // [longitude, latitude]
});