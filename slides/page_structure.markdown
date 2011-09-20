### Page Structure

To use the Maps API, a website must load the Maps API Javascript from Google, and provide somewhere to place a map. This is done with a HTML file which may look like this:

    <html>
      <head>
      <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
      <script type="text/javascript">
      function initialize() {
        // Code here...
      }
      </script>
    </head>
    <body onload="initialize()">
      <div id="map_canvas"></div>
    </body>
  </html>

It's important that code which uses the Maps API doesn't run until after the API has finished loading. To ensure this, we put the code in an `initialize()` function and call it once the *body* of the website has finished loading.

    <body onload="initialize()">

In HTML a `div` is a rectangular container which can contain other elements, such as a Google map. In this example, we create a single `div` which we can use later to hold a map.

    <div id="map_canvas"></div>

This code gets repetitive, so in future examples we'll assume you have a page structured like this, and focus on the more interesting parts of using the Google Maps API.
