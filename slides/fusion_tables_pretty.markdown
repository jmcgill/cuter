### Prettier maps with Fusion Tables

Like KML, Fusion Tables can also be used to render complex information on a map. The [Fusion Tables UI](http://www.google.com/fusiontables) can be used to set styles based on properties e.g.

> Make polygons red where Age > 10

This styling was used to create a map showing poverty levels in the UK.

### Code
function initialize() {
  map = new google.maps.Map(document.getElementById('map_canvas'), {
    center: new google.maps.LatLng(51.505323, 0),
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var layer = new google.maps.FusionTablesLayer({
    query: {
      select: 'geometry',
      from: '628653',
    }
  });
  layer.setMap(map);
}
