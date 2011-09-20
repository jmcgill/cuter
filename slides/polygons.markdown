### Polygons

{Polygon}s are like {Polyline}s, but closed and optionally filled.

This code sample makes an Australian shaped Polygon.

### Code
function initialize() {
    var myOptions = {
      zoom: 8,
      center: new google.maps.LatLng(-34.397, 150.644),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);

    // TODO(jmcgill): Polygon.
}
