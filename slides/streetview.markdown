### Street View

Street View gives users the ability to see panoramic imagery from the street level. The Maps API provides programmatic access to panoramas.

Creating a {StreetViewPanorama} is similar to creating a {Map}, except we specify the location of the panorama with the option `position`, as opposed to `center`.

We can also specify some extra parameters via the `pov` option to determine the way the camera faces.

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
