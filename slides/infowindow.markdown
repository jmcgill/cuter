### Info windows

An {InfoWindow} displays floating content above the map, in a window that looks like a comic-book word balloon.

Use `infowindow.open` to open an info window on a map.

You can also make it open at the same position as a marker, by also specifying the marker when you call open:

    infowindow.open(map, marker);

See if you can make the infowindow open at the marker's (random!) position when you click on the marker.

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
