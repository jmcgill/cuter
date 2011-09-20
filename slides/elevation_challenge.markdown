### Elevation Challenge

It's time to mash together a few of the concepts we've covered already.

Your challenge is to write a program which lets a user enter an address. It should then use the Geocoder to find that address, and calculate the **net positive** elevation between the Regatta Hotel and that address using 256 samples.

The net positive elevation can be computed by adding the change in elevation every time a sample is **higher** than the previous samples.

Display the net elvation in the `output` HTML DIV, and the path taken as a {Polyline} on a map.

**Hint:** To add some text to a HTML element, use the following code:

    var element = document.getElementById("id");
    element.innerText = "Hello, world!";

### Code
// Good luck!

### HTML
<input id="start"/><input type="button" id="button" value="Route!"/>
<div id="output"></div>
<div id="map_canvas" height="100%"></div>
