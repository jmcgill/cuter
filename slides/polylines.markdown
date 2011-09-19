### Polylines

Polylines are used to connect points on the globe. Each Maps API Polyline uses an array of LatLng objects to determine what points to connect.

Arrays in Javascript collect groups of objects, and look like this:

    var array = [
        ...,
	...
    ];

The code on the left shows the trip we made from Sydney to get here.

You can control the appearance of Polylines using the {PolylineOptions} object.

### Code
function initialize() {
    var myOptions = {
      zoom: 8,
      center: new google.maps.LatLng(-34.397, 150.644),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);

    var points = [
      new google.maps.LatLng(-33.85217, 151.207851),
      new google.maps.LatLng(-29.630771, 149.39209),
      new google.maps.LatLng(-31.034108, 151.589355),
      new google.maps.LatLng(-27.44979, 153.039551)
    ];

    var polyline = new google.maps.Polyline({
      path: points,
      strokeColor: "#FF0000",
      stokeWeight: 2
    });
    polyline.setMap(map);
}
