### Map Events

The Maps API has a similar events system. Most objects can trigger events, which are documented in the [Maps API Reference](http://code.google.com/apis/maps/documentation/javascript/reference.html).

Maps events are added with the special `google.maps.event.addListener` function. Most events provide an object when run, with information about the event.

The code on the left adds a function to be run when the `click` event is triggered on a **map**. The function displays the location of the click (in Lat/Lng).

### Code
function initialize() {
    var myOptions = {
      zoom: 8,
      center: new google.maps.LatLng(-34.397, 150.644),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);
    google.maps.event.addListener(map, 'click', eventHandler);
}

function eventHandler(details) {
  alert(details.latLng.toString());
}
