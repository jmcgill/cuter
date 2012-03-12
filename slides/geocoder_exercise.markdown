### Challenge: Geocoder

As mentioned on the previous slide, some address strings are ambiguous and may have multiple results.

Modify the code on the left make a request to the `Geocoder` for "Brisbane" and then place a marker at each of the results.

**Bonus:** Reposition the map to fit each of the markers on the map. See {LatLngBounds} and `{Map}.fitBounds`.

### Code
function initialize() {
    var myOptions = {
      zoom: 8,
      center: new google.maps.LatLng(-34.397, 150.644),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);
    var geocoder = new google.maps.Geocoder();

    var request = {
      address: "Brisbane"
    };

    // geocoder.geocode(...);
}

