### Building a Mashup

Building a mashup is easy if you take advantage of existing libraries.

The code on the left loads Stephanie's activity stream from the Google+ API. The Google+ API returns a JSON object so you can access properties directly e.g.:

    response.items[0].id

The code uses jQuery to make a request for the data. This avoids a lot of browser compatability problems.

Load [the API output](http://goo.gl/PyWRI) to inspect the structure of the data.

**Challenge:** Combine this code with the Google Maps API to plot the location of each post.

Hint: Each post has a .geoocation field. Use this code to turn it into a LatLng object:

    // This is the format the G+ API returns locations in.
    var geolocation = "-27.4688651 153.0266186";

    // Split it into two parts and make a LatLng object.
    var parts = geolocation.split(' ');
    var latLng = new google.maps.LatLng(parts[0], parts[1]);

### Code
function initialize() {
  // Make a request to the API. This short URL points to:
  // https://www.googleapis.com/plus/v1/people/113590416237988391252/activities/public?key=key

  jQuery.ajax({
      url: 'http://goo.gl/PyWRI',
      dataType: 'jsonp',
      success: requestComplete
  });
}

function requestComplete(response) {
  window.console.log(response);
}
