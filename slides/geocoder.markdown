### Geocoder

Geocoding is the act of turning an address string into Lat/Lng coordinates. The Maps API has a built in geocoding service which, given an address, returns the coordinates. Some addresses may have multiple results; for example, "Brisbane" might mean "Brisbane, Queensland" or "Brisbane, California".

The `Geocoder` makes an asynchronous request to a Google server.  When the response returns, the Geocoder will call the function that you specify when making the request. A function passed as an argument to another function is called a _callback_. The arguments of your callback must be an array of results and a status code. If the geocode was successful, the status will be `google.maps.GeocoderStatus.OK`.

Create a `Geocoder` object and call `geocode` to get the coordinate for an addres.  Then add a marker at that point on the map and pan to it (`map.panTo`).

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
      address: "48 Pirrama Rd, Pyrmont"
    };
    geocoder.geocode(request, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
        map.panTo(marker.getPosition());
      } else {
        window.console.log('failed to geocode address: '  + status);
      }
    });
}


