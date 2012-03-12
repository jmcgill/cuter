### Markers in Street View

We can also add Markers in Street View. This is achieved in the same way as adding a marker to a Map.

Try adding a Marker with LatLng `-27.468271, 153.005953`, which is the position for the yellow steam thingy outside the brewery.

    new google.maps.Marker({
        position: new google.maps.LatLng(-27.468271, 153.005953),
        map: pano
    });

Next, change the heading of the panorama so it points towards the Marker.

### Code
function initialize() {
    var myOptions = {
        position: new google.maps.LatLng(-27.46841, 153.00589),
        pov: {
            heading: -68.875,
            pitch: 12,
            zoom: 1
        }
    };

    var pano = new google.maps.StreetViewPanorama(document.getElementById('map_canvas'), myOptions);
}

### Answer
function initialize() {
    var myOptions = {
        position: new google.maps.LatLng(-27.46841, 153.00589),
        pov: {
            heading: 30,
            pitch: 3,
            zoom: 1
        }
    };

    var pano = new google.maps.StreetViewPanorama(document.getElementById('map_canvas'), myOptions);
}
