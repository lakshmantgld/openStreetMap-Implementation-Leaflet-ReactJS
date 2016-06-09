# openStreetMap-Implementation-Leaflet-ReactJS
- New york OSM implementation using reactJS and leaflet.
- This web application was built to study about reactJS and Open Street maps, the rivalry to google maps.

### How did I get New york map
- Open street map organization gives all city maps in an XML format.
- I was given the NewYork XMl file by a friend.
- The OSM file contains the various nodes with latitude and longitudes and the ways connecting all these nodes.
- Initially, I converted this XML file to graph data structure using this [npm module](https://www.npmjs.com/package/osm-to-graph)
- Then applied dijikstra algorithm to find the shortest path between two nodes.

### ReactJS and leaflet
- Leaflet is used to render the OSM maps. I used mapbox to generate a tile for the maps.
- Then ReactJS was used on the top of this to add more beauty.
- React-router was used to navigate routes.

### Demo
[NewYork map]()
