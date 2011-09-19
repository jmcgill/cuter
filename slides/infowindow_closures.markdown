### Closures

What if we have multiple markers that open info windows when they are clicked?

Run the code on the left and see what happens. The code tries to open the info window at a marker when that marker is clicked. But why does the info window always open at the last marker even if you click on one of the other markers?

Let's look at the code used to open the info window:

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map, marker);
    });

The `marker` inside the function is a reference to the `marker` defined outside the function: this is an example of a **closure** in JavaScript, where the function remembers the environment in which it was created. And after the for loop has finished, `marker` is the last marker created.

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
