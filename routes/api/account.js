import express from 'express';
let router = express.Router();

let fs = require('fs');

let Graph = require('node-dijkstra');

let route = new Graph();

router.post('/', (req, res) => {
  let source = req.body.source;
  let destination = req.body.destination;

  fs.readFile('/Users/lakshman/hammer/openStreetMap-Implementation-Leaflet-ReactJS/map.json', 'utf8', function(err, data) {

    if(err) {
      throw err;
    }

    let obj = JSON.parse(data);

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        let edgesArrayLength = obj[key]['edges'].length;
        let edges = {};
        for (let i = 0; i < edgesArrayLength; i++ ) {
          // console.log(obj[key]['edges'][i]);
          edges[obj[key]['edges'][i]['node']] = obj[key]['edges'][i]['distance'];
        }
        route.addNode(key, edges);
      }
    }

    let routePath = route.path(source, destination);
    let latlong = [];

    for (let j = 0; j < routePath.length; j++) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (routePath[j] === key) {
            let latLonObj = {};
            latLonObj['lat'] = obj[key]['latitude'];
            latLonObj['long'] = obj[key]['longitude'];
            latlong.push(latLonObj);
          }
        }
      }
    }

    res.send(JSON.stringify(latlong));
  });


});

module.exports = router;
