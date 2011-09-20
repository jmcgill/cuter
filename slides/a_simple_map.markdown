### A Simple Map

To create a map, we need to provide a location (on the surface of the Earth), a zoom level, and the type of data to display.

Locations are specified using a `google.maps.{LatLng}` object, which represents a point using a latitude (between -90&deg; and 90&deg;) and longitude (between -180&deg; and 180&deg;).

The type of map to display is controlled by the `mapTypeId` parameter. Valid `mapTypeIds` are:

- `google.maps.MapTypeId.ROADMAP`
- `google.maps.MapTypeId.TERRAIN`
- `google.maps.MapTypeId.SATELLITE`

Try changing the map type to **satellite** in the example on the left.

You may be interested in other options. See the documentation for {Map}
and {MapOptions}.

### Code
var map;

function initialize() {
    var myOptions = {
      zoom: 8,
      center: new google.maps.LatLng(-27.463347, 153.02496),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);
}
