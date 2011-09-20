### Markers

{Marker}s are used to mark points of interest. Each marker is anchored at a {LatLng} on the surface of the Earth.

![Marker](http://mrant.net/wp3/wp-content/uploads/2011/05/Google_Maps_Marker.png)

Use `marker.setMap` to place the marker on the map.

### Code
function initialize() {
    var myOptions = {
      zoom: 8,
      center: new google.maps.LatLng(-27.463347, 153.02496),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);

    var options = {
      position: new google.maps.LatLng(-27.463347, 153.02496)
    };
    var marker = new google.maps.Marker(options);
    marker.setMap(map);
}
