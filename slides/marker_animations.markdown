### Marker Animations

Markers can be animated to draw attention to interesting parts of the map. To animate a {Marker}, set the `animation` property to one of `google.maps.Animation.DROP` or `google.maps.Animation.BOUNCE`.

The example on the left toggles marker animations when the button is clicked.

See documentation: {Animation}

### Code
var marker;

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
    marker = new google.maps.Marker(options);
    marker.setMap(map);

    var button = document.getElementById("button");
    button.addEventListener('click', bounce);
}

function bounce() {
    // Is the marker already animating?
    if (marker.getAnimation()) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

### HTML
<input type="button" id="button" value="B-B-Bounce!"/>
<div id="map_canvas" style="height: 100%"></div>
