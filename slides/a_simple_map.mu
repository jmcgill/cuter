### A Simple Map
To create a map, we need to provide a location (on the surface of the Earth), a zoom level, and the type of data to display.

Locations are specified using a google.maps.LatLng object, which represents a point using a Latitude (between -90 and 90) and Longitude (between -180 and 180).

The type of map to display is controlled by the mapTypeId parameter. Valid mapTypeIds are:

- google.maps.MapTypeId.ROADMAP
- google.maps.MapTypeId.TERRAIN
- google.maps.MapTypeId.SATELLITE

Try changing the Latitude and Longitude in the example on the left, and see if you can center the map on Brisbane.

### Code
var map;

function initialize() {
    var myOptions = {
      zoom: 8,
      center: new google.maps.LatLng(-34.397, 150.644),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
        
    map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);
}
