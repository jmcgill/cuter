### Elevation

The Maps API also has data about the height of the terrain around the world.

The {ElevationService} can answer questions about the height at a single LatLng, or the height at points along a path. The latter is useful for working out if you should ride a bike, or cheat and take a taxi.

The code on the left uses the elevation service to find the height along a path between Sydney and the Regatta. It outputs the height at each step to the console.

### Code
function initialize() {
  var path = [
    new google.maps.LatLng(-33.856927,151.205031),
    new google.maps.LatLng(-27.482478,152.996085)
  ];

  var elevation_service = new google.maps.ElevationService();
  var request = {
    path: path,
    samples: 256
  };

  elevator.getElevationAlongPath(request, callback);
}

function callback(results, status) {
  if (status != google.maps.ElevationStatus.OK) {
    alert("Oh no!");
    return;
  }

  for (var i = 0; i < results.length; ++i) {
    window.console.log(results[i].elevation);
  }
}

