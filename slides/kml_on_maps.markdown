### KML on Maps

Like Google Earth, the Maps API can load and display KML files. Using KML files also lets the Maps API display more complex shapes than with {Polyline}/{Polygon}, as the file is rendered by Google's servers.

The code on the left displays the KML file hosted at [goo.gl/QXdPQ](http://goo.gl/QXdPQ). Download the file and take a look at the structure.

The one catch is that your KML file **must** be available on the public Internet to use it with the Maps API. You will need to upload it to a server which other people can access.

### Code
function initialize() {
    var myOptions = {
      zoom: 8,
      center: new google.maps.LatLng(-34.397, 150.644),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);

    var layer = new google.maps.KmlLayer("http://goo.gl/QXdPQ");
    layer.setMap(map);
}
