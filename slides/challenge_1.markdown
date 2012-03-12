### Challenge 1: Make your mark.

The first challenge is to write a program that places a marker on the map each time the map is clicked, at the location which was clicked.

**Hint:** You might need to make `map` a global object so that it can be accessed from your event handler. Do this by declaring it outside the initialize() function. You should not use 'var' when referring to global objects within functions.

    var map;
    function initialize() {
       ...
       // Note that we don't use 'var map = ... ' here anymore, just map = ....
       map = new google.maps.Map(....);
    }

### Code

