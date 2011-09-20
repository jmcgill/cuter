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

    var paths = [
      new google.maps.LatLng(-22.998852,107.490234),
      new google.maps.LatLng(-37.160317,112.236328),
      new google.maps.LatLng(-35.88905,130.517578),
      new google.maps.LatLng(-44.339565,147.041016),
      new google.maps.LatLng(-27.683528,159.960938),
      new google.maps.LatLng(-3.776559,141.416016)
    ];
    var polygon = new google.maps.Polygon({
      paths: paths,
      fillColor: "#00FF00",
      fillOpacity: 0.5
    });
    polygon.setMap(map);
}
