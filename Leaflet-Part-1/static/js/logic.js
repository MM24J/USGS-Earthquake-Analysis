// Create the tile layer which will be the background of the map
let basemap = L.tileLayer(
  "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'",
  {
    attribution:
      'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',

  });

  // Create the map object
  let map = L.map("map",{
    center: [
      40.2, -95.6
    ],
    zoom: 3
  });

  // Add the basemap tile layer to the map
  basemap.addTo(map);

// Make an AJAX call that retrieves the earthquake geo.JSON data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {

// Create function that returns the style data for each of the earthquakes. Pass the magnitude of the earthquake into two separate functions
function styleInfo(feature) {
  return {
    opacity: 0.8,
    fillOpacity: 0.8,
    fillColor: getColor(feature.geometry.coordinates[2]),
    color: "#000000",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  };
}

// Determine the color of the marker based on the magnitude of the earthquake
function getColor(depth) {
  switch(true){
    case depth > 90:
      return "#663399";
    case depth > 70:
      return "#800080";
    case depth > 50:
      return "#9400D3";
    case depth > 30:
      return "#9370DB";
    case depth > 10:
      return "#FF00FF";
    default:
      return "#DA70D6";
  }
}

// Determine the radius of the marker based on the magnitude of the earthquake
function getRadius(magnitude) {
  if(magnitude === 0) {
    return 1;
  }

  return magnitude * 4;
}

// Add a geoJSON layer to the map
L.geoJSON(data, {
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng);
},

//Set the style of the marker
style: styleInfo,
onEachFeature: function (feature, layer) {
  layer.bindPopup(
    "Magnitude: "
    + feature.properties.mag
    + "<br>Depth: "
    + feature.geometry.coordinates[2]
    + "<br>Location: "
    + feature.properties.place
  );
}
}).addTo(map);

// Create legend control object
let legend = L.control({
  position: "bottomright"
});

legend.onAdd = function () {
  let div = L.DomUtil.create("div", "info legend");

  let grades = [-10, 10, 30, 50, 70, 90];
  let colors = [
    "#DA70D6",
    "#FF00FF",
    "#9370DB",
    "#9400D3",
    "#800080",
    "#663399"
  ];

  // Loop through grades to create a label for each grade
  for (let i = 0; i < grades.length; i++) {
    div.innerHTML += "<i style='background: " + colors[i] + "'></i> "
      + grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
  }
  return div;
};


// Add the legend to the map
legend.addTo(map);
});










