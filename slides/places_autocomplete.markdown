### Places Autocomplete

A common pattern when using the Maps API is to show a search box that
helps the user navigate to the location they want to see. The Maps API recently
introduced Autocomplete functionality to solves this problem.

Attaching functionality to an input field is easy:

    new google.maps.places.Autocomplete(document.getElementById('autocomplete'));

From here, we can listen to the `place_changed` event, then call `getPlace()`,
which returns a {PlaceResult}, providing details about the selected place.

    var place = autocomplete.getPlace();

Check the documentation for `PlaceResult` to see the data that you get
back, like `PlaceGeometry`.

**Challenge:** Display a {Marker} at the location of the selected {PlaceResult}.
This can be found via `place.geometry.location`.

**Challenge 2:** Some Places will have the property `place.geometry.viewport`.
If this property is provided, show an appropriate viewport to the user.

*Hint:* Use {Map}'s `fitBounds` and/or `setCenter` methods.

### Code

var map;
var autocomplete;

function initialize() {
    var myOptions = {
      zoom: 8,
      center: new google.maps.LatLng(-27.463347, 153.02496),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);

    autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'));

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();

        // show marker, change viewport, etc.
    });
}


### HTML

<input id="autocomplete">
<div id="map_canvas" style="height: 80%"></div>
