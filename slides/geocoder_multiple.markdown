### Exercise: Geocoder

As mentioned on the previous slide, some address strings are ambiguous and may have multiple results.

As an exercsise, make a request to the Geocoder for "Brisbane" and then place a marker at each of the results.

For extra credit:
Reposition the map to fit each of the markers on the map.  See {Map}fitBounds.

And for more credit:
Set the title of the marker to be the full address of the geocoded location.  See {GeocoderResult}GeocoderResult/GeocoderAddressComponent.

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
    geocoder.geocode();
}

