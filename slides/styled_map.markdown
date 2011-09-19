### Styled Maps

To add a touch of style to your map, you can change the appearance of
any feature on the map. You can even turn features completely off!

Styles can be set using the `styles` option when creating a new Map. In
the example, all the colors of the map are desaturated.

To create your own style, try the [Styled Maps Wizard](http://gmaps-samples-v3.googlecode.com/svn/trunk/styledmaps/wizard/index.html).

Try turning all the roads one color:

    {
        featureType: 'road',
        stylers: [
              { saturation: 68 },
              { hue: "#ff00ee" }
        ]
    }

&hellip; or all the labels off:

    {
        elementType: 'labels',
        stylers: [ { visibility: 'off' } ]
    }

Note that the order you specify these styles (and stylers!) is important.

### Code

var map;

function initialize() {
    var myOptions = {
      zoom: 12,
      center: new google.maps.LatLng(-27.463347, 153.02496),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        {
            stylers: [ { saturation: -100 } ]
        }
      ]
    };

    map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);
}
