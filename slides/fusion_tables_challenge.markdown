### Challenge 5: Interactive Fusion Tables

Using the data from the Chicago Homicides table, make a program which lets a user filter the Age of the victims to display by entering a number between 0 and 100 and clicking a button.

Hint: Here's some code to read a number from a text input, and convert it to an integer, using the parseInt function we saw earlier.

    var input = document.getElementById("input");
    var number = parseInt(input.getValue());

**Bonus:** If you're on a modern browser, use the [HTML5 ranged input](http://diveintohtml5.org/examples/input-type-range.html) element to build a slider, which can be used to filter the points by Age.

### Code
// Good luck!

### HTML
<input id="input"/>
<input type="button" id="button" value="Filter"/>
<div id="map_canvas" height="100%"
