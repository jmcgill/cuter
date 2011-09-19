### Polylines

Polygons are like polylines, but closed and (optionally) filled.

The code on the right makes an Australian shaped Polygon. Kind of.

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
