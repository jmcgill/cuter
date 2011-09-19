### Closures

The code has now been fixed so that the info window opens at the marker that was clicked.

The event listener is now added in a separate function:

    function addListenerToMarker(marker, map, infowindow) {
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
      });
    }

This works because `marker` refers to the `marker` that is the argument to `addListenerToMarker`. Each event listener is created inside a different call to `addListenerToMarker` and has a reference to a different `marker` variable.

Try changing the code on the left so that the info window says "You clicked marker #1" for the first marker, "#2" for the second marker, and so on.

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
      content: 'It now works!'
    };
    var infowindow = new google.maps.InfoWindow(infowindowOptions);

    for (var i = 0; i < 5; ++i) {
      var markerOptions = {
        position: new google.maps.LatLng(-34.397, 149.5 + 0.5 * i)
      };
      var marker = new google.maps.Marker(markerOptions);
      marker.setMap(map);

      addListenerToMarker(marker, map, infowindow);
    }
}

// Opens info window when marker is clicked.
function addListenerToMarker(marker, map, infowindow) {
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map, marker);
    });
}
