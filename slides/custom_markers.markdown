### Custom Markers

The default marker is a bit boring, so you can replace it with any (small) image by setting the `icon` property in the marker options.

![Flag](http://goo.gl/TQpwU)

    icon: "http://goo.gl/TQpwU"

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
