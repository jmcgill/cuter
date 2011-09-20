### Fusion Tables

[Google Fusion Tables](http://google.com/fusiontables) is a cloud hosted database, which lets you upload data and query it using SQL.

Fusion Tables can be displayed Maps API map using {FusionTablesLayer}. The data is loaded from a Fusion Tables SQL table, which saves you having to run your own database.

The table used in the example contains information about [Chicago Homicides](http://www.google.com/fusiontables/DataSource?dsrcid=139529).

Try changing the code so that the map shows victims over the age of 40.

### Code
var map;

function initialize() {
  map = new google.maps.Map(document.getElementById('map_canvas'), {
    center: new google.maps.LatLng(41.828, -87.64),
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var layer = new google.maps.FusionTablesLayer({
    query: {
      select: 'Geocodable address',
      from: '139529',
      where: 'Gender = "Male"'
    }
  });
  layer.setMap(map);
}
