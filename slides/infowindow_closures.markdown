### Closures

The intent of this code example is to open an info window whenever any
of the five markers are clicked.

**Run** the code and see what happens.

Let's look at the code used to open the info window:

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map, marker);
    });

The `marker` inside the function is a reference to the `marker` defined outside
the function. This is an example of a *closure*, where the function remembers
the environment in which it was created. This feature of JavaScript is powerful,
but must be used carefully. In this example, there is an error. `marker` always
references the last marker.

This is because JavaScript does not have block scope. The scope in this case is
the enclosing function (`initialize`). At the end of the `for` loop, `marker`
contains a reference to the last marker.

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
      content: 'Why do I always open at the last marker?'
    };
    var infowindow = new google.maps.InfoWindow(infowindowOptions);

    for (var i = 0; i < 5; ++i) {
      var markerOptions = {
        position: new google.maps.LatLng(-34.397, 149.5 + 0.5 * i)
      };
      var marker = new google.maps.Marker(markerOptions);
      marker.setMap(map);

      // Opens info window when marker is clicked.
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
      });
    }
}
