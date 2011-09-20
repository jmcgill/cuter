### Info Windows

An {InfoWindow} displays content in a bubble on the map.

Use `open` to open an info window on a map. You can optionally open the info window at a marker, by passing in the {Marker} as a second parameter.

    infowindow.open(map, marker);

Make the info window open at the marker's position when you click on the marker.

### Code
function initialize() {
    var myOptions = {
      zoom: 8,
      center: new google.maps.LatLng(-34.397, 150.644),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);

    var infowindowOptions = {
      position: new google.maps.LatLng(-34.397, 150.644),
      content: 'Oh look, an info window!'
    };
    var infowindow = new google.maps.InfoWindow(infowindowOptions);
    infowindow.open(map);

    var markerOptions = {
      position: new google.maps.LatLng(-35, 150.644)
    };
    var marker = new google.maps.Marker(markerOptions);
    marker.setMap(map);
}
