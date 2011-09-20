### Directions

The Maps API also provides access to Google's directions finder through {DirectionsService}.  Directions can be found between two or more locations in either address format or lat/long coordinates.

Requests for directions are similar to geocoding. Once the directions result is returned, it can be displayed on the map using {DirectionsRenderer}. Additionally, {DirectionsRenderer} can also display directions in list form.

Try modifying the code to make the drive through Canberra a stopover.  You can also make the directions editable by {DirectionsRendererOptions} dragging.

### Code
function initialize() {
    // The map's center and zoom will be set by the DirectionsRenderer.
    window.map = new google.maps.Map(document.getElementById('map_canvas'), {
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // Though the map and panel are set on the renderer, nothing will display
    // until the DirectionsResult is set.
    var directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    directionsRenderer.setPanel(document.getElementById('panel'));

    // Driving directions between Pyrmont and Canberra.
    var request = {
      origin: "Sydney",
      waypoints: [{
        location: new google.maps.LatLng(-35.3091577518581, 149.125019515991),
        stopover: false
      }],
      destination: "Melbourne",
      travelMode: google.maps.TravelMode.DRIVING
    };

    // Makes a request to the directions server and sets the result on the
    // DirectionsRenderer for display.
    var directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function(result, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
      } else {
        window.console.log('failed to get directions: '  + status);
      }
    });
}

### HTML

<div id="panel" style="height: 100%; width: 49%; float: right; overflow: auto"></div>
<div id="map_canvas" style="height: 100%; width: 49%"></div>

