#USGS Earthquake Analysis

Utilizing data from the United States Geological Survey (USGS) (https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php), which provides data on climate change, the environment, and natural disasters, I created an earthquake visualization with HTML, JavaScript, and CSS. 
The earthquake data on their website is displayed in GeoJSON format. It contains various datasets of earthquakes during different timeframes ranging from the past hour to the past 30 days. For the challenge, I looked at earthquake data from the past 7 days.
I pulled in the data from the JSON using D3. Using Leaflet, I created a map to display the locations of the earthquakes based on their latitude and longitude with associated markers and pop-ups which contain information on the location, depth, and magnitude of the earthquakes. Different colors were used to reflect the depth of the earthquake. The magnitude of the earthquakes determined the size of the markers. There is an associated legend at the bottom of the map. 

