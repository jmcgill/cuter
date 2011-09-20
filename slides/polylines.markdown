### Polylines

Polylines are used to connect points on the globe. Each {Polyline} uses an array of {LatLng}s to determine the points to connect.

Arrays in JavaScript collect groups of objects, and look like this:

    var array = [
        ...,
        ...,
        ...
    ];

The map in this example shows the route we took to get from Sydney to
Brisbane.

You can control the appearance of Polylines using the {PolylineOptions} object.

### Code
function initialize() {
    var myOptions = {
      zoom: 5,
      center: new google.maps.LatLng(-31.7, 152.32),
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
